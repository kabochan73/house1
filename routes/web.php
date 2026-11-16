<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomDesignController;
use App\Http\Controllers\ShareController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::get('share/{roomDesign:share_token}', [ShareController::class, 'show'])->name('share.show');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('room-designs/create', [RoomDesignController::class, 'create'])->name('room-designs.create');
    Route::post('room-designs', [RoomDesignController::class, 'store'])->name('room-designs.store');
    Route::get('room-designs/{roomDesign}/edit', [RoomDesignController::class, 'edit'])->name('room-designs.edit');
    Route::put('room-designs/{roomDesign}', [RoomDesignController::class, 'update'])->name('room-designs.update');
    Route::delete('room-designs/{roomDesign}', [RoomDesignController::class, 'destroy'])->name('room-designs.destroy');

    Route::post('share/{roomDesign:share_token}/copy', [ShareController::class, 'copy'])->name('share.copy');
});

require __DIR__.'/auth.php';
