<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authenticated user endpoint
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user()->only('id', 'name', 'email', 'role', 'avatar_url');
});

/*
|--------------------------------------------------------------------------
| Role-guarded route groups
|--------------------------------------------------------------------------
| Each group requires Sanctum auth + the specified role(s).
| Add your feature controllers inside each group.
*/

// Admin-only routes
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return response()->json(['message' => 'Admin dashboard']);
    });
});

// Teacher routes (accessible by teachers and admins)
Route::middleware(['auth:sanctum', 'role:teacher,admin'])->prefix('teacher')->group(function () {
    Route::get('/dashboard', function () {
        return response()->json(['message' => 'Teacher dashboard']);
    });
});

// Student routes (accessible by all authenticated roles)
Route::middleware(['auth:sanctum', 'role:student,teacher,admin'])->prefix('student')->group(function () {
    Route::get('/dashboard', function () {
        return response()->json(['message' => 'Student dashboard']);
    });
});
