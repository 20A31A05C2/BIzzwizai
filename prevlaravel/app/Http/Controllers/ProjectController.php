<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\FormData;
use Illuminate\Http\Request;

class ProjectController extends Controller
{

    public function show($id)
    {
        $formData = FormData::find($id);
        if (!$formData) {
            return response()->json([
                'message' => 'Form data not found.',
                'error' => 'FormData with ID ' . $id . ' does not exist.'
            ], 404);
        }

        $project = Project::where('form_data_id', $id)->first();
        return response()->json(['data' => $project ?: null, 'message' => $project ? 'Project found.' : 'No project found for this form data, ready to create.'], 200);
    }

    public function store(Request $request, $id)
    {
        $formData = FormData::findOrFail($id);

        $validated = $request->validate([
            'project_name' => 'required|string|max:255',
            'project_description' => 'nullable|string',
            'budget' => 'nullable|numeric|min:0',
            'progress' => 'nullable|integer|min:0|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|in:pending,active,completed,cancelled,onhold,payment_done,rejected,accepted',
        ]);

        $project = Project::create(array_merge(
            $validated,
            ['user_id' => $formData->user_id, 'form_data_id' => $id]
        ));

        return response()->json(['data' => $project, 'message' => 'Project created successfully.'], 201);
    }

    public function update(Request $request, $id)
{
    $formData = FormData::findOrFail($id);
    $project = Project::where('form_data_id', $id)->first();

    $validated = $request->validate([
        'project_name' => 'required|string|max:255',
        'project_description' => 'nullable|string',
        'budget' => 'nullable|numeric|min:0',
        'progress' => 'nullable|integer|min:0|max:100',
        'start_date' => 'nullable|date',
        'end_date' => 'nullable|date|after_or_equal:start_date',
        'status' => 'required|in:pending,active,completed,cancelled,onhold,payment_done,rejected,accepted',
    ]);

    if ($project) {
        $project->update($validated);
        $message = 'Project updated successfully.';
    } else {
        $project = Project::create(array_merge(
            $validated,
            ['user_id' => $formData->user_id, 'form_data_id' => $id]
        ));
        $message = 'Project created successfully.';
    }

    // ✅ Update FormData status if status was present in the request
    if (isset($validated['status'])) {
        $formData->status = $validated['status'];
        $formData->save();
    }

    return response()->json(['data' => $project, 'message' => $message], 200);
}

}