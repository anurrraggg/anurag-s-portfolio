import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'learner' | 'verifier' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  skill_category: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  duration_minutes: number;
  passing_score: number;
  is_published: boolean;
  created_by: string;
  created_at: string;
}

export interface AssessmentQuestion {
  id: string;
  assessment_id: string;
  question_type: 'mcq' | 'coding' | 'essay';
  question_text: string;
  options?: Record<string, string>;
  correct_answer?: string;
  points: number;
  order_number: number;
  test_cases?: any;
}

export interface AssessmentAttempt {
  id: string;
  assessment_id: string;
  user_id: string;
  status: 'in_progress' | 'completed' | 'flagged';
  score: number;
  started_at: string;
  completed_at?: string;
  proctoring_data: any;
}

export interface Credential {
  id: string;
  user_id: string;
  assessment_id: string;
  attempt_id: string;
  credential_hash: string;
  issue_date: string;
  verification_code: string;
  is_revoked: boolean;
  metadata: any;
}
