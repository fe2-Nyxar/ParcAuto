<?php

namespace App\Http\Controllers\DataControllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Accident;
use App\Models\CarAssignment;
use App\Models\Car;
use App\Models\User;
use App\Models\Fuel;
use App\Models\Inspection;
use App\Models\Maintenance;
use Rap2hpoutre\FastExcel\FastExcel;
use App\Http\Requests\ExportTableRequest;


class ExportController extends Controller
{

    public function Index()
    {
        return Inertia::render("Admin/Data/Export");
    }
    protected function generateCsvByID($table)
    {
        
        ini_set('memory_limit', '4128M');
        switch ($table) {
            case 'user':
                $users = User::query();
                if ($users->count() === 0) {
                    return [];
                }
                $rows = [];
                $users
                    ->lazyById(2000, 'id')
                    ->each(
                        function ($user) use (&$rows) {
                            $rows[] = [
                                "onee_id" => $user->toArray()["onee_id"],
                                "name" => $user->toArray()["name"],
                                "email" => $user->toArray()["email"],
                                "isboss" => $user->toArray()["isboss"],
                                "direction" => $user->toArray()["direction"]
                            ];
                        }
                    );
                return $rows;
            case 'car':
                $cars = Car::query()->where('for_replacing', false);
                if ($cars->count() === 0) {
                    return [];
                }
                $rows = [];
                $cars
                    ->lazyById(2000, 'Immatricule')
                    ->each(function ($car) use (&$rows) {
                        $rows[] =
                            [
                                "Immatricule" => $car->toArray()["Immatricule"],
                                "type" => $car->toArray()["type"],
                                "license_plate" => $car->toArray()["license_plate"],
                                "Company_provider" => $car->toArray()["Company_provider"],
                                "current_kilometers" => $car->toArray()["current_kilometers"],
                                "max_kilometers" => $car->toArray()["max_kilometers"],
                                "for_replacing" => $car->toArray()["for_replacing"],
                            ];
                    });
                return $rows;
            case 'ReplacingCars':
                $RP_car = Car::query()->where('for_replacing', true);
                if ($RP_car->count() === 0) {
                    return;
                }
                $rows = [];
                $RP_car
                    ->lazyById(2000, 'Immatricule')
                    ->each(function ($car) use (&$rows) {
                        $rows[] =
                            [
                                "Immatricule" => $car->toArray()["Immatricule"],
                                "type" => $car->toArray()["type"],
                                "license_plate" => $car->toArray()["license_plate"],
                                "Company_provider" => $car->toArray()["Company_provider"],
                                "current_kilometers" => $car->toArray()["current_kilometers"],
                                "max_kilometers" => $car->toArray()["max_kilometers"],
                                "for_replacing" => $car->toArray()["for_replacing"],
                            ];
                    });
                return $rows;
            case 'accident':
                $accidents = Accident::query();
                if ($accidents->count() === 0) {
                    return [];
                }
                $rows = [];
                $accidents
                    ->lazyById(2000, 'accident_id')
                    ->each(function ($accident) use (&$rows) {
                        $rows[] =
                            [
                                "Immatricule" => $accident->toArray()["Immatricule"],
                                "police_or_amiable" => $accident->toArray()["police_or_amiable"],
                                "accident_date" => $accident->toArray()["accident_date"],
                                "Damage" => $accident->toArray()["Damage"],
                                "replacement_car_delivery_date" => $accident->toArray()["replacement_car_delivery_date"],
                                "replacement_vehicle_registration_number" => $accident->toArray()["replacement_vehicle_registration_number"],
                                "car_return_date" => $accident->toArray()["car_return_date"],
                            ];
                    });
                return $rows;
            case 'maintenance':
                $maintenances = Maintenance::query();
                if ($maintenances->count() === 0) {
                    return [];
                }
                $rows = [];
                $maintenances
                    ->lazyById(2000, 'maintenance_id')
                    ->each(function ($maintenance) use (&$rows) {
                        $rows[] =
                            [
                                "Immatricule" => $maintenance->toArray()["Immatricule"],
                                "intervention_date" => $maintenance->toArray()["intervention_date"],
                                "work_preformed" => $maintenance->toArray()["work_preformed"],
                                "location" => $maintenance->toArray()["location"],
                            ];
                    });
                return $rows;
            case 'fuel':
                $fuels = Fuel::query();
                if ($fuels->count() === 0) {
                    return;
                }
                $rows = [];
                $fuels
                    ->lazyById(2000, 'fuel_id')
                    ->each(function ($fuel) use (&$rows) {

                        $rows[] =
                            [
                                "Immatricule" => $fuel->toArray()["Immatricule"],
                                "Date" => $fuel->toArray()["Date"],
                                "quantity" => $fuel->toArray()["quantity"],
                                "montant" => $fuel->toArray()["montant"],
                                "provider" => $fuel->toArray()["provider"]
                            ];
                    });
                return $rows;
            case 'inspection':
                $inspections = Inspection::query();
                if ($inspections->count() === 0) {
                    return [];
                }
                $rows = [];
                $inspections
                    ->lazyById(2000, 'inspection_id')
                    ->each(function ($inspection) use (&$rows) {
                        $rows[] =
                            [
                                "Immatricule" => $inspection["Immatricule"],
                                "last_inspection_date" => $inspection["last_inspection_date"],
                            ];
                    });
                return $rows;
            case 'carAssignment':
                $carAssignments = CarAssignment::query();
                if ($carAssignments->count() === 0) {
                    return;
                }
                $rows = [];
                $carAssignments
                    ->lazyById(2000, 'assignment_id')
                    ->each(function ($carAssignment) use (&$rows) {
                        $rows[] =
                            [
                                "ID" => $carAssignment->toArray()["assignment_id"],
                                "Immatricule" => $carAssignment->toArray()["Immatricule"],
                                "onee_id" => $carAssignment->toArray()["onee_id"],
                                "started_at" => $carAssignment->toArray()["started_at"],
                                "ended_at" => $carAssignment->toArray()["ended_at"],
                            ];
                    });
                return $rows;

            default:
                return redirect()->back();
        } 
    }

    public function exportCarsTable(ExportTableRequest $request)
    {

        $validatedData = $request->validated();
        $table = $validatedData['tableToExport'];
        $generator = $this->generateCsvByID($table);
        if (empty($generator)) {
            return  redirect()->back();
        }
        $file = storage_path('app/public/exports/cars.csv');
        (new FastExcel($generator))->export($file);
        $publicUrl = asset("storage/exports/cars.csv");
        return Inertia::location($publicUrl);
    }

    public function exportUsersTable(ExportTableRequest $request)
    {
        $validatedData = $request->validated();
        $table = $validatedData['tableToExport'];
        $rows = $this->generateCsvByID($table);
        if (empty($rows)) {
            return  redirect()->back();
        }
        $file = storage_path('app/public/exports/users.csv');
        (new FastExcel($rows))->export($file);
        $publicUrl = asset("storage/exports/users.csv");
        return Inertia::location($publicUrl);
    }
    public function exportAccidentsTable(ExportTableRequest $request)
    {
        $validatedData = $request->validated();
        $table = $validatedData['tableToExport'];
        $rows = $this->generateCsvByID($table);
        if (empty($rows)) {
            return  redirect()->back()->with(['tableToExport' => 'table accidents is empty']);
        }
        $file = storage_path('app/public/exports/accidents.csv');
        (new FastExcel($rows))->export($file);
        $publicUrl = asset("storage/exports/accidents.csv");
        return Inertia::location($publicUrl);
    }
    public function exportFuelsTable(ExportTableRequest $request)
    {
        $validatedData = $request->validated();
        $table = $validatedData['tableToExport'];
        $rows = $this->generateCsvByID($table);
        if (empty($rows)) {
            return  redirect()->back()->with(['tableToExport' => 'table fuels is empty']);
        }
        $file = storage_path('app/public/exports/fuels.csv');
        (new FastExcel($rows))->export($file);
        $publicUrl = asset("storage/exports/fuels.csv");
        return Inertia::location($publicUrl);
    }
    public function exportMaintenanceTable(ExportTableRequest $request)
    {
        $validatedData = $request->validated();
        $table = $validatedData['tableToExport'];
        $rows = $this->generateCsvByID($table);
        if (empty($rows)) {
            ini_set('memory_limit', '1024M');

            return redirect()->back()->with(['tableToExport' => 'table Maintenances is empty']);
        }
        $file = storage_path('app/public/exports/maintenance.csv');
        (new FastExcel($rows))->export($file);
        $publicUrl = asset("storage/exports/maintenance.csv");
        return Inertia::location($publicUrl);
    }
    public function exportInspectionTable(ExportTableRequest $request)
    {
        $validatedData = $request->validated();
        $table = $validatedData['tableToExport'];
        $rows = $this->generateCsvByID($table);
        if (empty($rows)) {
            return  redirect()->back()->with(['tableToExport' => 'table Inspections is empty']);
        }
        $file = storage_path('app/public/exports/inspection.csv');
        (new FastExcel($rows))->export($file);
        $publicUrl = asset("storage/exports/inspection.csv");
        return Inertia::location($publicUrl);
    }
    public function exportCarAssignmentTable(ExportTableRequest $request)
    {
        $validatedData = $request->validated();
        $table = $validatedData['tableToExport'];
        $rows = $this->generateCsvByID($table);
        if (empty($rows)) {
            return  redirect()->back()->with(['tableToExport' => 'table Car Assignments is empty']);
        }
        $file = storage_path('app/public/exports/carAssignment.csv');
        (new FastExcel($rows))->export($file);
        $publicUrl = asset("storage/exports/carAssignment.csv");
        return Inertia::location($publicUrl);
    }
}
