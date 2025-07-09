<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Appointment;
use App\Models\FormData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    public function index()
    {
        $users = User::all(['id', 'fullname', 'email', 'role', 'created_at']);
        return response()->json(['success' => true, 'data' => $users], 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $currentUser = Auth::user();
        if ($currentUser && $currentUser->id == $id) {
            return response()->json(['success' => false, 'message' => 'Cannot edit your own account.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email,' . $id . ',id',
            'role' => 'required|in:admin,user',
            'full_name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $user->email = $request->email;
        $user->role = $request->role;
        $user->fullname = $request->full_name;
        $user->save();

        return response()->json(['success' => true, 'message' => 'Utilisateur mis à jour avec succès.', 'data' => $user], 200);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if ($user->role === 'admin') {
            return response()->json(['success' => false, 'message' => 'Cannot delete admin account'], 403);
        }

        $user->delete();
        return response()->json(['success' => true, 'message' => 'Utilisateur supprimé avec succès.'], 200);
    }

    public function stats()
    {
        $totalUsers = User::count();
        $recentUsers = User::latest()->take(5)->get(['id', 'email', 'created_at', 'email_verified_at']);

        $totalProjects = FormData::count();
        $activeProjects = FormData::count();
        $pendingProjects = FormData::count();
        $recentProjects = FormData::latest()->take(5)->get(['id', 'project_description', 'created_at']);

        return response()->json([
            'totalUsers' => $totalUsers,
            'totalProjects' => $totalProjects,
            'activeProjects' => $activeProjects,
            'pendingProjects' => $pendingProjects,
            'recentUsers' => $recentUsers,
            'recentProjects' => $recentProjects,
        ]);
    }

    public function getAppointments()
    {
        $appointments = Appointment::with('user')->get();
        return response()->json([
            'success' => true,
            'data' => $appointments,
        ], 200);
    }

    
}