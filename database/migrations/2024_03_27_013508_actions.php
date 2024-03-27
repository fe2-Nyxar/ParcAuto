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
        Schema::create("actionsOnUsers", function (Blueprint $table) {
            $table->bigIncrements("actionid");
            $table->enum("typeOfAction", ["CreateUser", "DeleteUser"]);
            $table->text("description");
            $table->timestamps();
        });
        Schema::create("actionsOnTables", function (Blueprint $table) {
            $table->bigIncrements("actionid");
            $table->enum("typeOfAction", ["Import", "Export"]);
            $table->enum("table", ["Cars", "Users", "Car Assignments", "Maintenance", "Fuels", "Inspections", "Accidents"]);
            $table->text("description");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
