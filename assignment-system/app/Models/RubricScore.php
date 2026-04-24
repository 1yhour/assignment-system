<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RubricScore extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $table = 'rubric_scores';

    protected $fillable = [
        'grade_id',
        'criterion_id',
        'points_awarded',
        'comment',
    ];

    protected function casts(): array
    {
        return [
            'points_awarded' => 'integer',
        ];
    }

    /** Grade this score belongs to */
    public function grade(): BelongsTo
    {
        return $this->belongsTo(Grade::class);
    }

    /** Criterion being scored */
    public function criterion(): BelongsTo
    {
        return $this->belongsTo(RubricCriterion::class, 'criterion_id');
    }
}