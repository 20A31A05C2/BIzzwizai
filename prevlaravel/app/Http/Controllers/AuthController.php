<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Support\Facades\DB;
use App\Models\FormData;

class AuthController extends Controller
{
    /**
     * Register a new admin
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:admin,user',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'fullname' => $request->fullname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        $user->notify(new \App\Notifications\CustomVerifyEmail());
        
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ]
        ], 201);
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $credentials = $request->only('email', 'password');

        try {
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                Log::warning('Login attempt with non-existent email', ['email' => $request->email]);
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid login credentials'
                ], 401);
            }
            if (is_null($user->email_verified_at)) {
            Log::warning('Login attempt with unverified email', ['email' => $user->email]);
            return response()->json([
                'success' => false,
                'message' => 'Please verify your email before logging in'
            ], 403);
        }

            if (!$token = JWTAuth::attempt($credentials)) {
            Log::warning('Invalid password for login', ['email' => $request->email]);
            return response()->json([
                'success' => false,
                'message' => 'Invalid login credentials'
            ], 401);
        }

        // Refresh user to ensure latest data
        $user = Auth::user();

        Log::info('Login successful', ['user_id' => $user->id, 'email' => $user->email]);

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ]
        ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create token'
            ], 500);
        }

        $user = Auth::user();

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ]
        ], 200);
    }

    /**
     * Logout user
     */
  public function logout(Request $request)
{
    try {
        $token = $request->bearerToken(); // this extracts the "Bearer xxx" token

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Token not provided'
            ], 400);
        }

        JWTAuth::setToken($token)->invalidate();

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ], 200);

    } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to logout, please try again'
        ], 500);
    }
}


    /**
     * Get authenticated user
     */
    public function user(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => Auth::user()
        ], 200);
    }
    // public function verifyEmail(Request $request, $id, $hash)
    // {
    //     $user = User::findOrFail($id);

    //     // Log the incoming request for debugging
    //     Log::info('Verification attempt', [
    //         'user_id' => $id,
    //         'email' => $user->email,
    //         'provided_hash' => $hash,
    //         'expected_hash' => sha1($user->getEmailForVerification()),
    //     ]);

    //     if (!hash_equals($hash, sha1($user->getEmailForVerification()))) {
    //     Log::warning('Invalid verification hash', ['user_id' => $id]);
    //     return response()->json([
    //         'success' => false,
    //         'message' => 'Invalid verification link'
    //     ], 400);
    // }

    //     if ($user->hasVerifiedEmail()) {
    //         Log::info('Email already verified', ['user_id' => $id]);
    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Email already verified'
    //         ], 200);
    //     }

    //     // Update email_verified_at within a transaction
    // try {
    //     \DB::beginTransaction();
    //     $user->email_verified_at = now();
    //     if (!$user->save()) {
    //         throw new \Exception('Failed to save user verification status');
    //     }
    //     \DB::commit();
    //     Log::info('User email verified', ['user_id' => $id, 'email' => $user->email]);
    // } catch (\Exception $e) {
    //     \DB::rollBack();
    //     Log::error('Failed to verify email', ['user_id' => $id, 'error' => $e->getMessage()]);
    //     return response()->json([
    //         'success' => false,
    //         'message' => 'Failed to verify email. Please try again.'
    //     ], 500);
    // }
    //     // Notify admin
    //     $admin = User::where('role', 'admin')->first();
    //     if ($admin) {
    //         $admin->notify(new \App\Notifications\UserVerifiedNotification($user));
    //         Log::info('Admin notified of user verification', ['user_id' => $user->id, 'admin_email' => $admin->email]);
    //     }

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Email verified successfully'
    //     ], 200);
    // }



    public function verifyEmail(Request $request, $id, $hash)
{
    $user = User::findOrFail($id);
    
    // Log the incoming request for debugging
    Log::info('Verification attempt', [
        'user_id' => $id,
        'email' => $user->email,
        'provided_hash' => $hash,
        'expected_hash' => sha1($user->getEmailForVerification()),
    ]);

    if (!hash_equals($hash, sha1($user->getEmailForVerification()))) {
        Log::warning('Invalid verification hash', ['user_id' => $id]);
        return redirect(env('FRONTEND_URL') . '/email-verification?status=invalid');
    }

    if ($user->hasVerifiedEmail()) {
        Log::info('Email already verified', ['user_id' => $id]);
        return redirect(env('FRONTEND_URL') . '/email-verification?status=already-verified');
    }

    // Update email_verified_at within a transaction
    try {
        \DB::beginTransaction();
        $user->email_verified_at = now();
        if (!$user->save()) {
            throw new \Exception('Failed to save user verification status');
        }
        \DB::commit();
        Log::info('User email verified', ['user_id' => $id, 'email' => $user->email]);
    } catch (\Exception $e) {
        \DB::rollBack();
        Log::error('Failed to verify email', ['user_id' => $id, 'error' => $e->getMessage()]);
        return redirect(env('FRONTEND_URL') . '/email-verification?status=error');
    }

    // Notify admin
    $admin = User::where('role', 'admin')->first();
    if ($admin) {
        $admin->notify(new \App\Notifications\UserVerifiedNotification($user));
        Log::info('Admin notified of user verification', ['user_id' => $user->id, 'admin_email' => $admin->email]);
    }

    return redirect(env('FRONTEND_URL') . '/email-verification?status=success');
}


    /**
     * Resend verification email
     */
    public function resendVerificationEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'success' => false,
                'message' => 'Email already verified'
            ], 400);
        }

        $user->notify(new \App\Notifications\CustomVerifyEmail());

        return response()->json([
            'success' => true,
            'message' => 'Verification email resent successfully'
        ], 200);
    }
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $status = Password::broker()->sendResetLink(
        $request->only('email'),
        function ($user, $token) {
            $user->notify(new ResetPasswordNotification($token));
        }
    );

        if ($status === Password::RESET_LINK_SENT) {
            Log::info('Password reset link sent', ['email' => $request->email]);
            return response()->json([
                'success' => true,
                'message' => 'A password reset link has been sent to your email address.'
            ], 200);
        }

        Log::warning('Failed to send password reset link', ['email' => $request->email, 'status' => $status]);
        return response()->json([
            'success' => false,
            'message' => __($status)
        ], 400);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
                Log::info('Password reset successful', ['user_id' => $user->id, 'email' => $user->email]);
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            $token = JWTAuth::fromUser(User::where('email', $request->email)->first());
            return response()->json([
                'success' => true,
                'message' => 'Password reset successfully.',
                'data' => [
                    'token' => $token,
                    'token_type' => 'Bearer',
                ]
            ], 200);
        }

        Log::warning('Password reset failed', ['email' => $request->email, 'status' => $status]);
        return response()->json([
            'success' => false,
            'message' => __($status)
        ], 400);
    }

    public function showResetPasswordForm($token)
    {
        return response()->json([
            'success' => true,
            'message' => 'Reset password form',
            'data' => ['token' => $token]
        ], 200);
    }




}