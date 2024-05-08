<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->string("Immatricule")->primary();
            $table->string("type");
            $table->string("license_plate")->unique();
            $table->string("Company_provider");
            $table->float("current_kilometers");
            $table->float("max_kilometers");
            $table->boolean("for_replacing");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("cars");
    }
};
