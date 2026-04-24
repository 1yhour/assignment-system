<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Grade extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'submission_id',
        'graded_by',
        'score',
        'feedback',
        'graded_at',
        'updated_at',
    ];

    protected function casts(): array
    {
        return [
            'score'      => 'integer',
            'graded_at'  => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** Submission this grade belongs to */
    public function submission(): BelongsTo
    {
        return $this->belongsTo(Submission::class);
    }

    /** Teacher who gave this grade */
    public function gradedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'graded_by');
    }

    /** Per-criterion breakdown scores */
    public function rubricScores(): HasMany
    {
        return $this->hasMany(RubricScore::class);
    }
}