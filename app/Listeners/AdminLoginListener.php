<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use App\Models\UserDevice;
use Illuminate\Support\Facades\Request;
use Jenssegers\Agent\Agent;

class AdminLoginListener
{
    public function handle(Login $event)
    {        
        $user = $event->user;
        $agent = new Agent();
        $agent->setUserAgent(Request::header('User-Agent'));

        UserDevice::where('user_id', $user->id)->update(['is_current' => false]);
        
        $device = UserDevice::firstOrNew([
            'user_id' => $user->id,
            'ip_address' => Request::ip(),
            'user_agent' => Request::header('User-Agent'),
        ]);

        $deviceName = $agent->device();
        if (! $deviceName) {
            $deviceName = $agent->platform() . ' (' . $agent->browser() . ')';
        }
        $device->device_name = $deviceName ?: 'Unknown Device';
        $device->browser = $agent->browser();
        $device->platform = $agent->platform();
        $device->is_current = true;
        $device->last_used_at = now();
        $device->save();
    }
}
