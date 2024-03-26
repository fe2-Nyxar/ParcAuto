<?php

namespace App\Http\Controllers\DataControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ImportController extends Controller
{

    public function Index()
    {
        return Inertia::render("Data/Import");
    }
    public function importCarsTable()
    {
    }
    public function importUserTable(Request $request)
    {
        dd($request);
    }
    public function importAccidentsTable()
    {
    }
    public function importFuelsTable()
    {
    }
    public function importMaintenanceTable()
    {
    }
    public function importInspectionTable()
    {
    }
}
