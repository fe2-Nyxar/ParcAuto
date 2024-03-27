<?php

namespace App\Http\Controllers\DataControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Accident;
use App\Models\CarAssignment;
use App\Models\Car;
use App\Models\User;
use App\Models\Fuel;
use App\Models\Inspection;
use App\Models\Maintenance;
use Rap2hpoutre\FastExcel\FastExcel;

class ExportController extends Controller
{
    public function Index()
    {
        return Inertia::render("Data/Export");
    }
    protected function generateCsvByID($table)
    {
        if ($table === "user") {

            $users = User::query()->where("isboss", true);
            if ($users->count() === 0) {
                return [];
            }
            $rows = [];
            User::query()
                ->lazyById(2000, 'id')
                ->each(function ($user) use (&$rows) {
                    $rows[] = $user->toArray();
                });
            return $rows;
        } elseif ($table === "accident") {
            $accidents = Accident::query();
            if ($accidents->count() === 0) {
                return [];
            }
            $rows = [];
            $accidents
                ->lazyById(2000, 'id')
                ->each(function ($accident) use (&$rows) {
                    $rows[] = $accident->toArray();
                });
            return $rows;
        } elseif ($table === "maintenance") {
            $maintenances = Maintenance::query();
            if ($maintenances->count() === 0) {
                return [];
            }
            $rows = [];
            $maintenances
                ->lazyById(2000, 'id')
                ->each(function ($maintenance) use (&$rows) {
                    $rows[] = $maintenance->toArray();
                });
            return $rows;
        } elseif ($table === "fuel") {
            $fuels = Fuel::query();
            if ($fuels->count() === 0) {
                return [];
            }
            $rows = [];
            $fuels
                ->lazyById(2000, 'id')
                ->each(function ($fuel) use (&$rows) {
                    $rows[] = $fuel->toArray();
                });
            return $rows;
        } elseif ($table === "inspection") {
            $inspections = Inspection::query();
            if ($inspections->count() === 0) {
                return [];
            }
            $rows = [];
            $inspections
                ->lazyById(2000, 'id')
                ->each(function ($inspection) use (&$rows) {
                    $rows[] = $inspection->toArray();
                });
            return $rows;
        } elseif ($table === "carAssignment") {
            $carAssignments = CarAssignment::query();
            if ($carAssignments->count() === 0) {
                return [];
            }
            $rows = [];
            $carAssignments
                ->lazyById(2000, 'id')
                ->each(function ($carAssignment) use (&$rows) {
                    $rows[] = $carAssignment->toArray();
                });
            return $rows;
        } else {
            return $this->Index();
        }
    }
    public function generateCsvByChunks()
    {


        $cars = Car::query();
        if ($cars->count() === 0) {
            return null;
        }
        $chunks_per_loop = 3000;
        $car_count = (clone $cars)->count();
        $chunks = (int) ceil(($car_count / $chunks_per_loop));

        for ($i = 0; $i < $chunks; $i++) {
            $clonedCar = (clone $cars)->skip($i * $chunks_per_loop)
                ->take($chunks_per_loop)
                ->cursor();

            foreach ($clonedCar as $car) {
                yield $car;
            }
        }
    }

    public function exportUserTable(Request $request)
    {
        $validatedTable = $request->validate([
            'fileToExport' => "required|in:user"
        ]);

        $table = $validatedTable['fileToExport'];
        $rows = $this->generateCsvByID($table);
        if (empty($rows)) {
            return Inertia::render("Data/Export");
        }

        $file = storage_path('app/public/exports/users.csv');

        // Export the file
        (new FastExcel($rows))->export($file);
        return response()->download($file);
    }

    public function exportCarsTable(Request $request)
    {
        $request->validate([
            'fileToExport' => "required|in:car"
        ]);
        $file = storage_path('app/public/exports/cars.csv');
        $generator = $this->generateCsvByChunks();
        (new FastExcel($generator))->export($file);
        $publicUrl = asset("storage/exports/cars.csv");
        return Inertia::location($publicUrl);
    }



    public function exportAccidentsTable(Request $request)
    {
        $validatedTable = $request->validate([
            'fileToExport' => "required|in:accident"
        ]);
        $table = $validatedTable['fileToExport'];
        $rows = $this->generateCsvByID($table);
        if (empty($rows)) {
            return Inertia::render("Data/Export");
        }
        $file = storage_path('app/public/exports/accidents.csv');
        (new FastExcel($rows))->export($file);
        $publicUrl = asset("storage/exports/accidents.csv");
        return Inertia::location($publicUrl);
    }
    public function exportFuelsTable(Request $request)
    {
        $validatedTable = $request->validate([
            'fileToExport' => "required|in:fuel"
        ]);
        $table = $validatedTable['fileToExport'];
        $rows = $this->generateCsvByID($table);
        if (empty($rows)) {
            return Inertia::render("Data/Export");
        }
        $file = storage_path('app/public/exports/fuels.csv');
        (new FastExcel($rows))->export($file);
        $publicUrl = asset("storage/exports/fuels.csv");
        return Inertia::location($publicUrl);
    }
    public function exportMaintenanceTable(Request $request)
    {
        $validatedTable = $request->validate([
            'fileToExport' => "required|in:maintenance"
        ]);
        $table = $validatedTable['fileToExport'];
        $rows = $this->generateCsvByID($table);
        if (empty($rows)) {
            return Inertia::render("Data/Export");
        }
        $file = storage_path('app/public/exports/maintenance.csv');
        (new FastExcel($rows))->export($file);
        $publicUrl = asset("storage/exports/maintenance.csv");
        return Inertia::location($publicUrl);
    }
    public function exportInspectionTable(Request $request)
    {
        $validatedTable = $request->validate([
            'fileToExport' => "required|in:inspection"
        ]);
        $table = $validatedTable['fileToExport'];
        $rows = $this->generateCsvByID($table);
        if (empty($rows)) {
            return Inertia::render("Data/Export");
        }
        $file = storage_path('app/public/exports/inspection.csv');
        (new FastExcel($rows))->export($file);
        $publicUrl = asset("storage/exports/inspection.csv");
        return Inertia::location($publicUrl);
    }
    public function exportCarAssignmentTable(Request $request)
    {
        $validatedTable = $request->validate([
            'fileToExport' => "required|in:carAssignment"
        ]);
        $table = $validatedTable['fileToExport'];
        $rows = $this->generateCsvByID($table);
        if (empty($rows)) {
            return Inertia::render("Data/Export");
        }
        $file = storage_path('app/public/exports/carAssignment.csv');
        (new FastExcel($rows))->export($file);
        $publicUrl = asset("storage/exports/carAssignment.csv");
        return Inertia::location($publicUrl);
    }
}
