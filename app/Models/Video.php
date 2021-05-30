<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Video extends Model
{
    use SoftDeletes, Traits\Uuid;

    const RATING_LIST = ['L', '10', '12', '14', '16', '18'];

    protected $fillable = [
        'title',
        'description',
        'year_launched',
        'opened',
        'rating',
        'duration'
    ];
    protected $dates = ['deleted_at', 'created_at', 'updated_at'];
    protected $casts = [
        'opened' => 'boolean',
        'year_launched' => 'Integer',
        'duration' => 'integer'
    ];
    protected $keyType = 'string';
    public $incrementing = false;
}
