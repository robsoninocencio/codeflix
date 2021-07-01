<?php

namespace Tests\Feature\Models;

use App\Models\CastMember;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class CastMemberTest extends TestCase
{
    use DatabaseMigrations;

    public function testList()
    {
        factory(CastMember::class)->create();
        $cast_members = CastMember::all();
        $this->assertCount(1, $cast_members);

        $castMemberKey = array_keys($cast_members->first()->getAttributes());
        $this->assertEqualsCanonicalizing(
            [
                'id', 'name', 'type', 'created_at', 'updated_at', 'deleted_at'
            ],
            $castMemberKey
        );
    }

    /** @test */
    public function test_Create()
    {
        $castMember = CastMember::create([
            'name' => 'test1',
            'type' => 1
        ]);

        $castMember->refresh();

        $this->assertNotEmpty($castMember->id);
        $this->assertEquals(36, strlen($castMember->id));
        $this->assertTrue((bool)preg_match('/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i', $castMember->id));

        $this->assertEquals('test1', $castMember->name);
        $this->assertEquals(1, $castMember->type);
    }

    public function test_Update()
    {
        /** @var CastMember $castMember */
        $castMember = factory(CastMember::class)->create([
            'name' => 'test_name',
            'type' => 1
        ]);
        $data = [
            'name' => 'test_name_updated',
            'type' => 2
        ];
        $castMember->update($data);

        foreach ($data as $key => $value) {
            $this->assertEquals($value, $castMember->{$key});
        }
    }

    public function test_Delete()
    {
        /** @var CastMember $castMember */
        $castMember = factory(CastMember::class)->create();
        $this->assertNull($castMember->deleted_at);
        $castMember->delete();
        $this->assertNotNull($castMember->deleted_at);
        $this->assertNull(CastMember::find($castMember->id));
        $this->assertNotNull(CastMember::withTrashed($castMember->id));

        $castMember->restore();
        $this->assertNotNull(CastMember::find($castMember->id));
    }
}
