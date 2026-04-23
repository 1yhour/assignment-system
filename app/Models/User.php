<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    use HasFactory, HasUuids, Notifiable;
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'avatar_url',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected function casts(): array {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    //helper
    public function isAdmin():bool { return $this->role === 'admin'; }
    public function isTeacher():bool { return $this->role === 'teacher'; }
    public function isStudent():bool { return $this->role === 'student'; }

    /** Courses this teacher created */
    public function createdCourses(): HasMany
    {
        return $this->hasMany(Course::class, 'created_by');
    }
 
    /** Courses this user is enrolled in (any role) */
    public function enrolledCourses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_enrollments', 'user_id', 'course_id')
                    ->withPivot('role', 'enrolled_at')
                    ->withTimestamps();
    }
 
    /** Lab assignments created by this teacher */
    public function createdLabs(): HasMany
    {
        return $this->hasMany(LabAssignment::class, 'created_by');
    }
 
    /** Submissions made by this student */
    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class, 'student_id');
    }
 
    /** Grades given by this teacher */
    public function givenGrades(): HasMany
    {
        return $this->hasMany(Grade::class, 'graded_by');
    }
 
    /** Notifications for this user */
    public function systemNotifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }
}

