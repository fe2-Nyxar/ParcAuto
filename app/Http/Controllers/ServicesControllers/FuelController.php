<?php

namespace App\Http\Controllers\ServicesControllers;

use App\Http\Controllers\Controller;
use App\Models\Fuel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class FuelController extends Controller
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

        if (Auth::user()->isboss) {
            $FuelsData = Fuel::paginate($paginationNumber)->through(
                fn ($fuel) =>
                [
                    'ID' => $fuel->fuel_id,
                    'Immatricule' => $fuel->Immatricule,
                    'Date' => $fuel->Date,
                    'quantity' => $fuel->quantity,
                    'montant' => $fuel->montant,
                    'provider' => $fuel->provider,
                ]
            )->onEachSide(1)->withQueryString();

            return  Inertia::render("Admin/Tables/Fuels/FuelsPage", ['fuelsData' => $FuelsData]);
        } else {
            $Onee_idUser = Auth::user()->onee_id;
            $FuelsData = Fuel::where('onee_id', $Onee_idUser)->paginate(10)->through(
                fn ($fuel) =>
                [
                    'Immatricule' => $fuel->Immatricule,
                    'Date' => $fuel->Date,
                    'quantity' => $fuel->quantity,
                    'montant' => $fuel->montant,
                    'provider' => $fuel->provider,
                ]
            );
            return Inertia::render("Employee/Tables/Fuels");
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
