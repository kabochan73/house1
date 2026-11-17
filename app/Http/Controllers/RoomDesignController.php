<?php

namespace App\Http\Controllers;

use App\Models\FurnitureCatalog;
use App\Models\RoomDesign;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RoomDesignController extends Controller
{
    /**
     * Room templates available for selection.
     *
     * @var list<string>
     */
    public const ROOM_TEMPLATES = ['room_4x4', 'room_5x5', 'room_6x6', 'room_4x6', 'room_5x7', 'room_6x8'];

    /**
     * Display labels for each room template, used to build a default name.
     *
     * @var array<string, string>
     */
    private const ROOM_TEMPLATE_LABELS = [
        'room_4x4' => 'Room 4×4',
        'room_5x5' => 'Room 5×5',
        'room_6x6' => 'Room 6×6',
        'room_4x6' => 'Room 4×6',
        'room_5x7' => 'Room 5×7',
        'room_6x8' => 'Room 6×8',
    ];

    /**
     * Show the room template picker.
     */
    public function create(): Response
    {
        return Inertia::render('RoomDesigns/Create', [
            'roomTemplates' => self::ROOM_TEMPLATES,
        ]);
    }

    /**
     * Create a new room design from the chosen room template.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'room_template' => ['required', Rule::in(self::ROOM_TEMPLATES)],
        ]);

        $roomDesign = $request->user()->roomDesigns()->create([
            'room_template' => $validated['room_template'],
            'name' => self::ROOM_TEMPLATE_LABELS[$validated['room_template']].' Room',
        ]);

        return redirect()->route('room-designs.edit', $roomDesign);
    }

    /**
     * Show the furniture placement editor for a room design.
     */
    public function edit(RoomDesign $roomDesign): Response
    {
        Gate::authorize('update', $roomDesign);

        return Inertia::render('RoomDesigns/Edit', [
            'roomDesign' => $roomDesign->load('items.furnitureCatalog'),
            'furnitureCatalog' => FurnitureCatalog::all(),
        ]);
    }

    /**
     * Save the furniture placement for a room design.
     */
    public function update(Request $request, RoomDesign $roomDesign): RedirectResponse
    {
        Gate::authorize('update', $roomDesign);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'thumbnail' => ['nullable', 'string'],
            'items' => ['present', 'array'],
            'items.*.furniture_catalog_id' => ['required', 'integer', 'exists:furniture_catalog,id'],
            'items.*.position_x' => ['required', 'numeric'],
            'items.*.position_y' => ['required', 'numeric'],
            'items.*.position_z' => ['required', 'numeric'],
            'items.*.rotation_y' => ['required', 'numeric'],
        ]);

        $roomDesign->name = $validated['name'];

        if (! empty($validated['thumbnail'])) {
            $roomDesign->thumbnail = $this->storeThumbnail($validated['thumbnail'], $roomDesign);
        }

        $roomDesign->save();

        $roomDesign->items()->delete();
        $roomDesign->items()->createMany($validated['items']);

        return redirect()->route('dashboard');
    }

    /**
     * Delete a room design.
     */
    public function destroy(RoomDesign $roomDesign): RedirectResponse
    {
        Gate::authorize('delete', $roomDesign);

        $roomDesign->delete();

        return redirect()->route('dashboard');
    }

    /**
     * Decode a base64 PNG data URL and store it, returning its public path.
     */
    private function storeThumbnail(string $dataUrl, RoomDesign $roomDesign): string
    {
        [, $encoded] = explode(',', $dataUrl, 2);

        $path = 'thumbnails/'.$roomDesign->share_token.'.png';

        Storage::disk('public')->put($path, base64_decode($encoded));

        return $path;
    }
}
