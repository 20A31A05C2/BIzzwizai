<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\UserVerified;
use App\Notifications\AdminUserVerified;
use App\Models\User;
use App\Notifications\UserVerifiedNotification; // Update to use UserVerifiedNotification

class SendAdminVerificationNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserVerified $event)
    {
        $admin = User::where('role', 'admin')->first();
        if ($admin) {
            try {
                $admin->notify(new UserVerifiedNotification($event->user));
                Log::info('Admin notified via event listener', ['user_id' => $event->user->id, 'admin_email' => $admin->email]);
            } catch (\Exception $e) {
                Log::error('Failed to notify admin via event listener', ['error' => $e->getMessage()]);
            }
        }
    }
}