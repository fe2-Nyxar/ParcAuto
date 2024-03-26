<?php

namespace App\Http\Controllers\DataControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use spatie\SimpleExcel\SimpleExcelWriter;
use App\Models\Accidents;
use App\Models\CarAssignments;
use App\Models\Cars;
use App\Models\User;
use App\Models\Fuels;
use App\Models\Inspections;
use App\Models\Maintenance;
use Illuminate\Support\Facades\Storage;
use Rap2hpoutre\FastExcel\FastExcel;
use Illuminate\Support\Facades\Response;

class ExportController extends Controller
{
    public function Index()
    {
        return Inertia::render("Data/Export");
    }
    public function exportCarsTable()
    {
    }
    // public function exportUserTable()
    // {
    //     $handle = fopen(public_path('export.csv'), 'w');

    //     User::where('isboss', true)->lazyById(2000, 'id')
    //         ->each(function ($user) use ($handle) {
    //             fputcsv($handle, $user->toArray());
    //         });

    //     fclose($handle);
    //     return Storage::download('/public/export.csv');
    // }

    protected function usersGenerator()
    {
        $users = User::query()
            ->where("isboss", true);
        if ($users->count() === 0) {
            return;
        }
        $chunks_per_loop = 3000;
        $user_count = (clone $users)->count();
        $chunks = (int) ceil(($user_count / $chunks_per_loop));

        for ($i = 0; $i < $chunks; $i++) {
            $clonedUser = (clone $users)->skip($i * $chunks_per_loop)
                ->take($chunks_per_loop)
                ->cursor();

            foreach ($clonedUser as $user) {
                yield $user;
            }
        }
    }

    public function exportUserTable()
    {
        $filename = 'storage/export.csv';
        $path = Storage::path('public/exports');
        (new FastExcel($this->usersGenerator()))->export($path . "export.csv");
        return Response::download($path);
    }

    public function exportAccidentsTable()
    {
    }
    public function exportFuelsTable()
    {
    }
    public function exportMaintenanceTable()
    {
    }
    public function exportInspectionTable()
    {
    }
}
