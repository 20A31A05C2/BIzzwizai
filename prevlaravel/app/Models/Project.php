<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $table = 'projects';

    protected $fillable = [
        'user_id',
        'form_data_id',
        'project_name',
        'project_description',
        'budget',
        'progress',
        'start_date',
        'end_date',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function formData()
    {
        return $this->belongsTo(FormData::class, 'form_data_id');
    }
}