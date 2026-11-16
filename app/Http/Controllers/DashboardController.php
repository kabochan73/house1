<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the authenticated user's room designs.
     */
    public function index(Request $request): Response
    {
        $roomDesigns = $request->user()
            ->roomDesigns()
            ->latest()
            ->get(['id', 'name', 'room_template', 'thumbnail', 'share_token']);

        return Inertia::render('Dashboard', [
            'roomDesigns' => $roomDesigns,
        ]);
    }
}
