<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectActivity extends Model
{
    use HasFactory;

    protected $table = 'project_activities';

    protected $fillable = [
        'form_data_id',
        'activity_log',
        'actor',
        'created_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function FormData()
    {
        return $this->belongsTo(FormData::class, 'form_data_id');
    }
}