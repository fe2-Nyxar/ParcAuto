<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    use HasFactory;

    protected $table = 'maintenances';
    public $timestamps = false;
    protected $fillable = ['Immatricule', 'intervention_date', 'work_preformed', 'location'];
}
