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
        Schema::create('fuels', function (Blueprint $table) {
            $table->bigIncrements("fuels_id");
            $table->string("Immatricule");
            $table->date("Date");
            $table->float("quantity");
            $table->float("montant");
            $table->string("provider");
            $table->foreign('Immatricule')->references('Immatricule')->on('cars');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fuels');
    }
};
