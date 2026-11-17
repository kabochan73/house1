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
        // Kenney Furniture Kit models are stylized, not real-world scale,
        // so each category gets a scale correction to look reasonable in a room.
        $catalog = [
            'sofa' => ['names' => ['Sofa A', 'Sofa B', 'Sofa C'], 'scale' => 1.5],
            'chair' => ['names' => ['Chair A', 'Chair B', 'Chair C'], 'scale' => 1.8],
            'table' => ['names' => ['Table A', 'Table B', 'Table C'], 'scale' => 1.3],
            'bed' => ['names' => ['Bed A', 'Bed B', 'Bed C'], 'scale' => 1.5],
            'desk' => ['names' => ['Desk A', 'Desk B', 'Desk C'], 'scale' => 1.5],
            'bookcase' => ['names' => ['Bookcase A', 'Bookcase B', 'Bookcase C'], 'scale' => 2.0],
            'plant' => ['names' => ['Plant A', 'Plant B', 'Plant C'], 'scale' => 2.6],
            'rug' => ['names' => ['Rug A', 'Rug B', 'Rug C'], 'scale' => 2.4],
        ];

        foreach ($catalog as $category => $definition) {
            foreach ($definition['names'] as $index => $name) {
                FurnitureCatalog::query()->create([
                    'category' => $category,
                    'name' => $name,
                    'model_path' => sprintf('models/furniture/%s-%d.glb', $category, $index + 1),
                    'default_scale' => $definition['scale'],
                    'thumbnail' => null,
                ]);
            }
        }
    }
}
