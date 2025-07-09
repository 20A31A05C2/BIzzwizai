<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_data_id')->constrained('form_data')->onDelete('cascade');
            $table->text('activity_log');
            $table->string('actor')->default('Admin');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_activities');
    }
};