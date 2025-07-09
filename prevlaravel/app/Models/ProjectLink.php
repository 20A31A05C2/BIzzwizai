<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectLink extends Model
{
    use HasFactory;

    protected $table = 'project_links';

    protected $fillable = [
        'form_data_id',
        'figma_url',
        'payment_url',
    ];

    public function formData()
    {
        return $this->belongsTo(FormData::class, 'form_data_id');
    }
}