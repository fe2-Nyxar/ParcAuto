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
        Schema::create('car_assignments', function (Blueprint $table) {
            $table->bigIncrements("assignement_id");
            $table->string("Immatricule");
            $table->string("onee_id");
            $table->timestamp("started_at")->useCurrent();
            $table->timestamp("ended_at")->nullable();
            $table->foreign('onee_id')->references('onee_id')->on('users');
            $table->foreign('Immatricule')->references('Immatricule')->on('cars');
        });
    }




    /**
     Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_assignments');
    }
};
