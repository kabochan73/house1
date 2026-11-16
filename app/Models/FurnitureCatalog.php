<?php

namespace App\Models;

use Database\Factories\FurnitureCatalogFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['category', 'name', 'model_path', 'default_scale', 'thumbnail'])]
class FurnitureCatalog extends Model
{
    /** @use HasFactory<FurnitureCatalogFactory> */
    use HasFactory;

    protected $table = 'furniture_catalog';

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'default_scale' => 'float',
        ];
    }

    /**
     * @return HasMany<RoomDesignItem, $this>
     */
    public function layoutItems(): HasMany
    {
        return $this->hasMany(RoomDesignItem::class);
    }
}
