<?php

namespace Database\Factories;

use App\Models\RoomDesign;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RoomDesign>
 */
class RoomDesignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'room_template' => fake()->randomElement(['room_4x4', 'room_5x5', 'room_6x6', 'room_4x6', 'room_5x7', 'room_6x8']),
            'name' => fake()->words(3, true),
            'thumbnail' => null,
        ];
    }
}
