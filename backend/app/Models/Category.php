<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes, Traits\Uuid;
    protected $fillable = ['name', 'description', 'is_active'];
    protected $dates = ['deleted_at', 'created_at', 'updated_at'];
    protected $casts = [
        'is_active' => 'boolean'
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function genres()
    {
        return $this->belongsToMany(Genre::class)->withTrashed();
    }
}
