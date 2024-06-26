<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inspection extends Model
{
    use HasFactory;
    protected $table = 'inspections';
    public $timestamps = false;

    protected $fillable = ['Immatricule', 'last_inspection_date'];
}
