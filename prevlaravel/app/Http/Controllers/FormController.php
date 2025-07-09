<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\FormData;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Resources\FormDataResource;



class FormController extends Controller
{
    public function submitForm(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userName' => 'required|string|max:255',
            'userEmail' => 'required|string|email|max:255|unique:users,email',
            'userPassword' => 'required|string|min:8',
            'userRole' => 'required|in:admin,user',
            'userCompany' => 'nullable|string|max:255',
            'userMotivation' => 'nullable|string',
            'userInspiration' => 'nullable|string',
            'userConcerns' => 'nullable|string',
            'projectDescription' => 'nullable|string',
            'solutionType' => 'nullable|string|max:255',
            'audience' => 'nullable|string|max:255',
            'features' => 'nullable|array',
            'visualStyle' => 'nullable|string|max:255',
            'timing' => 'nullable|string|max:255',
            'budget' => 'nullable|string|max:255',
            'missionPart1' => 'nullable|string',
            'missionPart2' => 'nullable|string',
            'missionPart3' => 'nullable|string',
        ], [
            'userName.required' => 'Full name is required',
            'userEmail.required' => 'Email is required',
            'userEmail.email' => 'Please provide a valid email address',
            'userEmail.unique' => 'This email is already registered',
            'userPassword.required' => 'Password is required',
            'userPassword.min' => 'Password must be at least 8 characters',
            'userRole.required' => 'User role is required',
            'userRole.in' => 'User role must be either admin or user',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();

        try {
            $user = User::create([
                'fullname' => $request->userName,
                'email' => $request->userEmail,
                'password' => Hash::make($request->userPassword),
                'role' => $request->userRole,
            ]);

            $user->notify(new \App\Notifications\CustomVerifyEmail());
            
            $formData = FormData::create([
                'user_id' => $user->id,
                'user_company' => $request->userCompany,
                'user_motivation' => $request->userMotivation,
                'user_inspiration' => $request->userInspiration,
                'user_concerns' => $request->userConcerns,
                'project_description' => $request->projectDescription,
                'solution_type' => $request->solutionType,
                'audience' => $request->audience,
                'features' => $request->features,
                'visual_style' => $request->visualStyle,
                'timing' => $request->timing,
                'budget' => $request->budget,
                'mission_part1' => $request->missionPart1,
                'mission_part2' => $request->missionPart2,
                'mission_part3' => $request->missionPart3,
            ]);

            $token = JWTAuth::fromUser($user);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Form submitted and user registered successfully',
                'data' => [
                    'user' => $user,
                    'form_data' => $formData,
                    'token' => $token,
                    'token_type' => 'Bearer',
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your request',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function createProject(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if ($user->role !== 'user') {
            return response()->json([
                'success' => false,
                'message' => 'Only admins can create projects'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'projectDescription' => 'required|string',
            'solutionType' => 'required|string|max:255',
            'audience' => 'required|string|max:255',
            'features' => 'required|array',
            'visualStyle' => 'required|string|max:255',
            'timing' => 'required|string|max:255',
            'budget' => 'required|string|max:255',
            'missionPart1' => 'required|string',
            'missionPart2' => 'required|string',
            'missionPart3' => 'required|string',
        ], [
            'projectDescription.required' => 'Project description is required',
            'solutionType.required' => 'Solution type is required',
            'audience.required' => 'Audience is required',
            'features.required' => 'Features are required',
            'visualStyle.required' => 'Visual style is required',
            'timing.required' => 'Timing is required',
            'budget.required' => 'Budget is required',
            'missionPart1.required' => 'Mission part 1 is required',
            'missionPart2.required' => 'Mission part 2 is required',
            'missionPart3.required' => 'Mission part 3 is required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();

        try {
            $formData = FormData::create([
                'user_id' => $user->id,
                'user_company' => null,
                'user_motivation' => null,
                'user_inspiration' => null,
                'user_concerns' => null,
                'project_description' => $request->projectDescription,
                'solution_type' => $request->solutionType,
                'audience' => $request->audience,
                'features' => $request->features,
                'visual_style' => $request->visualStyle,
                'timing' => $request->timing,
                'budget' => $request->budget,
                'mission_part1' => $request->missionPart1,
                'mission_part2' => $request->missionPart2,
                'mission_part3' => $request->missionPart3,
                'status' => 'pending',
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Project created successfully',
                'data' => [
                    'form_data' => $formData,
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating the project',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user's form data
     */
    public function getFormData(Request $request)
    {
        $formData = FormData::where('user_id', Auth::id())->first();

        if (!$formData) {
            return response()->json([
                'success' => false,
                'message' => 'No form data found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $formData
        ], 200);
    }

    /**
     * Update form data
     */
    public function updateFormData(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userCompany' => 'nullable|string|max:255',
            'userMotivation' => 'nullable|string',
            'userInspiration' => 'nullable|string',
            'userConcerns' => 'nullable|string',
            'projectDescription' => 'nullable|string',
            'solutionType' => 'nullable|string|max:255',
            'audience' => 'nullable|string|max:255',
            'features' => 'nullable|array',
            'visualStyle' => 'nullable|string|max:255',
            'timing' => 'nullable|string|max:255',
            'budget' => 'nullable|string|max:255',
            'missionPart1' => 'nullable|string',
            'missionPart2' => 'nullable|string',
            'missionPart3' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $formData = FormData::updateOrCreate(
            ['user_id' => Auth::id()],
            [
                'user_company' => $request->userCompany,
                'user_motivation' => $request->userMotivation,
                'user_inspiration' => $request->userInspiration,
                'user_concerns' => $request->userConcerns,
                'project_description' => $request->projectDescription,
                'solution_type' => $request->solutionType,
                'audience' => $request->audience,
                'features' => $request->features,
                'visual_style' => $request->visualStyle,
                'timing' => $request->timing,
                'budget' => $request->budget,
                'mission_part1' => $request->missionPart1,
                'mission_part2' => $request->missionPart2,
                'mission_part3' => $request->missionPart3,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Form data updated successfully',
            'data' => $formData
        ], 200);
    }

    /**
     * Get all form submissions (Admin only)
     */
    public function getAllFormData(Request $request)
    {
        $user = Auth::user();
        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access'
            ], 403);
        }

        $formData = FormData::with('user:id,fullname,email,role')->get();

        return response()->json([
            'success' => true,
            'data' => $formData
        ], 200);
    }
    public function getUserProjects(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non authentifié.',
            ], 401);
        }

        // Fetch all projects associated with the authenticated user
        $projects = FormData::where('user_id', $user->id)->get();

        return response()->json([
            'success' => true,
            'data' => FormDataResource::collection($projects),
        ], 200);
    }




    

    public function show($id)
    {
        $project = FormData::find($id);
        if ($project && $project->user_id === Auth::id()) {
            return response()->json(['success' => true, 'data' => $project]);
        }
        return response()->json(['success' => false, 'message' => 'Projet non trouvé'], 404);
    }



    public function deleteProject(Request $request, $id)
    {
        $user = JWTAuth::parseToken()->authenticate();

        // Find the project and ensure it belongs to the authenticated user
        $project = FormData::where('id', $id)->where('user_id', $user->id)->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found or unauthorized'
            ], 404);
        }

        DB::beginTransaction();

        try {
            $project->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Project deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while deleting the project',
                'error' => $e->getMessage()
            ], 500);
        }
    }


public function getUserProject(Request $request, $id)
{
    $user = $request->user();

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Utilisateur non authentifié.',
        ], 401);
    }

    // Fetch the specific project associated with the authenticated user
    $project = FormData::where('user_id', $user->id)
                     ->where('id', $id)
                     ->first();

    if (!$project) {
        return response()->json([
            'success' => false,
            'message' => 'Projet non trouvé ou vous n\'avez pas accès à ce projet.',
        ], 404);
    }

    return response()->json([
        'success' => true,
        'data' => new FormDataResource($project),
    ], 200);
}



    

}