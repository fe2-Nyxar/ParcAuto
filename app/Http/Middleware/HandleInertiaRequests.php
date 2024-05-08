<?php

namespace App\Http\Middleware;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if (Auth::user() !== null) {
            if (auth()->user()->isboss === 1) {
                $dashboard = "dashboard.admin";
                $createuser = "createuser";
            } else {
                $dashboard = "dashboard.employee";
                $createuser = "createuser";
            }
        } else {
            $dashboard = "";
            $createuser = "";
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'SharedRoutes' => [
                "dashboard" => $dashboard,
                "createuser" => $createuser,
            ]

        ];
    }
}
