<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attachment extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'lab_id',
        'file_name',
        'file_url',
        'file_type',
        'file_size',
        'uploaded_at',
    ];

    protected function casts(): array
    {
        return [
            'uploaded_at' => 'datetime',
            'file_size'   => 'integer',
        ];
    }

    /** Lab this attachment belongs to */
    public function lab(): BelongsTo
    {
        return $this->belongsTo(LabAssignment::class, 'lab_id');
    }
}