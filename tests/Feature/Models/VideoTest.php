<?php

namespace Tests\Feature\Models;

use App\Models\Category;
use App\Models\Genre;
use App\Models\Video;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class VideoTest extends TestCase
{
    use DatabaseMigrations;

    public function testList()
    {
        factory(Video::class)->create();
        $videos = Video::all();
        $this->assertCount(1, $videos);

        $videoKey = array_keys($videos->first()->getAttributes());
        $this->assertEqualsCanonicalizing(
            [
                'id', 'title', 'description', 'year_launched', 'opened',
                'rating', "duration", 'created_at', 'updated_at', 'deleted_at'
            ],
            $videoKey
        );
    }

    /** @test */
    public function test_Create()
    {
        $video = Video::create([
            'title' => 'video_title',
            'description' => 'video_description',
            'year_launched' => 2000,
            'rating' => '18',
            'duration' => 120,
        ]);
        $video->refresh();

        $this->assertNotEmpty($video->id);
        $this->assertEquals(36, strlen($video->id));
        $this->assertTrue((bool)preg_match('/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i', $video->id));

        $this->assertEquals('video_title', $video->title);
        $this->assertEquals('video_description', $video->description);
        $this->assertEquals(2000, $video->year_launched);
        $this->assertEquals('18', $video->rating);
        $this->assertEquals(120, $video->duration);

        $this->assertFalse($video->opened);

        $video = Video::create([
            'title' => 'video_title',
            'description' => 'video_description',
            'year_launched' => 2000,
            'rating' => '18',
            'duration' => 120,
            'opened' => true,
        ]);
        $video->refresh();

        $this->assertTrue($video->opened);
    }

    public function test_Update()
    {
        /** @var Video $video */
        $category = factory(Category::class)->create();
        $genre = factory(Genre::class)->create();
        $video = Video::create([
            'title' => 'video_title',
            'description' => 'video_description',
            'year_launched' => 2000,
            'rating' => '18',
            'duration' => 120,
            'category_id' => $category->id,
            'genre_id' => $genre->id
        ]);
        $video->refresh();
        $data = [
            'title' => 'video_title_updated',
            'description' => 'video_description_updated',
            'year_launched' => 2020,
            'opened' => true,
            'rating' => 'L',
            'duration' => 180
        ];
        $video->update($data);

        foreach ($data as $key => $value) {
            $this->assertEquals($value, $video->{$key});
        }
    }

    public function test_Delete()
    {
        /** @var Video $video */
        $video = factory(Video::class)->create();

        $this->assertNull($video->deleted_at);

        $video->delete();

        $this->assertNotNull($video->deleted_at);
        $this->assertNull(Video::find($video->id));

        $video->restore();

        $this->assertNotNull(Video::find($video->id));
    }
}
