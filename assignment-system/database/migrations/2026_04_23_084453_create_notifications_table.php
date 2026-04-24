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
        Schema::create('notifications', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('type', [
                'deadline_reminder',
                'submission_received',
                'submission_confirmed',
                'grade_posted',
                'late_submission_alert',
                'assignment_published',
            ]);
            $table->text('message');
            $table->string('action_url')->nullable(); // optional deep-link
            $table->boolean('is_read')->default(false);
            $table->timestamp('created_at')->useCurrent();
 
            $table->index(['user_id', 'is_read']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
