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
        Schema::create('accidents', function (Blueprint $table) {
            $table->bigIncrements("accident_id");
            $table->string("Immatricule");
            $table->boolean("police_or_amiable");
            $table->date("accident_date");
            $table->text("Damage");
            $table->date("replacement_car_delivery_date")->nullable();
            $table->string("replacement_vehicle_registration_number")->nullable();
            $table->date("car_return_date")->nullable();
            $table->foreign('Immatricule')->references('Immatricule')->on('cars');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accidents');
    }
};
