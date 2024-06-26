<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('car_assignments', function (Blueprint $table) {
            $table->bigIncrements("assignment_id");
            $table->string("Immatricule");
            $table->string("onee_id");
            $table->timestamp("started_at")->useCurrent();
            $table->timestamp("ended_at")->nullable();
            $table->foreign('onee_id')->references('onee_id')->on('users')->onDelete('CASCADE');
            $table->foreign('Immatricule')->references('Immatricule')->on('cars')->onDelete('CASCADE');
        });
    }




    /**
     Reverse the migrations.
     */
    public function down(): void
    {

        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('car_assignments');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
};
