<?php

namespace App\Http\Controllers;

use App\Models\FormData;
use Illuminate\Http\Request;
use App\Http\Resources\FormDataResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class FormDataController extends Controller
{
    public function index(Request $request)
    {
        $formData = FormData::with('user')->get();

        return response()->json([
            'data' => FormDataResource::collection($formData),
        ], 200);
    }

    public function show($id)
    {
        $formData = FormData::with('user')->findOrFail($id);

        return response()->json([
            'data' => new FormDataResource($formData),
        ], 200);
    }

    public function updateStatus(Request $request, $id)
    {
        $formData = FormData::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:accepted,rejected,pending,active,completed,onhold',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $formData->status = $request->input('status');
        $formData->save();

        return response()->json([
            'data' => new FormDataResource($formData),
            'message' => 'Status updated successfully',
        ], 200);
    }



    public function UserProjects($userId)
    {
        Log::info('UserProjects method called', ['userId' => $userId]); // Debug log
        try {
            $user = Auth::user();
            if (!$user || $user->id !== (int)$userId) {
                Log::warning('Unauthorized access to user projects', ['user_id' => $userId]);
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access'
                ], 403);
            }

            $projects = FormData::where('user_id', $userId)->get(['id', 'project_description', 'solution_type']);

            return response()->json([
                'success' => true,
                'data' => $projects
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching user projects', ['user_id' => $userId, 'error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch projects'
            ], 500);
        }
    }

    // public function getProject($formDataId)
    // {
    //     try {
    //         $user = Auth::user();
    //         $project = FormData::where('id', $formDataId)->where('user_id', $user->id)->first(['id', 'project_description', 'solution_type']);

    //         if (!$project) {
    //             Log::warning('Project not found or unauthorized', ['form_data_id' => $formDataId, 'user_id' => $user->id]);
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Project not found or unauthorized'
    //             ], 404);
    //         }

    //         return response()->json([
    //             'success' => true,
    //             'data' => $project
    //         ], 200);
    //     } catch (\Exception $e) {
    //         Log::error('Error fetching project', ['form_data_id' => $formDataId, 'error' => $e->getMessage()]);
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Failed to fetch project'
    //         ], 500);
    //     }
    // }

//     // For admins
// // Controller Method for Admin
// public function showForAdmin($id)
// {
//     $formData = FormData::with('user')->findOrFail($id);

//     return response()->json([
//         'data' => new FormDataResource($formData),
//     ], 200);
// }

// // Controller Method for User (with access control)
// public function showForUser($id)
// {
//     $formData = FormData::with('user')->findOrFail($id);

//     if ($formData->user_id !== auth()->id()) {
//         return response()->json(['message' => 'Unauthorized: Users only'], 403);
//     }

//     return response()->json([
//         'data' => new FormDataResource($formData),
//     ], 200);
// }

public function getUserProjectById($id)
{
    try {
        $user = auth()->user();

        // Ensure the project belongs to the authenticated user
        $project = FormData::where('id', $id)
                           ->where('user_id', $user->id)
                           ->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Aucun projet trouvé pour cet utilisateur.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $project
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur serveur: ' . $e->getMessage()
        ], 500);
    }
}
}