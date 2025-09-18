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
   * Get all courses
   */
  async getCourses(): Promise<Course[]> {
    const response = await courseAPI.get<Course[]>('/courses');
    return response.data;
  },

  /**
   * Search courses with query
   */
  async searchCourses(query: string): Promise<Course[]> {
    const response = await courseAPI.get<Course[]>(`/courses/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  /**
   * Get single course by ID
   */
  async getCourse(id: number): Promise<Course> {
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
  async updateCourse(id: number, courseData: UpdateCourseRequest): Promise<Course> {
    const response = await courseAPI.put<Course>(`/courses/${id}`, courseData);
    return response.data;
  },

  /**
   * Delete course
   */
  async deleteCourse(id: number): Promise<void> {
    await courseAPI.delete(`/courses/${id}`);
  },
};