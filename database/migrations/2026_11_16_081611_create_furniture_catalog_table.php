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
        Schema::create('furniture_catalog', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->string('name');
            $table->string('model_path');
            $table->float('default_scale')->default(1);
            $table->string('thumbnail')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('furniture_catalog');
    }
};
