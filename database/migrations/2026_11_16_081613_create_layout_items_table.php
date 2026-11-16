<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('layout_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('layout_id')->constrained('layouts')->cascadeOnDelete();
            $table->foreignId('furniture_catalog_id')->constrained('furniture_catalog')->cascadeOnDelete();
            $table->float('position_x');
            $table->float('position_y');
            $table->float('position_z');
            $table->float('rotation_y');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('layout_items');
    }
};
