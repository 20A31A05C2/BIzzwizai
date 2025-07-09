<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if ($user && $user->role === 'admin') {
                return $next($request);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Unauthorized: Admins only'], 403);
        }

        return response()->json(['message' => 'Unauthorized: Admins only'], 403);
    }
}

