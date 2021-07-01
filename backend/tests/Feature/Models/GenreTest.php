<?php

namespace Tests\Feature\Models;

use App\Models\Genre;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class GenreTest extends TestCase
{
    use DatabaseMigrations;

    public function testList()
    {
        factory(Genre::class)->create();
        $genres = Genre::all();
        $this->assertCount(1, $genres);

        $genreKey = array_keys($genres->first()->getAttributes());
        $this->assertEqualsCanonicalizing(
            ['id', 'name', 'is_active', 'created_at', 'updated_at', 'deleted_at'],
            $genreKey
        );
    }

    /** @test */
    public function test_Create()
    {
        $genre = Genre::create([
            'name' => 'test1'
        ]);
        $genre->refresh();

        $this->assertNotEmpty($genre->id);
        $this->assertEquals(36, strlen($genre->id));
        $this->assertTrue((bool)preg_match('/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i', $genre->id));

        $this->assertEquals('test1', $genre->name);
        $this->assertTrue($genre->is_active);

        $genre = Genre::create([
            'name' => 'test1', 'is_active' => false
        ]);
        $this->assertFalse($genre->is_active);

        $genre = Genre::create([
            'name' => 'test1', 'is_active' => true
        ]);
        $this->assertTrue($genre->is_active);
    }

    public function test_Update()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->create([
            'name' => 'test_name',
            'is_active' => false
        ]);

        $data = [
            'name' => 'test_name_updated',
            'is_active' => true
        ];
        $genre->update($data);

        foreach ($data as $key => $value) {
            $this->assertEquals($value, $genre->{$key});
        }
        $this->assertTrue($genre->is_active);
    }

    public function test_Delete()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->create();
        $this->assertNull($genre->deleted_at);

        $genre->delete();

        $this->assertNotNull($genre->deleted_at);
        $this->assertNull(Genre::find($genre->id));
        $this->assertEquals(count(Genre::all()), 0);

        $this->assertNotNull(Genre::withTrashed($genre->id));

        $genre->restore();

        $this->assertNotNull(Genre::find($genre->id));
    }
}
