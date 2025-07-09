<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'description'
    ];

    protected $casts = [
        'value' => 'string'
    ];

    /**
     * Get setting value by key
     */
    public static function get($key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }

    /**
     * Set setting value
     */
    public static function set($key, $value, $description = null)
    {
        return static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $value,
                'description' => $description
            ]
        );
    }

    /**
     * Check if setting exists
     */
    public static function has($key)
    {
        return static::where('key', $key)->exists();
    }

    /**
     * Remove setting
     */
    public static function remove($key)
    {
        return static::where('key', $key)->delete();
    }
}