<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class IsUser
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if ($user && $user->role === 'user') {
                return $next($request);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Unauthorized: Users only'], 403);
        }

        return response()->json(['message' => 'Unauthorized: Users only'], 403);
    }
}
