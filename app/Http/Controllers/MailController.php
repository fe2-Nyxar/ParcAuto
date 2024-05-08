<?php

namespace App\Http\Controllers;

use App\Jobs\MailJob;
use Illuminate\Http\Request;
use App\Mail\InspectionMail;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function index()

    {
        dispatch(new MailJob());
        dd('email is sended');
    }
    // public function index()

    // {
    //     $mailData = [
    //         'title' => 'ParcAuto',
    //         'body' => "This email is here to enform you that there's 7 days left before the Inspection deadline for these these cars :  "

    //     ];
    //     Mail::to(auth()->user()->email)->send(new InspectionMail($mailData));
    //     return redirect()->back()->with('mailStatus', 'mail is sent');
    // }
}
