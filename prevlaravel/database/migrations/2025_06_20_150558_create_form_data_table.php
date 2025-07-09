<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('form_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('user_company')->nullable();
            $table->text('user_motivation')->nullable();
            $table->text('user_inspiration')->nullable();
            $table->text('user_concerns')->nullable();
            $table->text('project_description')->nullable();
            $table->string('solution_type')->nullable();
            $table->string('audience')->nullable();
            $table->json('features')->nullable();
            $table->string('visual_style')->nullable();
            $table->string('timing')->nullable();
            $table->string('budget')->nullable();
            $table->text('mission_part1')->nullable();
            $table->text('mission_part2')->nullable();
            $table->text('mission_part3')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_data');
    }
};