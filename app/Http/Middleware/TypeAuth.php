<?php

namespace App\Http\Middleware;

use Closure;
use GuzzleHttp\Psr7\Uri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;


class TypeAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if ($request->is('storage/*')) {
            return redirect("/login");
        }

        if ($user !== null) {
            $userType = $user->isboss;
            if ($userType === 1) {
                if ($request->is('/') || $request->is('admin')) {
                    return redirect("admin/dashboardAd");
                } else if ($request->is('admin/*') || $request->is('/profile') || $request->is('/createuser'))
                    return $next($request);
            } elseif ($userType === 0) {
                if ($request->is('/') || $request->is('employee')) {
                    return redirect("employee/dashboardEm");
                } elseif ($request->is('employee/*') || $request->is('/profile'))
                    return $next($request);
            }
        }

        return redirect("/login");
    }
}
