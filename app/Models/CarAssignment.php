<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarAssignment extends Model
{
    use HasFactory;
    protected $table = 'car_assignments';
    protected $fillable = ['Immatricule', 'onee_id', 'started_at', 'ended_at'];
}
