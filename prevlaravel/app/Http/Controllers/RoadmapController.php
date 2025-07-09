<?php

namespace App\Http\Controllers;

use App\Models\RoadmapItem;
use App\Models\FormData;
use Illuminate\Http\Request;

class RoadmapController extends Controller
{

    public function index($id)
    {
        $formData = FormData::find($id);
        if (!$formData) {
            return response()->json([
                'message' => 'Form data not found.',
                'error' => 'FormData with ID ' . $id . ' does not exist.'
            ], 404);
        }

        $items = RoadmapItem::where('form_data_id', $id)->get() ?: [];
        return response()->json(['data' => $items, 'message' => $items->isEmpty() ? 'No roadmap items found.' : 'Roadmap items retrieved.'], 200);
    }

    public function store(Request $request, $id)
    {
        $formData = FormData::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,upcoming,active,completed,on_hold,delayed,cancelled',
            'icon' => 'required|string|max:50',
            'target_date' => 'nullable|date',
            'assigned_to' => 'nullable|string|max:255',
            'order_index' => 'required|integer|min:0',
        ]);

        $item = RoadmapItem::create(array_merge(['form_data_id' => $id], $validated));
        
        return response()->json(['data' => $item, 'message' => 'Étape ajoutée avec succès.'], 201);
    }

    public function update(Request $request, $id, $itemId)
    {
        $formData = FormData::findOrFail($id);
        $item = RoadmapItem::where('form_data_id', $id)->where('id', $itemId)->firstOrFail();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,upcoming,active,completed,on_hold,delayed,cancelled',
            'icon' => 'required|string|max:50',
            'target_date' => 'nullable|date',
            'assigned_to' => 'nullable|string|max:255',
            'order_index' => 'required|integer|min:0',
        ]);

        $item->update($validated);
        
        return response()->json(['data' => $item, 'message' => 'Étape mise à jour avec succès.'], 200);
    }

    public function destroy($id, $itemId)
    {
        $formData = FormData::findOrFail($id);
        $item = RoadmapItem::where('form_data_id', $id)->where('id', $itemId)->firstOrFail();
        $item->delete();
        
        return response()->json(['message' => 'Étape supprimée avec succès.'], 200);
    }
}