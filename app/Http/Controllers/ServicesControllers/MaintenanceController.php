<?php

namespace App\Http\Controllers\ServicesControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Maintenance;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (auth()->user()->isboss) {
            $paginationNumber = $request["elementsPerPage"];

            switch ($paginationNumber) {
                case 10:
                    $paginationNumber =  10;

                    break;
                case 25:
                    $paginationNumber =  25;

                    break;
                case 50:

                    $paginationNumber =  50;

                    break;
                case 75:
                    $paginationNumber =  75;

                    break;
                case 100:
                    $paginationNumber =  100;

                    break;
                case 150:
                    $paginationNumber =  150;

                    break;
                case 200:
                    $paginationNumber =  200;

                    break;
                default:
                    $paginationNumber = 25;

                    break;
            }
            
            $MaintenancesData = Maintenance::paginate($paginationNumber);
            return  Inertia::render("Admin/Tables/Maintenances/MaintenancesPage", ['MaintenancesData'=> $MaintenancesData]);
        } else {
            return Inertia::render("Employee/Tables/Maintenances");
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
