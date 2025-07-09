<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Models\Appointment;
use App\Models\RoadmapItem;
use App\Models\FormData;
use App\Models\ProjectActivity;
use Illuminate\Http\Request;
use App\Http\Resources\ProjectResource;
use Illuminateuse\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\ProjectLink;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Log; // Add at the top

class UserController extends Controller // Ensure this extends Controller
{



    public function showpaymentlink($id)
    {
        if (Auth::id() != $id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $user = User::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => [
                'figma_url' => $user->figma_url,
                'payment_url' => $user->payment_url,
            ]
        ], 200);
    }

    public function updatepaymentlink(Request $request, $id)
    {
        if (Auth::id() != $id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'payment_url' => 'nullable|url|max:255',
        ]);

        $user = User::findOrFail($id);
        $user->update([
            'payment_url' => $request->input('payment_url'),
        ]);

        return response()->json(['success' => true, 'message' => 'User updated successfully']);
    }

    public function updateUserLinks(Request $request, $id)
    {
        if (!Auth::user()->isAdmin()) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'figma_url' => 'nullable|url|max:255',
            'payment_url' => 'nullable|url|max:255',
        ]);

        $user = User::findOrFail($id);
        $user->update([
            'figma_url' => $request->input('figma_url'),
            'payment_url' => $request->input('payment_url'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User links updated successfully',
            'data' => [
                'figma_url' => $user->figma_url,
                'payment_url' => $user->payment_url,
            ]
        ], 200);
    }


    public function createAppointment(Request $request)
    {
        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'figma_url' => 'nullable|url|max:255',
            'phone_number' => 'required|string|max:20',
            'appointment_date' => 'required|date|after_or_equal:today',
            'appointment_time' => 'required|date_format:H:i',
        ]);

        $appointment = Appointment::create([
            'user_id' => $userId,
            'name' => $request->input('name'),
            'figma_url' => $request->input('figma_url'),
            'phone_number' => $request->input('phone_number'),
            'appointment_date' => $request->input('appointment_date'),
            'appointment_time' => $request->input('appointment_time'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Appointment booked successfully',
            'data' => $appointment,
        ], 201);
    }

public function getRoadmapItems(Request $request, $projectId = null)
{
    try {
        // Get the authenticated user's ID
        $userId = auth()->id();

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non authentifié.',
            ], 401);
        }

        // Use projectId from route parameter if provided, otherwise check if it's in request
        $selectedProjectId = $projectId ?? $request->input('projectId');

        if (!$selectedProjectId) {
            return response()->json([
                'success' => false,
                'message' => 'ID du projet requis.',
            ], 400);
        }

        // Fetch the specific form_data/project for this user and project ID
        $formData = FormData::where('user_id', $userId)
                           ->where('id', $selectedProjectId)
                           ->first();

        if (!$formData) {
            return response()->json([
                'success' => true,
                'data' => [],
                'message' => 'Aucun projet trouvé ou vous n\'avez pas accès à ce projet.',
            ]);
        }

        // Check the project status
        $status = strtolower($formData->status ?? '');

        // Handle different statuses
        switch ($status) {
            case 'rejected':
                return response()->json([
                    'success' => true,
                    'data' => [],
                    'message' => 'Votre projet a été rejeté.',
                ]);

            case 'completed':
            case 'payment_done':
                // These statuses allow viewing roadmap
                break;

            case 'pending':
            case 'under_review':
            case 'in_progress':
            case 'on_hold':
            default:
                return response()->json([
                    'success' => true,
                    'data' => [],
                    'message' => 'Votre projet est en cours de traitement par l\'administrateur.',
                ]);
        }

        // Fetch roadmap items for this specific project
        $roadmapItems = RoadmapItem::where('form_data_id', $selectedProjectId)->get();

        // Transform the data to match the expected frontend structure
        $data = $roadmapItems->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'description' => $item->description,
                'status' => $item->status,
                'icon' => $item->icon,
                'target_date' => $item->target_date,
                'assigned_to' => $item->assigned_to,
                'order_index' => $item->order_index ? (int)$item->order_index : 0,
                'form_data_id' => $item->form_data_id,
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data,
            'project_status' => $status,
            'project_name' => $formData->project_name ?? 'Projet sans nom',
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de la récupération des éléments de la roadmap: ' . $e->getMessage(),
        ], 500);
    }
}
   
     public function getUserData($userId)
    {
        if (Auth::id() != $userId) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $user = User::find($userId);
        $appointment = Appointment::where('user_id', $userId)->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'fullname' => $user->fullname,
                    'email' => $user->email,
                    'profile_picture' => $user->profile_picture ? Storage::url($user->profile_picture) : null,
                ],
                'appointment' => $appointment ? [
                    'phone_number' => $appointment->phone_number,
                ] : [],
            ],
        ]);
    }

    /**
     * Update user appointment details
     *
     * @param Request $request
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateUserData(Request $request, $userId)
    {
        if (Auth::id() != $userId) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $userId,
            'phone_number' => 'required|string|max:20',
            'password' => 'nullable|string|min:8|confirmed',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,max:2048',
        ]);

        try {
            $user = User::findOrFail($userId);
            $appointment = Appointment::where('user_id', $userId)->first();

            // Update User model
            $userData = [
                'fullname' => $request->input('fullname'),
                'email' => $request->input('email'),
            ];

            if ($request->hasFile('profile_picture')) {
                // Delete old profile picture if it exists
                if ($user->profile_picture) {
                    Storage::disk('public')->delete($user->profile_picture);
                }
                $path = $request->file('profile_picture')->store('profile_pictures', 'public');
                $userData['profile_picture'] = $path;
            }

            if ($request->filled('password')) {
                $userData['password'] = bcrypt($request->input('password'));
            }

            $user->update($userData);

            // Update or create Appointment model for phone_number
            $appointmentData = [
                'user_id' => $userId,
                'phone_number' => $request->input('phone_number'),
            ];

            if ($appointment) {
                $appointment->update($appointmentData);
            } else {
                $appointment = Appointment::create($appointmentData);
            }

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => [
                    'user' => [
                        'fullname' => $user->fullname,
                        'email' => $user->email,
                        'profile_picture' => $user->profile_picture ? Storage::url($user->profile_picture) : null,
                    ],
                    'appointment' => [
                        'phone_number' => $appointment->phone_number,
                    ],
                ],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating profile: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function showPaymentLinksForProject($projectId)
    {
        $project = Project::findOrFail($projectId);
        $user = $project->user;

        if (!$user || (Auth::id() !== $user->id && !Auth::user()->isAdmin())) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'figma_url' => $user->figma_url,
                'payment_url' => $user->payment_url,
            ]
        ], 200);
    }



// public function getProjectLinks($projectId, Request $request)
//     {
//         try {
//             $user = JWTAuth::parseToken()->authenticate();
//             Log::info('Fetching project links for projectId: ' . $projectId . ', userId: ' . $user->id);

//             if (!is_numeric($projectId)) {
//                 return response()->json([
//                     'success' => false,
//                     'message' => 'Invalid project ID.',
//                 ], 400);
//             }

//             // Use a join to fetch project and link data in one query
//             $projectData = DB::table('projects')
//                 ->select(
//                     'projects.status',
//                     'project_links.payment_url',
//                     DB::raw('CASE WHEN projects.status IN ("payment_done", "completed") THEN project_links.figma_url ELSE NULL END as figma_url')
//                 )
//                 ->leftJoin('project_links', 'projects.form_data_id', '=', 'project_links.form_data_id')
//                 ->where('projects.id', $projectId)
//                 ->where('projects.user_id', $user->id)
//                 ->first();

//             Log::info('Project data:', [
//                 'projectId' => $projectId,
//                 'userId' => $user->id,
//                 'projectData' => $projectData ? (array)$projectData : null,
//             ]);

//             if (!$projectData) {
//                 Log::warning('Project not found or unauthorized for projectId: ' . $projectId . ', userId: ' . $user->id);
//                 return response()->json([
//                     'success' => false,
//                     'message' => 'Project not found or unauthorized.',
//                 ], 404);
//             }

//             if (!$projectData->payment_url && !$projectData->figma_url) {
//                 Log::warning('No links found for projectId: ' . $projectId);
//                 return response()->json([
//                     'success' => false,
//                     'message' => 'No links found for this project.',
//                 ], 404);
//             }

//             return response()->json([
//                 'success' => true,
//                 'data' => [
//                     'payment_url' => $projectData->payment_url,
//                     'figma_url' => $projectData->figma_url,
//                 ]
//             ]);
//         } catch (\Exception $e) {
//             Log::error('Error fetching project links: ' . $e->getMessage());
//             return response()->json([
//                 'success' => false,
//                 'message' => 'An error occurred while fetching project links.',
//             ], 500);
//         }
//     }

public function getProjectLinks($projectId, Request $request)
{
    try {
        $user = JWTAuth::parseToken()->authenticate();
        Log::info('Fetching project links for projectId: ' . $projectId . ', userId: ' . $user->id);

        if (!is_numeric($projectId)) {
            // Return empty links instead of error for invalid project ID
            return response()->json([
                'success' => true,
                'data' => [
                    'payment_url' => '',
                    'figma_url' => '',
                ]
            ], 200);
        }

        // Use a join to fetch project and link data in one query
        $projectData = DB::table('projects')
            ->select(
                'projects.status',
                'project_links.payment_url',
                DB::raw('CASE WHEN projects.status IN ("payment_done", "completed") THEN project_links.figma_url ELSE NULL END as figma_url')
            )
            ->leftJoin('project_links', 'projects.form_data_id', '=', 'project_links.form_data_id')
            ->where('projects.id', $projectId)
            ->where('projects.user_id', $user->id)
            ->first();

        Log::info('Project data:', [
            'projectId' => $projectId,
            'userId' => $user->id,
            'projectData' => $projectData ? (array)$projectData : null,
        ]);

        // If no project found, return empty links instead of error
        if (!$projectData) {
            Log::info('Project not found for projectId: ' . $projectId . ', userId: ' . $user->id . ' - returning empty links');
            return response()->json([
                'success' => true,
                'data' => [
                    'payment_url' => '',
                    'figma_url' => '',
                ]
            ], 200);
        }

        // Return the links (they might be null/empty, which is fine)
        return response()->json([
            'success' => true,
            'data' => [
                'payment_url' => $projectData->payment_url ?? '',
                'figma_url' => $projectData->figma_url ?? '',
            ]
        ], 200);

    } catch (\Exception $e) {
        Log::error('Error fetching project links: ' . $e->getMessage());
        // Even on error, return empty links to allow UI to display
        return response()->json([
            'success' => true,
            'data' => [
                'payment_url' => '',
                'figma_url' => '',
            ]
        ], 200);
    }
}

//     /**
//      * Get projects table data for the authenticated user.
//      *
//      * @param Request $request
//      * @return \Illuminate\Http\JsonResponse
//      */
//     public function getProjectsTable(Request $request)
//     {
//         try {
//             // Get the authenticated user
//             $user = Auth::user();

//             if (!$user) {
//                 return response()->json([
//                     'success' => false,
//                     'message' => 'Unauthenticated.',
//                 ], 401);
//             }

//             // Fetch only the user's projects
//             $projects = Project::where('user_id', $user->id)->get();

//             if ($projects->isEmpty()) {
//                 return response()->json([
//                     'success' => false,
//                     'message' => 'No projects found for this user.',
//                 ], 404);
//             }

//             return response()->json([
//                 'success' => true,
//                 'data' => $projects,
//             ], 200);
//         } catch (\Exception $e) {
//             \Log::error('Error fetching projects table: ' . $e->getMessage());
//             return response()->json([
//                 'success' => false,
//                 'message' => 'An error occurred while fetching projects table data.',
//             ], 500);
//         }
//     }

// public function getProjectsActivities(Request $request)
// {
//     try {
//         // Get the authenticated user
//         $user = Auth::user();
//         if (!$user) {
//             return response()->json([
//                 'success' => false,
//                 'message' => 'Unauthenticated.',
//             ], 401);
//         }

//         // Get all form_data_ids that belong to this user
//         $userFormDataIds = FormData::where('user_id', $user->id)->pluck('id');

//         // Get activities for all of this user's form_data_ids
//         $activities = ProjectActivity::whereIn('form_data_id', $userFormDataIds)->get([
//             'id',
//             'form_data_id',
//             'activity_log',
//             'actor',
//             'created_at',
//             'updated_at',
//         ]);

//         return response()->json([
//             'success' => true,
//             'data' => $activities,
//             'count' => $activities->count(),
//         ]);
//     } catch (\Exception $e) {
//         return response()->json([
//             'success' => false,
//             'message' => 'An error occurred while fetching activities: ' . $e->getMessage(),
//         ], 500);
//     }
// }


// public function checkStatus(Request $request)
// {
//     $user = Auth::user();

//     if (!$user) {
//         return response()->json([
//             'success' => false,
//             'message' => 'Unauthenticated',
//         ], 401);
//     }

//     // Get the latest or current project
//     $project = Project::where('user_id', $user->id)->latest()->first();

//     if (!$project) {
//         return response()->json([
//             'success' => false,
//             'message' => 'No project found for this user',
//         ], 404);
//     }

//     return response()->json([
//         'success' => true,
//         'status' => $project->status,  // e.g., 'payment_done', 'completed', 'rejected', 'pending'
//     ]);
// }


public function getProjectsTable(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['success' => false, 'message' => 'Unauthenticated.'], 401);
            }

            $projectId = $request->query('project_id');
            $query = Project::where('user_id', $user->id);

            if ($projectId) {
                $query->where('id', $projectId);
            }

            $projects = $query->get();

            return response()->json([
                'success' => true,
                'data' => $projects->isEmpty() ? [] : $projects,
                'message' => $projects->isEmpty() ? 'Admin is reviewing your projects.' : null,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching projects table: ' . $e->getMessage());
            return response()->json([
                'success' => true,
                'data' => [],
                'message' => 'Admin is reviewing your projects.',
            ], 200);
        }
    }

    /**
     * Get project activities for the authenticated user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProjectsActivities(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['success' => false, 'message' => 'Unauthenticated.'], 401);
            }

            $projectId = $request->query('project_id');
            $userFormDataIds = FormData::where('user_id', $user->id)->pluck('id');

            $query = ProjectActivity::whereIn('form_data_id', $userFormDataIds);

            if ($projectId) {
                $formDataId = FormData::where('project_id', $projectId)->value('id');
                if ($formDataId) {
                    $query->where('form_data_id', $formDataId);
                }
            }

            $activities = $query->get([
                'id',
                'form_data_id',
                'activity_log',
                'actor',
                'created_at',
                'updated_at',
            ]);

            return response()->json([
                'success' => true,
                'data' => $activities,
                'count' => $activities->count(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => true,
                'data' => [],
                'count' => 0,
                'message' => 'Admin is reviewing your activities.',
            ], 200);
        }
    }

    /**
     * Check the status of a project for the authenticated user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkStatus(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }

        $projectId = $request->query('project_id');
        $project = Project::where('user_id', $user->id);

        if ($projectId) {
            $project->where('id', $projectId);
        }

        $project = $project->latest()->first();

        if (!$project) {
            return response()->json([
                'success' => true,
                'status' => 'pending',
                'message' => 'Admin is reviewing your project.',
            ], 200);
        }

        return response()->json([
            'success' => true,
            'status' => $project->status, // e.g., 'payment_done', 'completed', 'rejected', 'pending'
        ]);
    }





}