<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoadmapItem extends Model
{
    use HasFactory;

    protected $table = 'roadmap_items';

    protected $fillable = [
        'form_data_id',
        'name',
        'description',
        'status',
        'icon',
        'target_date',
        'assigned_to',
        'order_index',
    ];

    protected $casts = [
        'target_date' => 'datetime',
    ];

    public function formData()
    {
        return $this->belongsTo(FormData::class, 'form_data_id');
    }
}