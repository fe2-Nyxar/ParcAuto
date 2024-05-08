
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
        Schema::create('fuels', function (Blueprint $table) {
            $table->bigIncrements("fuel_id");
            $table->string("Immatricule");
            $table->date("Date");
            $table->float("quantity");
            $table->float("montant");
            $table->string("provider");
            $table->foreign('onee_id')->references('onee_id')->on('users')->onDelete('CASCADE');
            $table->foreign('Immatricule')->references('Immatricule')->on('cars')->onDelete('CASCADE');
            $table->addColumn("datatime2", "")->generatedAs()->row;
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
