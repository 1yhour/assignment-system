<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Submission extends Model
{
    use HasFactory, HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'lab_id',
        'student_id',
        'type',
        'file_url',
        'github_url',
        'status',
        'is_late',
        'student_notes',
        'submitted_at',
    ];

    protected function casts(): array
    {
        return [
            'is_late'      => 'boolean',
            'submitted_at' => 'datetime',
        ];
    }

    // ── Helpers ────────────────────────────────────────────────
    public function isGraded(): bool
    {
        return $this->status === 'graded';
    }

    // ── Relationships ──────────────────────────────────────────

    /** Lab this submission is for */
    public function lab(): BelongsTo
    {
        return $this->belongsTo(LabAssignment::class, 'lab_id');
    }

    /** Student who submitted */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /** Grade for this submission (zero or one) */
    public function grade(): HasOne
    {
        return $this->hasOne(Grade::class);
    }
}