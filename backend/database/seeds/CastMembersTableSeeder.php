<?php

use Illuminate\Database\Seeder;

class CastMembersTableSeeder extends Seeder
{
    public function run()
    {
        factory(\App\Models\CastMember::class, 46)->create();
    }
}
