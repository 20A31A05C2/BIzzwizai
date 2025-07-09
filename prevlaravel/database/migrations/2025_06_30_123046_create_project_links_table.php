<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_data_id')->constrained('form_data')->onDelete('cascade');
            $table->string('figma_url')->nullable();
            $table->string('payment_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_links');
    }
};