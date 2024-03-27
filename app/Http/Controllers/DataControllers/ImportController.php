<?php

namespace App\Http\Controllers\DataControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;


class ImportController extends Controller
{

    public function Index()
    {
        return Inertia::render("Data/Import");
    }
    public function importCarsTable(Request $request)
    {
        $request->validate([
            'tableToImport' => 'required|in:user',
            'fileToImport' => 'required|file|mimes:csv,text'
        ]);
    }
    public function importUserTable(Request $request)
    {
        $request->validate([
            'tableToImport' => 'required|in:user',
            'fileToImport' => 'required|file|mimes:csv,text'
        ]);
        $destination = "storage/upload";
    }
    public function importAccidentsTable(Request $request)
    {
        dd($request);
        $request->validate([
            'tableToImport' => 'required|in:user',
            'fileToImport' => 'required|file|mimes:csv,text'
        ]);
    }
    public function importFuelsTable(Request $request)
    {
        dd($request);
        $request->validate([
            'tableToImport' => 'required|in:user',
            'fileToImport' => 'required|file|mimes:csv,text'
        ]);
    }
    public function importMaintenanceTable(Request $request)
    {
        $request->validate([
            'tableToImport' => 'required|in:user',
            'fileToImport' => 'required|file|mimes:csv,text'
        ]);
    }
    public function importInspectionTable(Request $request)
    {
        $request->validate([
            'tableToImport' => 'required|in:user',
            'fileToImport' => 'required|file|mimes:csv,text'
        ]);
    }
}
