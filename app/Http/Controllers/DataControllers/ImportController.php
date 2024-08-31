<?php

namespace App\Http\Controllers\DataControllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImportTableRequest;
use Inertia\Inertia;
use Spatie\SimpleExcel\SimpleExcelReader;
use App\Jobs\importJob;
use Illuminate\Support\Facades\Storage;

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

        $tableName = "cars";
        $file = $request->file('fileToImport');
        $storedFilePath = $file->storeAs('queues/imports', "$tableName.csv", 'public');
        if ($request['tableToImport'] === 'car') {
            importJob::dispatch($storedFilePath, $tableName);
        }
        return redirect()->back();
    }
    public function importUsersTable(ImportTableRequest $request)
    {
        if (!Auth()->user()->hasVerifiedEmail()) return redirect()->back();
        $request->validated();
        $tableName = "users";
        $file = $request->file('fileToImport');
        $storedFilePath = $file->storeAs('queues/imports', "$tableName.csv", 'public');
        if ($request['tableToImport'] === 'user') {
            importJob::dispatch($storedFilePath, $tableName);
        }
        return redirect()->back();
    }
    public function importAccidentsTable(ImportTableRequest $request)
    {
        if (!Auth()->user()->hasVerifiedEmail()) return redirect()->back();

        $request->validated();

        $tableName = "accidents";
        $file = $request->file('fileToImport');
        $storedFilePath = $file->storeAs('queues/imports', "$tableName.csv", 'public');
        if ($request['tableToImport'] === 'accident') {
            importJob::dispatch($storedFilePath, $tableName);
        }
        return redirect()->back();
    }
    public function importFuelsTable(ImportTableRequest $request)
    {
        if (!Auth()->user()->hasVerifiedEmail()) return redirect()->back();

        $request->validated();

        $tableName = "fuels";
        $file = $request->file('fileToImport');
        $storedFilePath = $file->storeAs('queues/imports', "$tableName.csv", 'public');
        if ($request['tableToImport'] === 'fuel') {
            importJob::dispatch($storedFilePath, $tableName);
        }
        return redirect()->back();
    }
    public function importMaintenanceTable(ImportTableRequest $request)
    {
        if (!Auth()->user()->hasVerifiedEmail()) return redirect()->back();

        $request->validated();

        $tableName = "maintenances";
        $file = $request->file('fileToImport');
        $storedFilePath = $file->storeAs('queues/imports', "$tableName.csv", 'public');
        if ($request['tableToImport'] === 'maintenance') {
            importJob::dispatch($storedFilePath, $tableName);
        }
        return redirect()->back();
    }
    public function importInspectionTable(ImportTableRequest $request)
    {
        if (!Auth()->user()->hasVerifiedEmail()) return redirect()->back();
        $request->validated();

        $tableName = "inspections";
        $file = $request->file('fileToImport');
        $storedFilePath = $file->storeAs('queues/imports', "$tableName.csv", 'public');
        if ($request['tableToImport'] === 'inspection') {
            importJob::dispatch($storedFilePath, $tableName);
        }
        return redirect()->back();
    }
    public function importCarAssignmentTable(ImportTableRequest $request)
    {
        if (!Auth()->user()->hasVerifiedEmail()) return redirect()->back();

        $request->validated();
        $tableName = "assignments";
        $file = $request->file('fileToImport');
        $storedFilePath = $file->storeAs('queues/imports', "$tableName.csv", 'public');
        if ($request['tableToImport'] === 'carAssignment') {
            importJob::dispatch($storedFilePath, $tableName);
        }
        return redirect()->back();
    }
}
