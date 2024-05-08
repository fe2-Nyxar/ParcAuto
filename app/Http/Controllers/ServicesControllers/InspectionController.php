<?php

namespace App\Http\Controllers\ServicesControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inspection;
use DateTime;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InspectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (Auth::user()->isboss) {
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
            $InspectionData = Inspection::paginate($paginationNumber)->through(

                fn ($inspec) => [
                    'ID' => $inspec->inspection_id,
                    'Immatricule' => $inspec->Immatricule,
                    'previous' => $inspec->last_inspection_date,
                    'next' => date('Y-m-d', strtotime('6 months', strtotime($inspec->last_inspection_date))),
                    $date1 = new DateTime(now()->toDateString()),
                    $date2 = new DateTime(date('Y-m-d', strtotime('6 months', strtotime($inspec->last_inspection_date)))),

                    'stages' => [
                        'stg1' => date('Y-m-d', strtotime('5 months', strtotime($inspec->last_inspection_date)))  <= now()->toDateString() && now()->toDateString() <= date('Y-m-d', strtotime('5 months 15 days', strtotime($inspec->last_inspection_date))),
                        'stg2' => (date('Y-m-d', strtotime('5 months 15 days', strtotime($inspec->last_inspection_date))) <= now()->toDateString() && now()->toDateString() <= date('Y-m-d', strtotime('5 months 21 days', strtotime($inspec->last_inspection_date)))),
                        'stg3' => (date('Y-m-d', strtotime('5 months 21 days', strtotime($inspec->last_inspection_date))) <= now()->toDateString() && now()->toDateString() <= date('Y-m-d', strtotime('6 months', strtotime($inspec->last_inspection_date)))),
                        'stg4' => (now()->toDateString() >= date('Y-m-d', strtotime('6 months', strtotime($inspec->last_inspection_date)))),
                    ],
                    'daysBetweenInspections' => $date1->diff($date2)->days,


                ]
            )->onEachSide(1)->withQueryString();

            return Inertia::render("Admin/Tables/Inspections/InspectionsPage", ['InspectionData' => $InspectionData]);
        }
        return redirect()->back();
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
