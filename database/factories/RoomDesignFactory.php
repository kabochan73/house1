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
            'room_template' => fake()->randomElement(['living', 'bedroom', 'office']),
            'name' => fake()->words(3, true),
            'thumbnail' => null,
        ];
    }
}
