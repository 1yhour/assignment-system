<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'code',
        'description',
        'created_by',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    // ── Relationships ──────────────────────────────────────────

    /** Teacher who created this course */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /** All enrolled users (teachers + students) via pivot */
    public function enrolledUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'course_enrollments', 'course_id', 'user_id')
                    ->withPivot('role', 'enrolled_at');
    }

    /** Only students enrolled */
    public function students(): BelongsToMany
    {
        return $this->enrolledUsers()->wherePivot('role', 'student');
    }

    /** Only teachers enrolled */
    public function teachers(): BelongsToMany
    {
        return $this->enrolledUsers()->wherePivot('role', 'teacher');
    }

    /** Lab assignments belonging to this course */
    public function labAssignments(): HasMany
    {
        return $this->hasMany(LabAssignment::class);
    }
}