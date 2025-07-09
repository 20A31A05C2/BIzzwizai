<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormData extends Model
{
    use HasFactory;

    protected $table = 'form_data';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'user_company',
        'user_motivation',
        'user_inspiration',
        'user_concerns',
        'project_description',
        'solution_type',
        'audience',
        'features',
        'visual_style',
        'timing',
        'budget',
        'mission_part1',
        'mission_part2',
        'mission_part3',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'features' => 'array',
    ];

    /**
     * Get the user that owns the form data.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'form_data_id');
    }

    public function projectLinks()
    {
        return $this->hasOne(ProjectLink::class, 'form_data_id');
    }

    public function roadmapItems()
    {
        return $this->hasMany(RoadmapItem::class, 'form_data_id');
    }

    public function projectFeatures()
    {
        return $this->hasMany(ProjectFeature::class, 'form_data_id');
    }

    public function projectActivities()
    {
        return $this->hasMany(ProjectActivity::class, 'form_data_id');
    }
}
