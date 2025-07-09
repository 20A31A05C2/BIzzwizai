<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_features', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_data_id')->constrained('form_data')->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('status')->default('planned');
            $table->string('icon')->default('Activity');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_features');
    }
};