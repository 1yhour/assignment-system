<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class LabAssignment extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'lab_assignments';

    protected $fillable = [
        'course_id',
        'created_by',
        'title',
        'description',
        'objectives',
        'tools_required',
        'grading_points',
        'deadline',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'deadline'     => 'datetime',
            'is_published' => 'boolean',
            'grading_points' => 'integer',
        ];
    }

    // ── Helpers ────────────────────────────────────────────────
    public function isOverdue(): bool
    {
        return now()->isAfter($this->deadline);
    }

    // ── Relationships ──────────────────────────────────────────

    /** Course this lab belongs to */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /** Teacher who created this lab */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /** Files attached to this lab */
    public function attachments(): HasMany
    {
        return $this->hasMany(Attachment::class, 'lab_id');
    }

    /** Rubric criteria defined for this lab */
    public function rubricCriteria(): HasMany
    {
        return $this->hasMany(RubricCriterion::class, 'lab_id')->orderBy('order_index');
    }

    /** All student submissions for this lab */
    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class, 'lab_id');
    }
}