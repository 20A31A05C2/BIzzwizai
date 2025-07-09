<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminProjectController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\AdminSettingsController;
use App\Http\Controllers\FormDataController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectLinksController;
use App\Http\Controllers\RoadmapController;
use App\Http\Controllers\FeaturesController;
use App\Http\Controllers\ActivitiesController;


// Public routes

//register login and form submission and logout
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/submit-form', [FormController::class, 'submitForm']);
Route::post('/logout', [AuthController::class, 'logout']);

// Email verification routes
Route::post('/email/resend', [AuthController::class, 'resendVerificationEmail']);
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
    ->middleware('signed')
    ->name('verification.verify');

// Password reset routes
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']); 
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
Route::get('/reset-password/{token}', [AuthController::class, 'showResetPasswordForm'])->name('password.reset.get');




    // user routes
    Route::middleware(['auth:api', 'is.user'])->group(function () {
    
        // Route::get('/form-data', [FormController::class, 'getFormData']);
        // Route::put('/form-data', [FormController::class, 'updateFormData']);
        Route::post('/projects', [FormController::class, 'createProject']);
        Route::get('/user-projects', [FormController::class, 'getUserProjects']);
        Route::get('/user-projects/{id}', [FormDataController::class, 'show']);
        Route::get('/form-data/{id}', [FormDataController::class, 'show']); // For user-specific project data
        Route::delete('/user-projects/{id}', [FormController::class, 'deleteProject']);
        Route::get('/users/{id}', [UserController::class, 'showpaymentlink']);
        Route::patch('/users/{id}', [UserController::class, 'updatepaymentlink']);
        Route::post('/appointments', [UserController::class, 'createAppointment']);
        Route::get('/user-roadmap', [UserController::class, 'getRoadmapItems']);


        Route::get('/projects-table', [UserController::class, 'getProjectsTable']);
        Route::get('/projects-activites', [UserController::class, 'getProjectsActivities']);
        Route::get('/check-status', [UserController::class, 'checkStatus']);

        //getting the user project by id
        Route::get('/user-projects/{id}', [FormController::class, 'getUserProject']);

        


        

        
        // Roadmap routes for users
        Route::get('/roadmap/{projectId}', [UserController::class, 'getRoadmapItems']); // For specific project
       
    
        Route::get('/appointments/user/{userId}', [UserController::class, 'getUserData']);
        Route::post('/appointments/user/{userId}', [UserController::class, 'updateUserData']);
        Route::get('/user-projects/{projectId}/payment-links', [UserController::class, 'getProjectLinks']);

        //selected user project for the userdashboard
        Route::get('/form-data/user/{userId}', [FormDataController::class, 'UserProjects']); // Exact match
        // Route::get('/form-data/{formDataId}', [FormDataController::class, 'getProject']);


    });
    
     





    // Admin routes
    
    Route::middleware(['auth:api', 'is.admin'])->group(function () {

        //admin homepage and user management and appointments
        Route::get('/users', [AdminController::class, 'index']);
        Route::put('/users/{id}', [AdminController::class, 'update']);
        Route::delete('/users/{id}', [AdminController::class, 'destroy']);
        Route::get('/admin-stats', [AdminController::class, 'stats']);
        Route::get('/admin/appointments', [AdminController::class, 'getAppointments']); 

        //settings
        Route::get('/adminsettings', [AdminSettingsController::class, 'getSettings']);
        Route::post('/update-admin', [AdminSettingsController::class, 'updateAdmin']);  
        Route::post('/update-email', [AdminSettingsController::class, 'updateEmail']);
        Route::post('/test-email', [AdminSettingsController::class, 'testEmail']);

        //projects disolaying the table
        Route::get('/form-data', [FormDataController::class, 'index']);
        Route::get('/form-data/{id}', [FormDataController::class, 'show']);
        Route::patch('/form-data/{id}', [FormDataController::class, 'updateStatus']);

        // Projects
        Route::get('/admin/projects/{id}', [ProjectController::class, 'show']); 
        Route::post('/admin/projects/{id}', [ProjectController::class, 'store']); 
        Route::patch('/admin/projects/{id}', [ProjectController::class, 'update']); 

        // Links
        Route::get('/admin/projects/{id}/links', [ProjectLinksController::class, 'show']);
        Route::post('/admin/projects/{id}/links', [ProjectLinksController::class, 'store']);
        Route::patch('/admin/projects/{id}/links', [ProjectLinksController::class, 'update']);

        // Roadmap
        Route::get('/admin/projects/{id}/roadmap', [RoadmapController::class, 'index']);
        Route::post('/admin/projects/{id}/roadmap', [RoadmapController::class, 'store']);
        Route::patch('/admin/projects/{id}/roadmap/{itemId}', [RoadmapController::class, 'update']); 
        Route::delete('/admin/projects/{id}/roadmap/{itemId}', [RoadmapController::class, 'destroy']);

        // Features
        Route::get('/admin/projects/{formDataId}/features', [FeaturesController::class, 'index']);
        Route::post('/admin/projects/{formDataId}/features', [FeaturesController::class, 'store']);
        Route::patch('/admin/projects/{formDataId}/features/{featureId}', [FeaturesController::class, 'update']);
        Route::delete('/admin/projects/{formDataId}/features/{featureId}', [FeaturesController::class, 'destroy']);

        // Activities
        Route::get('/admin/projects/{id}/activities', [ActivitiesController::class, 'index']);
        Route::post('/admin/projects/{id}/activities', [ActivitiesController::class, 'store']);
        Route::delete('/admin/projects/{id}/activities/{itemId}', [ActivitiesController::class, 'destroy']);

});

