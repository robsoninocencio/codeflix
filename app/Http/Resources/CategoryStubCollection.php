<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CategoryStubCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection->each(function ($categoryStub) {
                new CategoryStubResource($categoryStub);
            }),
            'key' => 'value',
            'key1' => 'value'
        ];
    }
}
