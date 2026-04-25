export type UserRole = 'admin' | 'teacher' | 'student';
export type SubmissionType = 'file' | 'github';
export type SubmissionStatus = 'submitted' | 'under_review' | 'graded' | 'resubmit_required';
export type LabStatus = 'draft' | 'published' | 'closed';

export interface Course {
  id: string; title: string; code: string;
  description?: string; createdBy: string;
}

export interface RubricCriterion {
  id: string; labId: string; criterion: string;
  description?: string; maxPoints: number; orderIndex: number;
}

export interface Attachment {
  id: string; labId: string; fileName: string;
  fileUrl: string; fileType: string; fileSize?: number; uploadedAt: string;
}

export interface LabAssignment {
  id: string; courseId: string; course?: Course;
  createdBy: string; title: string; description?: string;
  objectives?: string; toolsRequired?: string;
  gradingPoints: number; deadline: string; isPublished: boolean;
  attachments?: Attachment[]; rubricCriteria?: RubricCriterion[];
  submissionsCount?: number; totalStudents?: number; createdAt: string;
}

export interface User {
  id: string; name: string; email: string;
  role: UserRole; avatarUrl?: string;
}

export interface Grade {
  id: string; submissionId: string; gradedBy: string;
  score: number; feedback?: string; gradedAt: string;
  rubricScores?: RubricScore[];
}

export interface RubricScore {
  id: string; gradeId: string; criterionId: string;
  criterion?: RubricCriterion; pointsAwarded: number; comment?: string;
}

export interface Submission {
  id: string; labId: string; studentId: string; student?: User;
  type: SubmissionType; fileUrl?: string; githubUrl?: string;
  status: SubmissionStatus; isLate: boolean;
  studentNotes?: string; submittedAt: string; grade?: Grade;
}

export interface TeacherStats {
  activeLabs: number; pendingReviews: number;
  gradedThisWeek: number; lateSubmissions: number; avgScore: number;
}

export interface CreateLabCriterion {
  criterion: string;
  maxPoints: number;
}

export interface CreateLabFormData {
  title: string; courseId: string; description: string;
  objectives: string; toolsRequired: string;
  submissionType: 'file' | 'github' | 'both';
  deadline: string; gradingPoints: number; isPublished: boolean;
  criteria: CreateLabCriterion[];
}