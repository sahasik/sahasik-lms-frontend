import { courseAPI } from '@/lib/axios';
import { 
  Course, 
  CreateCourseRequest, 
  UpdateCourseRequest, 
  CourseListResponse, 
  CourseFilters 
} from '@/types/course';

export const courseService = {
  /**
   * Get paginated list of courses with optional filters
   */
  async getCourses(filters: CourseFilters = {}): Promise<CourseListResponse> {
    const params = new URLSearchParams();
    
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.q) params.append('q', filters.q);
    if (filters.category) params.append('category', filters.category);

    const response = await courseAPI.get<CourseListResponse>(`/courses?${params.toString()}`);
    return response.data;
  },

  /**
   * Get single course by ID
   */
  async getCourse(id: string): Promise<Course> {
    const response = await courseAPI.get<Course>(`/courses/${id}`);
    return response.data;
  },

  /**
   * Create new course
   */
  async createCourse(courseData: CreateCourseRequest): Promise<Course> {
    const response = await courseAPI.post<Course>('/courses', courseData);
    return response.data;
  },

  /**
   * Update existing course
   */
  async updateCourse(id: string, courseData: UpdateCourseRequest): Promise<Course> {
    const response = await courseAPI.put<Course>(`/courses/${id}`, courseData);
    return response.data;
  },

  /**
   * Delete course
   */
  async deleteCourse(id: string): Promise<void> {
    await courseAPI.delete(`/courses/${id}`);
  },
};