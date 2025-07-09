<?php

namespace App\Http\Controllers;

use App\Models\ProjectFeature;
use App\Models\FormData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class FeaturesController extends Controller
{
    public function index($formDataId)
    {
        try {
            // Find the FormData record
            $formData = FormData::find($formDataId);
            if (!$formData) {
                Log::warning('Form data not found for id: ' . $formDataId);
                return response()->json([
                    'message' => 'Form data not found.',
                    'error' => 'FormData with ID ' . $formDataId . ' does not exist.',
                ], 404);
            }

            // Fetch features for the form_data_id
            $features = ProjectFeature::where('form_data_id', $formDataId)->get();

            return response()->json([
                'data' => $features,
                'message' => $features->isEmpty() ? 'No features found.' : 'Features retrieved successfully.',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching features for form_data_id: ' . $formDataId, ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Error fetching features.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request, $formDataId)
    {
        Log::info('Store initiated for form_data_id: ' . $formDataId);

        try {
            // Find the FormData record
            $formData = FormData::findOrFail($formDataId);
            Log::info('FormData found for id: ' . $formDataId);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'required|in:planned,in_progress,development,testing,completed,on_hold,cancelled,needs_review',
                'icon' => 'required|string|max:50',
            ]);

            Log::info('Validation passed for form_data_id: ' . $formDataId, ['validated' => $validated]);

            DB::beginTransaction();
            Log::info('Transaction started for form_data_id: ' . $formDataId);

            $feature = ProjectFeature::create(array_merge(['form_data_id' => $formDataId], $validated));

            Log::info('Feature created for form_data_id: ' . $formDataId, ['feature_id' => $feature->id]);

            if (!$feature->exists) {
                Log::warning('Feature not saved after create for form_data_id: ' . $formDataId);
                throw new \Exception('Feature not saved after create');
            }

            DB::commit();
            Log::info('Transaction committed for form_data_id: ' . $formDataId, ['saved_data' => $feature->toArray()]);

            return response()->json([
                'data' => $feature,
                'message' => 'Fonctionnalité ajoutée avec succès.',
                'success' => true,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to store feature for form_data_id: ' . $formDataId, [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'validated_data' => $validated ?? null,
            ]);
            return response()->json([
                'message' => 'Échec de l\'ajout de la fonctionnalité.',
                'error' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }

    public function update(Request $request, $formDataId, $featureId)
    {
        Log::info('Update initiated for form_data_id: ' . $formDataId . ', feature_id: ' . $featureId);

        try {
            // Find the FormData record
            $formData = FormData::findOrFail($formDataId);
            Log::info('FormData found for id: ' . $formDataId);

            // Find the feature
            $feature = ProjectFeature::where('form_data_id', $formDataId)
                                   ->where('id', $featureId)
                                   ->firstOrFail();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'required|in:planned,in_progress,development,testing,completed,on_hold,cancelled,needs_review',
                'icon' => 'required|string|max:50',
            ]);

            Log::info('Validation passed for form_data_id: ' . $formDataId, ['validated' => $validated]);

            DB::beginTransaction();
            Log::info('Transaction started for form_data_id: ' . $formDataId);

            $feature->update($validated);

            Log::info('Feature updated for form_data_id: ' . $formDataId, ['feature_id' => $feature->id]);

            DB::commit();
            Log::info('Transaction committed for form_data_id: ' . $formDataId, ['saved_data' => $feature->toArray()]);

            return response()->json([
                'data' => $feature,
                'message' => 'Fonctionnalité mise à jour avec succès.',
                'success' => true,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to update feature for form_data_id: ' . $formDataId . ', feature_id: ' . $featureId, [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'validated_data' => $validated ?? null,
            ]);
            return response()->json([
                'message' => 'Échec de la mise à jour de la fonctionnalité.',
                'error' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }

    public function destroy($formDataId, $featureId)
    {
        Log::info('Delete initiated for form_data_id: ' . $formDataId . ', feature_id: ' . $featureId);

        try {
            // Find the FormData record
            $formData = FormData::findOrFail($formDataId);
            Log::info('FormData found for id: ' . $formDataId);

            // Find and delete the feature
            $feature = ProjectFeature::where('form_data_id', $formDataId)
                                   ->where('id', $featureId)
                                   ->firstOrFail();

            DB::beginTransaction();
            Log::info('Transaction started for form_data_id: ' . $formDataId);

            $feature->delete();

            Log::info('Feature deleted for form_data_id: ' . $formDataId, ['feature_id' => $featureId]);

            DB::commit();
            Log::info('Transaction committed for form_data_id: ' . $formDataId);

            return response()->json([
                'message' => 'Fonctionnalité supprimée avec succès.',
                'success' => true,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to delete feature for form_data_id: ' . $formDataId . ', feature_id: ' . $featureId, [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'message' => 'Échec de la suppression de la fonctionnalité.',
                'error' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }
}