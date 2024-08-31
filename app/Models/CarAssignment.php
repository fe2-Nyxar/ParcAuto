<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarAssignment extends Model
{
    use HasFactory;
    protected $table = 'car_assignments';
    public $timestamps = false;
    protected $fillable = ['Immatricule', 'onee_id', 'ended_at'];
}
