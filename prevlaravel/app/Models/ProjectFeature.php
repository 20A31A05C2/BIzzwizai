<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectFeature extends Model
{
    use HasFactory;

    protected $table = 'project_features';

    protected $fillable = [
        'form_data_id',
        'name',
        'description',
        'status',
        'icon',
    ];

    public function formData()
    {
        return $this->belongsTo(FormData::class, 'form_data_id');
    }
}