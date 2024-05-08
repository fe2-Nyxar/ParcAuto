<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accident extends Model
{
    use HasFactory;
    protected $table = 'accidents';
    protected $fillable = ['Immatricule', 'police_or_amiable', 'accident_date', 'Damage', 'replacement_car_delivery_date', 'replacement_vehicle_registration_number', 'car_return_date'];
}
