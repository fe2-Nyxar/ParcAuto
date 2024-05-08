<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;
    protected $table = 'cars';
    protected $fillable = ["Immatricule", "type", "license_plate", "Company_provider", "current_kilometers", "max_kilometers", "for_replacing"];
}
