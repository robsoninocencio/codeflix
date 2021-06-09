<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\CastMemberCollection;
use App\Http\Resources\CastMemberResource;
use App\Models\CastMember;

class CastMemberController extends BasicCrudController
{
    private $rules;

    public function __construct()
    {
        $this->rules = [
            'name' => 'required|max:255',
            'type' => 'required|in:' . implode(',', [CastMember::TYPE_ACTOR, CastMember::TYPE_DIRECTOR])
        ];
    }

    public function index()
    {
        $collection = parent::index();
        return new CastMemberCollection($collection);
    }

    public function show($id)
    {
        $obj = parent::show($id);
        return new CastMemberResource($obj);
    }

    protected function model()
    {
        return CastMember::class;
    }

    protected function rulesStore()
    {
        return $this->rules;
    }
    protected function rulesUpdate()
    {
        return $this->rules;
    }

    protected function resource()
    {
        return CastMemberResource::class;
    }
}
