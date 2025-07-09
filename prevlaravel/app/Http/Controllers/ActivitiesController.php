<?php

namespace App\Http\Controllers;

use App\Models\ProjectActivity;
use App\Models\FormData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class ActivitiesController extends Controller
{
    public function index($id)
    {
        try {
            $formData = FormData::find($id);
            if (!$formData) {
                Log::warning('Form data not found for id: ' . $id);
                return response()->json([
                    'message' => 'Form data not found.',
                    'error' => 'FormData with ID ' . $id . ' does not exist.',
                    'success' => false,
                ], 404);
            }

            $activities = ProjectActivity::where('form_data_id', $id)->get() ?: [];
            return response()->json([
                'data' => $activities,
                'message' => $activities->isEmpty() ? 'No activities found.' : 'Activities retrieved.',
                'success' => true,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching activities for id: ' . $id, ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Error fetching activities.',
                'error' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }

    public function store(Request $request, $id)
    {
        Log::info('Store initiated for form_data_id: ' . $id);

        try {
            $formData = FormData::findOrFail($id);
            Log::info('FormData found for id: ' . $id);
        } catch (\Exception $e) {
            Log::error('FormData not found for id: ' . $id, ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Form data not found.',
                'error' => 'FormData with ID ' . $id . ' does not exist.',
                'success' => false,
            ], 404);
        }

        $validated = $request->validate([
            'activity_log' => 'required|string',
            'actor' => 'required|string|max:255',
            'created_at' => 'required|date',
        ]);

        Log::info('Validation passed for form_data_id: ' . $id, ['validated' => $validated]);

        try {
            DB::beginTransaction();
            Log::info('Transaction started for form_data_id: ' . $id);

            $activity = ProjectActivity::create([
                'form_data_id' => $id,
                'activity_log' => $validated['activity_log'],
                'actor' => $validated['actor'],
                'created_at' => $validated['created_at'],
            ]);

            Log::info('Activity created for form_data_id: ' . $id, ['activity_id' => $activity->id]);

            if (!$activity->exists) {
                Log::warning('Activity not saved for form_data_id: ' . $id);
                throw new \Exception('Activity not saved after creation');
            }

            DB::commit();
            Log::info('Transaction committed for form_data_id: ' . $id, ['saved_data' => $activity->toArray()]);
            return response()->json([
                'data' => $activity,
                'message' => 'Activité ajoutée avec succès.',
                'success' => true,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to store activity for form_data_id: ' . $id, [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'validated_data' => $validated,
            ]);
            return response()->json([
                'message' => 'Échec de la création de l’activité.',
                'error' => 'Une erreur est survenue lors de la sauvegarde: ' . $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }

    public function destroy($id, $itemId)
    {
        try {
            $formData = FormData::findOrFail($id);
            $activity = ProjectActivity::where('form_data_id', $id)->where('id', $itemId)->firstOrFail();
            $activity->delete();

            Log::info('Activity deleted for form_data_id: ' . $id, ['activity_id' => $itemId]);
            return response()->json([
                'message' => 'Activité supprimée avec succès.',
                'success' => true,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Failed to delete activity for form_data_id: ' . $id, ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Échec de la suppression de l’activité.',
                'error' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }
}