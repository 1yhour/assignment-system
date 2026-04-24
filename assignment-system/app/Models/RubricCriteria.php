<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RubricCriteria extends Model
{
    use HasUuids;

    protected $table = 'rubric_criteria';

    protected $fillable = [
        'lab_id',
        'criterion',
        'description',
        'max_points',
        'order_index',
    ];

    protected function casts(): array
    {
        return [
            'max_points'  => 'integer',
            'order_index' => 'integer',
        ];
    }

    /** Lab this criterion belongs to */
    public function lab(): BelongsTo
    {
        return $this->belongsTo(LabAssignment::class, 'lab_id');
    }

    /** Per-submission scores for this criterion */
    public function rubricScores(): HasMany
    {
        return $this->hasMany(RubricScore::class, 'criterion_id');
    }
}