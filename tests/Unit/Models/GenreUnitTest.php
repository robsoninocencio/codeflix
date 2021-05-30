<?php

namespace Tests\Unit\Models;

use App\Models\Genre;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\Uuid;
use Tests\TestCase;

class GenreUnitTest extends TestCase
{
    private $genre;

    public static function setUpBeforeClass(): void
    {
        // dump('É executado apenas uma vez antes de todos os testes');
    }

    protected function setUp(): void
    {
        parent::setUp();
        // dump('É executado antes de cada test');
        $this->genre = new Genre();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        // dump('É executado depois de cada test');
    }

    public static function tearDownAfterClass(): void
    {
        // dump('É executado apenas uma vez depois de todos os testes');
    }


    public function testIfUseTraits()
    {
        $traits = [
            SoftDeletes::class,
            Uuid::class
        ];
        $genreTraits = array_keys(class_uses(Genre::class));
        $this->assertEquals($traits, $genreTraits);
    }
    public function testFillableAttribute()
    {
        $fillable = ['name', 'is_active'];
        $this->assertEquals($fillable, $this->genre->getFillable());
    }

    public function testDatesAttribute()
    {
        $dates = ['deleted_at', 'created_at', 'updated_at'];
        $this->assertEquals($dates, $this->genre->getDates());

        foreach ($dates as $date) {
            $this->assertContains($date, $this->genre->getDates());
        };
        $this->assertCount(count($dates), $this->genre->getDates());
    }

    public function testCastsAttribute()
    {
        $casts = ['is_active' => 'boolean'];
        $this->assertEquals($casts, $this->genre->getCasts());
    }

    public function testkeyType()
    {
        $this->assertEquals('string', $this->genre->getKeyType());
    }

    public function testIncrementing()
    {
        $this->assertFalse($this->genre->incrementing);
    }
}
