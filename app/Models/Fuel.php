<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fuel extends Model
{
    use HasFactory;
    protected $table = 'fuels';
    public $timestamps = false;

    protected $fillable = ['Immatricule', 'onee_id','Date', 'quantity', 'montant', 'provider'];

}
