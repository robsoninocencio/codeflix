<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExampleTest extends TestCase
{
    use DatabaseMigrations;
    /** @var TestResponse $response */
    public function testBasicTest()
    {
        $response = $this->get('/api/categories/1');

        $response->assertStatus(404);
    }
}
