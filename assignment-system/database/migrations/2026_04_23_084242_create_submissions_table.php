<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('submissions', function (Blueprint $table) {
           $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('lab_id')->constrained('lab_assignments')->cascadeOnDelete();
            $table->foreignUuid('student_id')->constrained('users')->cascadeOnDelete();
            $table->enum('type', ['file', 'github']);
            $table->string('file_url')->nullable();       // used when type = file
            $table->string('github_url')->nullable();     // used when type = github
            $table->enum('status', ['submitted', 'under_review', 'graded', 'resubmit_required'])->default('submitted');
            $table->boolean('is_late')->default(false);
            $table->text('student_notes')->nullable();
            $table->timestamp('submitted_at')->useCurrent();
 
            // A student can only have one active submission per lab
            $table->unique(['lab_id', 'student_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
