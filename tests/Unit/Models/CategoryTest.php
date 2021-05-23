<?php

namespace Tests\Unit\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\Uuid;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    private $category;

    public static function setUpBeforeClass(): void
    {
        // dump('É executado apenas uma vez antes de todos os testes');
    }

    protected function setUp(): void
    {
        parent::setUp();
        // dump('É executado antes de cada test');
        $this->category = new Category();
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
        $categoryTraits = array_keys(class_uses(Category::class));
        $this->assertEquals($traits, $categoryTraits);
    }
    public function testFillableAttribute()
    {
        $fillable = ['name', 'description', 'is_active'];
        $this->assertEquals($fillable, $this->category->getFillable());
    }

    public function testDatesAttribute()
    {
        $dates = ['deleted_at', 'created_at', 'updated_at'];
        $this->assertEquals($dates, $this->category->getDates());

        foreach ($dates as $date) {
            $this->assertContains($date, $this->category->getDates());
        };
        $this->assertCount(count($dates), $this->category->getDates());
    }

    public function testCastsAttribute()
    {
        $casts = ['is_active' => 'boolean'];
        $this->assertEquals($casts, $this->category->getCasts());
    }

    public function testkeyType()
    {
        $this->assertEquals('string', $this->category->getKeyType());
    }

    public function testIncrementing()
    {
        $this->assertFalse($this->category->incrementing);
    }
}
