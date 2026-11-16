<?php

namespace Tests\Feature;

use App\Models\FurnitureCatalog;
use App\Models\RoomDesign;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoomDesignTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_login(): void
    {
        $roomDesign = RoomDesign::factory()->create();

        $this->get(route('room-designs.create'))->assertRedirect(route('login'));
        $this->get(route('room-designs.edit', $roomDesign))->assertRedirect(route('login'));
    }

    public function test_user_can_create_a_room_design(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('room-designs.store'), [
            'room_template' => 'living',
        ]);

        $roomDesign = RoomDesign::sole();

        $response->assertRedirect(route('room-designs.edit', $roomDesign));
        $this->assertSame($user->id, $roomDesign->user_id);
        $this->assertSame('living', $roomDesign->room_template);
        $this->assertNotEmpty($roomDesign->share_token);
    }

    public function test_user_can_view_their_own_room_design_editor(): void
    {
        $user = User::factory()->create();
        $roomDesign = RoomDesign::factory()->for($user)->create();

        $this->actingAs($user)
            ->get(route('room-designs.edit', $roomDesign))
            ->assertOk();
    }

    public function test_user_cannot_view_another_users_room_design_editor(): void
    {
        $owner = User::factory()->create();
        $roomDesign = RoomDesign::factory()->for($owner)->create();
        $other = User::factory()->create();

        $this->actingAs($other)
            ->get(route('room-designs.edit', $roomDesign))
            ->assertForbidden();
    }

    public function test_user_can_update_their_room_design_items(): void
    {
        $user = User::factory()->create();
        $roomDesign = RoomDesign::factory()->for($user)->create();
        $furniture = FurnitureCatalog::factory()->create();

        $response = $this->actingAs($user)->put(route('room-designs.update', $roomDesign), [
            'name' => 'My Living Room',
            'items' => [
                [
                    'furniture_catalog_id' => $furniture->id,
                    'position_x' => 1.5,
                    'position_y' => 0,
                    'position_z' => -2,
                    'rotation_y' => 1.57,
                ],
            ],
        ]);

        $response->assertRedirect(route('room-designs.edit', $roomDesign));
        $this->assertSame('My Living Room', $roomDesign->refresh()->name);
        $this->assertCount(1, $roomDesign->items);
        $this->assertSame($furniture->id, $roomDesign->items->first()->furniture_catalog_id);
    }

    public function test_user_cannot_update_another_users_room_design(): void
    {
        $owner = User::factory()->create();
        $roomDesign = RoomDesign::factory()->for($owner)->create();
        $other = User::factory()->create();

        $this->actingAs($other)->put(route('room-designs.update', $roomDesign), [
            'name' => 'Hacked',
            'items' => [],
        ])->assertForbidden();
    }

    public function test_user_can_delete_their_own_room_design(): void
    {
        $user = User::factory()->create();
        $roomDesign = RoomDesign::factory()->for($user)->create();

        $this->actingAs($user)
            ->delete(route('room-designs.destroy', $roomDesign))
            ->assertRedirect(route('dashboard'));

        $this->assertModelMissing($roomDesign);
    }

    public function test_user_cannot_delete_another_users_room_design(): void
    {
        $owner = User::factory()->create();
        $roomDesign = RoomDesign::factory()->for($owner)->create();
        $other = User::factory()->create();

        $this->actingAs($other)
            ->delete(route('room-designs.destroy', $roomDesign))
            ->assertForbidden();

        $this->assertModelExists($roomDesign);
    }
}
