<?php

namespace App\Jobs;

use App\Mail\InspectionMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class MailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        $mailData = [
            'title' => 'ParcAuto',
            'body' => "This email is here to enform you that there's 7 days left before the Inspection deadline for these these cars :"
        ];
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to(auth()->user()->email)->send(new InspectionMail("e"));
    }
}
