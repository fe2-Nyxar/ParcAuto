<?php

namespace App\Http\Controllers\DataControllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImportTableRequest;
use App\Models\Accident;
use App\Models\Car;
use App\Models\CarAssignment;
use App\Models\Fuel;
use App\Models\Inspection;
use App\Models\Maintenance;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Verified;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\QueryException;
use Inertia\Inertia;
use Spatie\SimpleExcel\SimpleExcelReader;

class ImportController extends Controller
{

    public function Index()
    {
        if (!Auth()->user()->hasVerifiedEmail())
            $verificationStateMessage =  "you should verify your email";
        else {
            $verificationStateMessage =  "";
        }
        return Inertia::render("Admin/Data/Import", [
            "errors" => ["verificationStateMessages" => $verificationStateMessage]
        ]);
    }
    public function importCarsTable(ImportTableRequest $request)
    {
        if (!Auth()->user()->hasVerifiedEmail()) return redirect()->back();

        $request->validated();
        $file = $request->file('fileToImport');
        if ($request['tableToImport'] === 'cars') {

            set_time_limit(0);
            ini_set("memory_limit", "6144M");


            SimpleExcelReader::create($file, 'csv')
                ->useHeaders([
                    'Immatricule',
                    'type',
                    'license_plate',
                    'Company_provider',
                    'current_kilometers',
                    'max_kilometers',
                    'for_replacing'
                ])
                ->getRows()
                ->each(function (array $row) {
                    Car::create([
                        'Immatricule' => $row['Immatricule'], 'type' => $row['type'], 'license_plate' => $row['license_plate'], 'Company_provider' => $row['Company_provider'], 'current_kilometers' => $row['current_kilometers'], 'max_kilometers' => $row['max_kilometers'], 'for_replacing' => $row['for_replacing']
                    ]);
                });
            set_time_limit(30);
            ini_set("memory_limit", "512M");
        }
    }
    public function importUsersTable(ImportTableRequest $request)
    {
        if (!Auth()->user()->hasVerifiedEmail()) return Inertia::render("Admin/Data/Import", ["unVerifiedUser" => "you should verify your email"]);
        $request->validated();
        $file = $request->file('fileToImport');
        try {
            if ($request['tableToImport'] === 'user') {
                $headers = SimpleExcelReader::create($file, 'csv')->getHeaders();
                $CsvHeaderChecked =
                    $headers[0] === "Immatricule" &&
                    $headers[0] === "Date" &&
                    $headers[0] === "quantity" &&
                    $headers[0] === "montant" &&
                    $headers[0] === "provider";
                if ($CsvHeaderChecked) {
                    set_time_limit(0);
                    ini_set("memory_limit", "6144M");
                    SimpleExcelReader::create($file, 'csv')

                        ->useHeaders([
                            'onee_id',
                            'name',
                            'email',
                            'isboss',
                            'direction',
                            'password',
                        ])
                        ->getRows()
                        ->each(function (array $row) {

                            User::create([
                                'onee_id' => $row['onee_id'], 'name' => $row['name'], 'email' => $row['email'], 'isboss' => $row['isboss'], 'direction' => $row['direction'], 'password' => $row['password']
                            ]);
                        });
                    set_time_limit(30);
                    ini_set("memory_limit", "512M");
                }
            }
        } catch (QueryException  $e) {
            dd($e, $e->getBindings());
        }
        return Inertia::render("Admin/Data/Import")->with(["Success" => "Data Imported Successfully"]);
    }
    public function importAccidentsTable(ImportTableRequest $request)
    {
        if (!Auth()->user()->hasVerifiedEmail()) return redirect()->back();

        $request->validated();

        if ($request['tableToImport'] === 'accident') {

            set_time_limit(0);
            ini_set("memory_limit", "6144M");
            $file = $request->file('fileToImport');

            SimpleExcelReader::create($file, 'csv')
                ->useHeaders([
                    'Immatricule',
                    'police_or_amiable',
                    'accident_date',
                    'Damage',
                    'replacement_car_delivery_date',
                    'replacement_vehicle_registration_number',
                    'car_return_date'
                ])
                ->getRows()
                ->each(function (array $row) {

                    Accident::create([
                        $accident_date = Carbon::createFromFormat('d/m/Y', $row['accident_date'])->format('Y-m-d'),
                        $car_return_date = Carbon::createFromFormat('d/m/Y', $row['car_return_date'])->format('Y-m-d'),

                        'Immatricule' => $row['Immatricule'], 'police_or_amiable' => $row['police_or_amiable'], 'accident_date' => $accident_date, 'Damage' => $row['Damage'], 'replacement_car_delivery_date' => $row['replacement_car_delivery_date'], 'replacement_vehicle_registration_number' => $row['replacement_vehicle_registration_number'], 'car_return_date' => $car_return_date
                    ]);
                });
            set_time_limit(30);
            ini_set("memory_limit", "512M");
        }
        return Inertia::render("Admin/Data/Import")->with(["Success" => "Data Imported Successfully"]);
    }
    public function importFuelsTable(ImportTableRequest $request)
    {
        if (!Auth()->user()->hasVerifiedEmail()) return redirect()->back();

        $request->validated();
        $file = $request->file('fileToImport');
        if ($request['tableToImport'] === 'fuel') {
            set_time_limit(0);
            ini_set("memory_limit", "6144M");
            SimpleExcelReader::create($file, 'csv')
                ->useHeaders([
                    'Immatricule',
                    'Date',
                    'quantity',
                    'montant',
                    'provider',
                ])
                ->getRows()
                ->each(function (array $row) {
                    Fuel::create([
                        $Date = Carbon::createFromFormat('d/m/Y', $row['Date'])->format('Y-m-d'),

                        'Immatricule' => $row['Immatricule'], 'Date' => $Date, 'quantity' => $row['quantity'], 'montant' => $row['montant'], 'provider' => $row['provider']
                    ]);
                });
            set_time_limit(30);
            ini_set("memory_limit", "512M");
        }
        return Inertia::render("Admin/Data/Import")->with(["Success" => "Data Imported Successfully"]);
    }
    public function importMaintenanceTable(ImportTableRequest $request)
    {
        if (!Auth()->user()->hasVerifiedEmail()) return redirect()->back();

        $request->validated();
        $file = $request->file('fileToImport');
        if ($request['tableToImport'] === 'maintenance') {
            set_time_limit(0);
            ini_set("memory_limit", "6144M");
            SimpleExcelReader::create($file, 'csv')
                ->useHeaders([
                    'Immatricule',
                    'intervention_date',
                    'work_preformed',
                    'location',
                ])
                ->getRows()
                ->each(function (array $row) {
                    Maintenance::create([
                        $intervention_date = Carbon::createFromFormat('d/m/Y', $row['intervention_date'])->format('Y-m-d'),

                        'Immatricule' => $row['Immatricule'], 'intervention_date' => $intervention_date, 'work_preformed' => $row['work_preformed'], 'location' => $row['location']
                    ]);
                });
            set_time_limit(30);
            ini_set("memory_limit", "512M");
        }
        return Inertia::render("Admin/Data/Import")->with(["Success" => "Data Imported Successfully"]);
    }
    public function importInspectionTable(ImportTableRequest $request)
    {
        if (!Auth()->user()->hasVerifiedEmail()) return redirect()->back();

        $request->validated();
        $file = $request->file('fileToImport');
        if ($request['tableToImport'] === 'inspection') {
            set_time_limit(0);
            ini_set("memory_limit", "6144M");
            SimpleExcelReader::create($file, 'csv')
                ->useHeaders([
                    'Immatricule',
                    'last_inspection_date'
                ])
                ->getRows()
                ->each(function (array $row) {
                    Inspection::create([
                        $last_inspection_date = Carbon::createFromFormat('d/m/Y', $row['last_inspection_date'])->format('Y-m-d'),

                        'Immatricule' => $row['Immatricule'], 'last_inspection_date' => $last_inspection_date
                    ]);
                });
            set_time_limit(30);
            ini_set("memory_limit", "512M");
        }
        return Inertia::render("Admin/Data/Import")->with(["Success" => "Data Imported Successfully"]);
    }
    public function importCarAssignmentTable(ImportTableRequest $request)
    {
        if (!Auth()->user()->hasVerifiedEmail()) return redirect()->back();

        $request->validated();
        $file = $request->file('fileToImport');
        if ($request['tableToImport'] === 'carAssignment') {
            set_time_limit(0);
            ini_set("memory_limit", "6144M");
            SimpleExcelReader::create($file, 'csv')
                ->useHeaders([
                    'Immatricule',
                    'onee_id',
                    'ended_at',
                ])
                ->getRows()
                ->each(function (array $row) {
                    CarAssignment::create([
                        $ended_at = Carbon::createFromFormat('d/m/Y', $row['ended_at'])->format('Y-m-d'),
                        'Immatricule' => $row['Immatricule'], 'onee_id' => $row['onee_id'], 'ended_at' => $ended_at,
                    ]);
                });
            set_time_limit(30);
            ini_set("memory_limit", "512M");
        }

        return Inertia::render("Admin/Data/Import")->with(["Success" => "Data Imported Successfully"]);
    }
}
