<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    /**
     * Display the top page.
     */
    public function index(): Response
    {
        return Inertia::render('Welcome', [
            'canRegister' => Route::has('register'),
        ]);
    }
}
