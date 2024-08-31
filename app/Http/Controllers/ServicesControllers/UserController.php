<?php

namespace App\Http\Controllers\ServicesControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if (auth()->user()->isboss) {
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

            $usersData = User::paginate($paginationNumber);
            return Inertia::render("Admin/Tables/Users/UsersPage", ["usersData"=> $usersData]);
        }
    }
}
