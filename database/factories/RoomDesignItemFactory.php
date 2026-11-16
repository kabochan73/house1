<?php

namespace Database\Factories;

use App\Models\FurnitureCatalog;
use App\Models\RoomDesign;
use App\Models\RoomDesignItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RoomDesignItem>
 */
class RoomDesignItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'layout_id' => RoomDesign::factory(),
            'furniture_catalog_id' => FurnitureCatalog::factory(),
            'position_x' => fake()->randomFloat(2, -5, 5),
            'position_y' => 0,
            'position_z' => fake()->randomFloat(2, -5, 5),
            'rotation_y' => fake()->randomFloat(2, 0, 6.28),
        ];
    }
}
