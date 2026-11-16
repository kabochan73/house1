<?php

namespace Tests\Feature;

use App\Models\RoomDesign;
use App\Models\RoomDesignItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShareTest extends TestCase
{
    use RefreshDatabase;

    public function test_anyone_can_view_a_shared_room_design(): void
    {
        $roomDesign = RoomDesign::factory()->create();

        $this->get(route('share.show', $roomDesign))->assertOk();
    }

    public function test_guests_are_redirected_to_login_when_copying(): void
    {
        $roomDesign = RoomDesign::factory()->create();

        $this->post(route('share.copy', $roomDesign))->assertRedirect(route('login'));
    }

    public function test_authenticated_user_can_copy_a_shared_room_design(): void
    {
        $owner = User::factory()->create();
        $roomDesign = RoomDesign::factory()->for($owner)->create();
        RoomDesignItem::factory()->for($roomDesign, 'roomDesign')->count(2)->create();

        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('share.copy', $roomDesign));

        $copy = RoomDesign::where('user_id', $user->id)->sole();

        $response->assertRedirect(route('room-designs.edit', $copy));
        $this->assertSame($roomDesign->room_template, $copy->room_template);
        $this->assertNotSame($roomDesign->share_token, $copy->share_token);
        $this->assertCount(2, $copy->items);
    }
}
