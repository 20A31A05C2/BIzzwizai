<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FormDataResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'user_company' => $this->user_company,
            'user_motivation' => $this->user_motivation,
            'user_inspiration' => $this->user_inspiration,
            'user_concerns' => $this->user_concerns,
            'project_description' => $this->project_description,
            'solution_type' => $this->solution_type,
            'audience' => $this->audience,
            'features' => $this->features,
            'visual_style' => $this->visual_style,
            'timing' => $this->timing,
            'budget' => $this->budget,
            'mission_part1' => $this->mission_part1,
            'mission_part2' => $this->mission_part2,
            'mission_part3' => $this->mission_part3,
            'status' => $this->status,
            'user' => [
                'email' => $this->user->email,
                'name' => $this->user->fullname, 
            ],
        ];
    }
}