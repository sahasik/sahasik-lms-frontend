export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  teacher_id: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  category: string;
  teacher_id: string;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {}

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
  category?: string;
}