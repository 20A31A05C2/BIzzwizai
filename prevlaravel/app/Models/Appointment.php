<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'figma_url',
        'phone_number',
        'appointment_date',
        'appointment_time',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
