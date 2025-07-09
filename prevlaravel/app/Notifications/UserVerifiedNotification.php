<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class UserVerifiedNotification extends Notification
{
    // Removed: use Queueable;
    // Removed: implements ShouldQueue;

    protected $user;

    public function __construct($user)
    {
        $this->user = $user;
        Log::info('UserVerifiedNotification constructed', ['user_email' => $user->email]);
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        Log::info('Sending UserVerifiedNotification email', ['user_email' => $this->user->email, 'to' => $notifiable->email]);
        return (new MailMessage)
            ->subject('New User Email Verified - BizzWiz')
            ->view('emails.admin-verified', [
                'user' => $this->user,
            ]);
    }

    public function toArray($notifiable): array
    {
        return [
            'message' => "User {$this->user->fullname} ({$this->user->email}) has verified their email.",
            'type' => 'user_verified',
        ];
    }
}