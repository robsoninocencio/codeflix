<?php

namespace Tests\Feature\Models;

use App\Models\Category;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use DatabaseMigrations;

    public function testList()
    {
        factory(Category::class, 1)->create();
        $categories = Category::all();
        $this->assertCount(1, $categories);
        $categoryKey = array_keys($categories->first()->getAttributes());
        $this->assertEqualsCanonicalizing(
            ['id', 'name', 'description', 'is_active', 'created_at', 'updated_at', 'deleted_at'],
            $categoryKey
        );
    }

    /** @test */
    public function test_Create()
    {
        $category = Category::create([
            'name' => 'test1'
        ]);
        $category->refresh();

        $this->assertNotEmpty($category->id);
        $this->assertEquals(36, strlen($category->id));
        $this->assertTrue((bool)preg_match('/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i', $category->id));

        $this->assertEquals('test1', $category->name);
        $this->assertNull($category->description);
        $this->assertTrue($category->is_active);

        $category = Category::create([
            'name' => 'test1', 'description' => null
        ]);
        $this->assertNull($category->description);

        $category = Category::create([
            'name' => 'test1', 'description' => "test_description"
        ]);
        $this->assertEquals('test_description', $category->description);

        $category = Category::create([
            'name' => 'test1', 'is_active' => false
        ]);
        $this->assertFalse($category->is_active);

        $category = Category::create([
            'name' => 'test1', 'is_active' => true
        ]);
        $this->assertTrue($category->is_active);
    }
}
