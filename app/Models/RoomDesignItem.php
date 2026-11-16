<?php

namespace App\Models;

use Database\Factories\RoomDesignItemFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['layout_id', 'furniture_catalog_id', 'position_x', 'position_y', 'position_z', 'rotation_y'])]
class RoomDesignItem extends Model
{
    /** @use HasFactory<RoomDesignItemFactory> */
    use HasFactory;

    protected $table = 'layout_items';

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'position_x' => 'float',
            'position_y' => 'float',
            'position_z' => 'float',
            'rotation_y' => 'float',
        ];
    }

    /**
     * @return BelongsTo<RoomDesign, $this>
     */
    public function roomDesign(): BelongsTo
    {
        return $this->belongsTo(RoomDesign::class, 'layout_id');
    }

    /**
     * @return BelongsTo<FurnitureCatalog, $this>
     */
    public function furnitureCatalog(): BelongsTo
    {
        return $this->belongsTo(FurnitureCatalog::class);
    }
}
