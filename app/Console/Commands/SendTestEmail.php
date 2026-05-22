<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendTestEmail extends Command
{
    protected $signature = 'mail:test {to? : Recipient email address}';

    protected $description = 'Send a test email to verify mail configuration';

    public function handle(): void
    {
        $to = $this->argument('to') ?? config('mail.from.address');

        $this->info("Sending test email to: {$to}");

        Mail::raw('This is a test email from Kamalan. Mail configuration is working correctly.', function ($message) use ($to) {
            $message->to($to)->subject('Kamalan - Test Email');
        });

        $this->info('Test email sent successfully.');
    }
}
