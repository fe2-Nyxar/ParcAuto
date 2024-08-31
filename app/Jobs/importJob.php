<?php

namespace App\Jobs;

use App\Models\Accident;
use App\Models\Car;
use App\Models\CarAssignment;
use App\Models\Fuel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Spatie\SimpleExcel\SimpleExcelReader;
use App\Models\Inspection;
use App\Models\Maintenance;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

use function PHPUnit\Framework\isEmpty;

class importJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    private $filePath;
    private $table;
    public function __construct($filePath, $table)
    {

        $this->filePath = $filePath;
        $this->table = $table;
    }

    /**
     * Execute the job.
     */

    function convertToDateFormat($dateString, $format = 'Y-m-d')
    {
        if ($dateString != '') {
            $formats = ['d-m-Y', 'Y-m-d', 'Y/m/d', 'd/m/Y', 'm-d-Y', 'm/d/Y'];
            foreach ($formats as $fmt) {
                try {
                    $date = Carbon::createFromFormat($fmt, $dateString);
                    return $date->format($format);
                } catch (\Exception $e) {
                    //
                }
            }
        }
        return null;
    }
    public function handle(): void
    {


        try {
            $table = $this->table;
            $exactFilePath = storage_path("/app/public/" . $this->filePath);
            set_time_limit(0);
            ini_set("memory_limit", "6144M");
            switch ($table) {
                case "cars":
                    SimpleExcelReader::create($exactFilePath, 'csv')
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
                                'Immatricule' => $row['Immatricule'],
                                'type' => $row['type'],
                                'license_plate' => $row['license_plate'],
                                'Company_provider' => $row['Company_provider'],
                                'current_kilometers' => $row['current_kilometers'],
                                'max_kilometers' => $row['max_kilometers'],
                                'for_replacing' => $row['for_replacing']
                            ]);
                        });

                case "inspections":
                    SimpleExcelReader::create($exactFilePath, 'csv')
                        ->useHeaders([
                            'Immatricule',
                            'last_inspection_date'
                        ])
                        ->getRows()
                        ->each(function (array $row) {
                            Inspection::create([
                                'Immatricule' => $row['Immatricule'],
                                'last_inspection_date' => $row['last_inspection_date'],
                            ]);
                        });
                case "users":
                    SimpleExcelReader::create($exactFilePath, 'csv')
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
                                'onee_id' => $row['onee_id'],
                                'name' => $row['name'],
                                'email' => $row['email'],
                                'isboss' => $row['isboss'],
                                'direction' => $row['direction'],
                                'password' => $row['password']
                            ]);
                        });

                case "accidents":
                    SimpleExcelReader::create($exactFilePath, 'csv')
                        ->useHeaders([
                            'Immatricule',
                            'onee_id',
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
                                'Immatricule' => $row['Immatricule'],
                                'police_or_amiable' => $row['police_or_amiable'],
                                'onee_id' => $row['onee_id'],
                                'accident_date' => $this->convertToDateFormat($row["accident_date"]),
                                'Damage' => $row['Damage'],
                                'replacement_car_delivery_date' => $this->convertToDateFormat($row['replacement_car_delivery_date']),
                                'replacement_vehicle_registration_number' => $this->convertToDateFormat($row['replacement_vehicle_registration_number']),
                                'car_return_date' => $this->convertToDateFormat($row['car_return_date'])
                            ]);
                        });
                case "fuels":
                    SimpleExcelReader::create($exactFilePath, 'csv')
                        ->useHeaders([
                            'Immatricule',
                            'onee_id',
                            'Date',
                            'quantity',
                            'montant',
                            'provider',
                        ])
                        ->getRows()
                        ->each(function (array $row) {
                            Fuel::create([
                                'Immatricule' => $row['Immatricule'],
                                'onee_id' => $row['onee_id'],
                                'Date' => $this->convertToDateFormat($row['Date']),
                                'quantity' => $row['quantity'],
                                'montant' => $row['montant'],
                                'provider' => $row['provider']
                            ]);
                        });
                case "maintenances":
                    SimpleExcelReader::create($exactFilePath, 'csv')
                        ->useHeaders([
                            'Immatricule',
                            'intervention_date',
                            'work_preformed',
                            'location',
                        ])
                        ->getRows()
                        ->each(function (array $row) {
                            Maintenance::create([
                                'Immatricule' => $row['Immatricule'],
                                'intervention_date' => $this->convertToDateFormat($row['intervention_date']),
                                'work_preformed' => $row['work_preformed'],
                                'location' => $row['location']
                            ]);
                        });
                case "assignments":
                    SimpleExcelReader::create($exactFilePath, 'csv')
                        ->useHeaders([
                            'Immatricule',
                            'onee_id',
                            'ended_at',
                        ])
                        ->getRows()
                        ->each(function (array $row) {
                            CarAssignment::create([
                                'Immatricule' => $row['Immatricule'],
                                'onee_id' => $row['onee_id'],
                                'ended_at' => $this->convertToDateFormat($row['ended_at'])
                            ]);
                        });
            }
            set_time_limit(30);
            ini_set("memory_limit", "1024M");
        } catch (Exception $e) {
            Log::emergency("important message from the import task queue: ", $e);
        }
    }
}
