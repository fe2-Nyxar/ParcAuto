<?php

namespace App\Http\Controllers\ServicesControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Car;
use Inertia\Inertia;
use Illuminate\Support\Facades\Schema;

class CarsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
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

        if (auth()->user()->isboss === 1) {
            $CarsData = Car::paginate($paginationNumber)->through(
                fn ($car) =>
                [
                    'Immatricule' => $car->Immatricule,
                    'type' => $car->type,
                    'license_plate' => $car->license_plate,
                    'company_provider' => $car->Company_provider,
                    'current_kilometers' => $car->current_kilometers,
                    'max_kilometers' => $car->max_kilometers,
                    "for_replacing" => $car->max_kilometers
                ]
            )->onEachSide(1)->withQueryString();

            return Inertia::render("Admin/Tables/Cars/CarsPage", ["carsData" => $CarsData]);
        } else {
            return redirect()->back();
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
