<?php

use App\Http\Controllers\ServicesControllers\InspectionController;
use App\Http\Controllers\ServicesControllers\MaintenanceController;
use App\Http\Controllers\ServicesControllers\FuelController;
use App\Http\Controllers\ServicesControllers\AccidentController;
use App\Http\Controllers\ServicesControllers\CarsController;
use App\Http\Controllers\DataControllers\ImportController;
use App\Http\Controllers\DataControllers\ExportController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::prefix('/export')->middleware(['auth', 'verified'])->group(function () {

    Route::get('/', [ExportController::class, 'index']);
    Route::post('/car', [ExportController::class, 'exportCarsTable']);
    Route::post('/accident', [ExportController::class, 'exportAccidentsTable']);
    Route::post('/user', [ExportController::class, 'exportUserTable']);
    Route::post('/fuel', [ExportController::class, 'exportFuelsTable']);
    Route::post('/maintenance', [ExportController::class, 'exportMaintenanceTable']);
    Route::post('/inspection', [ExportController::class, 'exportInspectionTable']);
    Route::post('/carAssignment', [ExportController::class, 'exportCarAssignmentTable']);
});
Route::prefix('/import')->middleware(['auth', 'verified'])->group(function () {

    Route::get('/', [ImportController::class, 'index']);
    Route::post('/car', [ImportController::class, 'importCarsTable']);
    Route::post('/accident', [ImportController::class, 'importAccidentsTable']);
    Route::post('/user', [ImportController::class, 'importUserTable']);
    Route::post('/fuel', [ImportController::class, 'importFuelsTable']);
    Route::post('/maintenance', [ImportController::class, 'importMaintenanceTable']);
    Route::post('/inspection', [ImportController::class, 'importInspectionTable']);
    Route::post('/carAssignment', [ExportController::class, 'importCarAssignmentTable']);
});

Route::get('/accident', [AccidentController::class, 'index']);
Route::get('cars', [CarsController::class, 'index']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
