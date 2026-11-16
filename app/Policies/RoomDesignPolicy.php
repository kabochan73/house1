<?php

namespace App\Policies;

use App\Models\RoomDesign;
use App\Models\User;

class RoomDesignPolicy
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, RoomDesign $roomDesign): bool
    {
        return $user->id === $roomDesign->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, RoomDesign $roomDesign): bool
    {
        return $user->id === $roomDesign->user_id;
    }
}
