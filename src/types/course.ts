export interface Course {
  id: number;
  name: string;
  code: string;
  description: string;
  credits: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  created_at?: string;
  updated_at?: string;
}

export interface CreateCourseRequest {
  name: string;
  code: string;
  description: string;
  credits: number;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface UpdateCourseRequest {
  name?: string;
  code?: string;
  description?: string;
  credits?: number;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface CourseListResponse {
  data: Course[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface CourseFilters {
  limit?: number;
  page?: number;
  q?: string;
  level?: string;
}