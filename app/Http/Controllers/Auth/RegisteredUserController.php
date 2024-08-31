<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;


class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create()
    {
        if (Auth::user() !== null) {
            if (Auth::user()->isboss === 1) return Inertia::render("Auth/CreateUser");
        } else {
            return Inertia::render("Auth/CreateUser");
        }

        return redirect()->back();
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {

        // if (Auth::user() === null) {
        //     return redirect(route('login', absolute: false));
        // } else if (Auth::user()->isboss !== 1) {
        //     return redirect(route('dashboard.employee', absolute: false));
        // }

        $request->validate([
            'oneeid' => 'required|unique:users,onee_id|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|unique:users,email|string|email|max:255|unique:' . User::class,
            'role' => 'required|boolean',
            'direction' => 'required|string|max:100',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'onee_id' => $request->oneeid,
            'name' => $request->name,
            'email' => $request->email,
            'isboss' => $request->role,
            'direction' => $request->direction,
            'password' => Hash::make($request->password),
        ]);
        event(new Registered($user));
        Inertia::render("Auth/CreateUser");
    }
}
