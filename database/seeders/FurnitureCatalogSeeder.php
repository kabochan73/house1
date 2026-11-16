<?php

namespace Database\Seeders;

use App\Models\FurnitureCatalog;
use Illuminate\Database\Seeder;

class FurnitureCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $catalog = [
            'sofa' => ['Sofa A', 'Sofa B', 'Sofa C'],
            'chair' => ['Chair A', 'Chair B', 'Chair C'],
            'table' => ['Table A', 'Table B', 'Table C'],
            'bed' => ['Bed A', 'Bed B', 'Bed C'],
            'desk' => ['Desk A', 'Desk B', 'Desk C'],
        ];

        foreach ($catalog as $category => $variants) {
            foreach ($variants as $index => $name) {
                FurnitureCatalog::query()->create([
                    'category' => $category,
                    'name' => $name,
                    'model_path' => sprintf('models/furniture/%s-%d.glb', $category, $index + 1),
                    'default_scale' => 1,
                    'thumbnail' => null,
                ]);
            }
        }
    }
}
