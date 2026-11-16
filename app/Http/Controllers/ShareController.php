<?php

namespace App\Http\Controllers;

use App\Models\RoomDesign;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ShareController extends Controller
{
    /**
     * Display the public, read-only view of a room design.
     */
    public function show(RoomDesign $roomDesign): Response
    {
        return Inertia::render('Share', [
            'roomDesign' => $roomDesign->only(['name', 'room_template', 'thumbnail', 'share_token']),
        ]);
    }

    /**
     * Copy a shared room design into the current user's dashboard.
     */
    public function copy(Request $request, RoomDesign $roomDesign): RedirectResponse
    {
        $copy = DB::transaction(function () use ($request, $roomDesign) {
            $copy = $request->user()->roomDesigns()->create([
                'room_template' => $roomDesign->room_template,
                'name' => $roomDesign->name,
                'thumbnail' => $roomDesign->thumbnail,
            ]);

            $copy->items()->createMany(
                $roomDesign->items->map->only([
                    'furniture_catalog_id', 'position_x', 'position_y', 'position_z', 'rotation_y',
                ])
            );

            return $copy;
        });

        return redirect()->route('room-designs.edit', $copy);
    }
}
