<?php

use App\Http\Controllers\ServicesControllers\CarAssignmentsController;
use App\Http\Controllers\ServicesControllers\MaintenanceController;
use App\Http\Controllers\ServicesControllers\InspectionController;
use App\Http\Controllers\ServicesControllers\AccidentController;
use App\Http\Controllers\ServicesControllers\ActionsController;
use App\Http\Controllers\ServicesControllers\FuelController;
use App\Http\Controllers\ServicesControllers\CarsController;
use App\Http\Controllers\DataControllers\ImportController;
use App\Http\Controllers\DataControllers\ExportController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ? testing Routes
Route::get('send-mail', [MailController::class, 'index']);
// ? ----------------------

Route::prefix("/admin")->middleware(['auth', 'verified', 'TypeAuth'])->group(function () {
    Route::prefix('/export')->group(function () {
        Route::get('/', [ExportController::class, 'index']);
        Route::post('/car', [ExportController::class, 'exportCarsTable']);
        Route::post('/accident', [ExportController::class, 'exportAccidentsTable']);
        Route::post('/user', [ExportController::class, 'exportUsersTable']);
        Route::post('/fuel', [ExportController::class, 'exportFuelsTable']);
        Route::post('/maintenance', [ExportController::class, 'exportMaintenanceTable']);
        Route::post('/inspection', [ExportController::class, 'exportInspectionTable']);
        Route::post('/carAssignment', [ExportController::class, 'exportCarAssignmentTable']);
    });
    Route::prefix('/import')->group(function () {
        Route::get('/', [ImportController::class, 'index']);
        Route::post('/car', [ImportController::class, 'importCarsTable']);
        Route::post('/accident', [ImportController::class, 'importAccidentsTable']);
        Route::post('/user', [ImportController::class, 'importUsersTable']);
        Route::post('/fuel', [ImportController::class, 'importFuelsTable']);
        Route::post('/maintenance', [ImportController::class, 'importMaintenanceTable']);
        Route::post('/inspection', [ImportController::class, 'importInspectionTable']);
        Route::post('/carAssignment', [ExportController::class, 'importCarAssignmentTable']);
    });
    Route::prefix('/accidents')->group(function () {
        Route::get('/', [AccidentController::class, 'index']);
    });
    Route::prefix('/cars')->group(function () {
        Route::get('/', [CarsController::class, 'index']);
    });

    // Route::prefix('/users')->group(function () {

    //     Route::get('/', [::class, 'index']);
    // });

    Route::prefix('/carAssignment')->group(function () {
        Route::get('/', [CarAssignmentsController::class, 'index']);
    });
    Route::prefix('/fuels')->group(function () {
        Route::get('/', [FuelController::class, 'index']);
    });
    Route::prefix('/maintenances')->group(function () {
        Route::get('/', [MaintenanceController::class, 'index']);
    });
    Route::prefix('/inspections')->group(function () {
        Route::get('/', [InspectionController::class, 'index']);
    });
    Route::prefix('/actions')->group(function () {
        Route::get('/', [ActionsController::class, 'index']);
    });


    Route::get('/dashboardAd', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard.admin');
});


Route::prefix('/employee')->middleware(["auth", "verified", "TypeAuth"])->group(function () {
    Route::get('/dashboardEm', function () {
        return Inertia::render('Employee/Dashboard');
    })->name('dashboard.employee');

    Route::prefix('/carAssignmentsEmployee')->group(function () {
        Route::get('/', [CarAssignmentsController::class, 'index']);
    });
    Route::prefix('/accidentsEmployee')->group(function () {
        Route::get('/', [AccidentController::class, 'index']);
    });

    Route::prefix('/fuelsEmployee')->group(function () {
        Route::get('/', [FuelController::class, 'index']);
    });
    Route::prefix('/maintenancesEmployee')->group(function () {
        Route::get('/', [MaintenanceController::class, 'index']);
    });
});

Route::inertia('/About', 'About');


Route::middleware(['TypeAuth'])->group(function () {
    Route::get('/', function () {
        return "";
    });

    Route::get('/employee', function () {
        return "";
    });

    Route::get('/admin', function () {
        return "";
    });
});


Route::get('/Goback', function () {
    return redirect()->back();
})->middleware(["TypeAuth", "auth"])->name("GoBack.route");




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
