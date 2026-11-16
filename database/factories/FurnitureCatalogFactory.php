<?php

namespace Database\Factories;

use App\Models\FurnitureCatalog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FurnitureCatalog>
 */
class FurnitureCatalogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category = fake()->randomElement(['sofa', 'chair', 'table', 'bed', 'desk']);

        return [
            'category' => $category,
            'name' => ucfirst($category).' '.fake()->word(),
            'model_path' => "models/furniture/{$category}.glb",
            'default_scale' => 1,
            'thumbnail' => null,
        ];
    }
}
