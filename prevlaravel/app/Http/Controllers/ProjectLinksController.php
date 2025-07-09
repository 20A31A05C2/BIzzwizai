<?php

namespace App\Http\Controllers;

use App\Models\ProjectLink;
use App\Models\FormData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class ProjectLinksController extends Controller
{


    public function show($id)
    {
        try {
            $formData = FormData::find($id);
            if (!$formData) {
                Log::warning('Form data not found for id: ' . $id);
                return response()->json([
                    'message' => 'Form data not found.',
                    'error' => 'FormData with ID ' . $id . ' does not exist.'
                ], 404);
            }

            $links = ProjectLink::where('form_data_id', $id)->first() ?: ['figma_url' => '', 'payment_url' => ''];
            return response()->json(['data' => $links, 'message' => $links ? 'Links found.' : 'No links found.'], 200);
        } catch (\Exception $e) {
            Log::error('Error in show method for id: ' . $id, ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Error fetching links.', 'error' => $e->getMessage()], 500);
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
                'success' => false
            ], 404);
        }

        $validated = $request->validate([
            'figma_url' => 'nullable|url|max:255',
            'payment_url' => 'nullable|url|max:255',
        ]);

        Log::info('Validation passed for form_data_id: ' . $id, ['validated' => $validated]);

        try {
            DB::beginTransaction();
            Log::info('Transaction started for form_data_id: ' . $id);

            $links = ProjectLink::updateOrCreate(
                ['form_data_id' => $id],
                $validated
            );

            Log::info('updateOrCreate executed for form_data_id: ' . $id, ['links_id' => $links->id ?? 'null']);

            if (!$links->exists) {
                Log::warning('Model not saved after updateOrCreate for form_data_id: ' . $id);
                throw new \Exception('Model not saved after updateOrCreate');
            }

            $saved = $links->save();
            Log::info('Save attempted for form_data_id: ' . $id, ['saved' => $saved]);

            if (!$saved) {
                Log::warning('Save failed for form_data_id: ' . $id);
                throw new \Exception('Save operation failed');
            }

            $savedLinks = ProjectLink::where('id', $links->id)->first();
            if (!$savedLinks) {
                Log::warning('Record not found after save for form_data_id: ' . $id);
                throw new \Exception('Record not found in database after save');
            }

            DB::commit();
            Log::info('Transaction committed for form_data_id: ' . $id, ['saved_data' => $savedLinks->toArray()]);
            return response()->json([
                'data' => $savedLinks,
                'message' => 'Liens créés avec succès.',
                'success' => true
            ], 201); // 201 Created for POST
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to store links for form_data_id: ' . $id, [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'validated_data' => $validated,
            ]);
            return response()->json([
                'message' => 'Échec de la création des liens.',
                'error' => 'Une erreur est survenue lors de la sauvegarde: ' . $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }


    public function update(Request $request, $id)
{
    Log::info('Update initiated for form_data_id: ' . $id);

    try {
        $formData = FormData::findOrFail($id);
        Log::info('FormData found for id: ' . $id);
    } catch (\Exception $e) {
        Log::error('FormData not found for id: ' . $id, ['error' => $e->getMessage()]);
        return response()->json([
            'message' => 'Form data not found.',
            'error' => 'FormData with ID ' . $id . ' does not exist.',
            'success' => false
        ], 404);
    }

    $validated = $request->validate([
        'figma_url' => 'nullable|url|max:255',
        'payment_url' => 'nullable|url|max:255',
    ]);

    Log::info('Validation passed for form_data_id: ' . $id, ['validated' => $validated]);

    try {
        DB::beginTransaction();
        Log::info('Transaction started for form_data_id: ' . $id);

        $links = ProjectLink::where('form_data_id', $id)->first();

        if (!$links) {
            Log::warning('No links found for form_data_id: ' . $id);
            return response()->json([
                'message' => 'No links found to update.',
                'success' => false
            ], 404);
        }

        $links->update($validated);
        Log::info('Links updated for form_data_id: ' . $id, ['updated_data' => $links->toArray()]);

        DB::commit();
        return response()->json([
            'data' => $links,
            'message' => 'Links updated successfully.',
            'success' => true
        ], 200);
    } catch (\Exception $e) {
        DB::rollBack();
        Log::error('Failed to update links for form_data_id: ' . $id, [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
            'validated_data' => $validated,
        ]);
        return response()->json([
            'message' => 'Failed to update links.',
            'error' => 'An error occurred while updating: ' . $e->getMessage(),
            'success' => false,
        ], 500);
    }
}
}