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
        Schema::create("actionsontables", function (Blueprint $table) {
            $table->bigIncrements("actionid");
            $table->string("ActionPreformer");
            $table->enum("typeOfAction", ["Import", "Export"]);
            $table->enum("table", ["Cars", "Users", "Car Assignments", "Maintenance", "Fuels", "Inspections", "Accidents"]);
            $table->text("description")->nullable();
            $table->timestamps();
            $table->foreign('ActionPreformer')->references('onee_id')->on('users')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("actionsontables");
    }
};
