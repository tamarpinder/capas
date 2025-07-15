import axios, { AxiosInstance } from 'axios';
import { MoodleApiResponse, CreativeCourse, PaginatedResponse } from '@/types/moodle';

// Configuration
const MOCK_API_BASE = '/api/mock';
const REAL_API_BASE = process.env.NEXT_PUBLIC_MOODLE_URL || 'http://localhost:8080';
const WS_TOKEN = process.env.NEXT_PUBLIC_MOODLE_TOKEN || 'placeholder_token';
const USE_MOCK_API = process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_MOODLE_URL;

interface MoodleConfig {
  baseURL: string;
  token: string;
  timeout: number;
}

class MoodleApiService {
  private axios: AxiosInstance;
  private config: MoodleConfig;

  constructor() {
    this.config = {
      baseURL: USE_MOCK_API ? MOCK_API_BASE : `${REAL_API_BASE}/webservice/rest/server.php`,
      token: WS_TOKEN,
      timeout: 10000
    };

    this.axios = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Request interceptor for logging and token injection
    this.axios.interceptors.request.use(
      (config) => {
        console.log(`[Moodle API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[Moodle API] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.axios.interceptors.response.use(
      (response) => {
        if (response.data.exception) {
          throw new Error(`Moodle API Error: ${response.data.exception.message}`);
        }
        return response;
      },
      (error) => {
        console.error('[Moodle API] Response error:', error);
        return Promise.reject(error);
      }
    );
  }

  // Course-related methods
  async getCourses(): Promise<CreativeCourse[]> {
    try {
      if (USE_MOCK_API) {
        const response = await this.axios.get('/courses', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'core_course_get_courses'
          }
        });
        return response.data.data;
      } else {
        // Real Moodle API call
        const response = await this.axios.get('', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'core_course_get_courses',
            moodlewsrestformat: 'json'
          }
        });
        return response.data;
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      throw error;
    }
  }

  async getEnrolledCourses(classification: 'inprogress' | 'future' | 'past' = 'inprogress'): Promise<CreativeCourse[]> {
    try {
      if (USE_MOCK_API) {
        const response = await this.axios.post('/courses', {
          wstoken: this.config.token,
          wsfunction: 'core_course_get_enrolled_courses_by_timeline_classification',
          classification
        });
        return response.data.data.courses;
      } else {
        const response = await this.axios.post('', {
          wstoken: this.config.token,
          wsfunction: 'core_course_get_enrolled_courses_by_timeline_classification',
          moodlewsrestformat: 'json',
          classification
        });
        return response.data.courses;
      }
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error);
      throw error;
    }
  }

  async getCourseContent(courseId: string): Promise<any> {
    try {
      if (USE_MOCK_API) {
        const response = await this.axios.get('/content', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'core_course_get_contents',
            courseid: courseId
          }
        });
        return response.data.data;
      } else {
        const response = await this.axios.get('', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'core_course_get_contents',
            moodlewsrestformat: 'json',
            courseid: courseId
          }
        });
        return response.data;
      }
    } catch (error) {
      console.error('Failed to fetch course content:', error);
      throw error;
    }
  }

  // Forum-related methods
  async getForums(courseIds?: string[]): Promise<any[]> {
    try {
      if (USE_MOCK_API) {
        const response = await this.axios.get('/forums', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'mod_forum_get_forums_by_courses',
            courseids: courseIds?.join(',') || ''
          }
        });
        return response.data.data;
      } else {
        const response = await this.axios.get('', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'mod_forum_get_forums_by_courses',
            moodlewsrestformat: 'json',
            'courseids[0]': courseIds?.[0] || ''
          }
        });
        return response.data;
      }
    } catch (error) {
      console.error('Failed to fetch forums:', error);
      throw error;
    }
  }

  async getForumDiscussions(forumId: number, page = 0, perPage = 10): Promise<any> {
    try {
      if (USE_MOCK_API) {
        const response = await this.axios.post('/forums', {
          wstoken: this.config.token,
          wsfunction: 'mod_forum_get_forum_discussions',
          forumid: forumId,
          sortby: 'timemodified',
          sortdirection: 'DESC',
          page,
          perpage: perPage
        });
        return response.data.data;
      } else {
        const response = await this.axios.post('', {
          wstoken: this.config.token,
          wsfunction: 'mod_forum_get_forum_discussions',
          moodlewsrestformat: 'json',
          forumid: forumId,
          sortby: 'timemodified',
          sortdirection: 'DESC',
          page,
          perpage: perPage
        });
        return response.data;
      }
    } catch (error) {
      console.error('Failed to fetch forum discussions:', error);
      throw error;
    }
  }

  // Student submissions and portfolio methods
  async getStudentSubmissions(courseId?: string): Promise<any[]> {
    try {
      if (USE_MOCK_API) {
        const response = await this.axios.get('/submissions', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'mod_assign_get_submissions',
            courseid: courseId
          }
        });
        return response.data.data;
      } else {
        // Real API implementation would go here
        const response = await this.axios.get('', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'mod_assign_get_submissions',
            moodlewsrestformat: 'json',
            assignmentids: courseId
          }
        });
        return response.data;
      }
    } catch (error) {
      console.error('Failed to fetch student submissions:', error);
      throw error;
    }
  }

  // Creative-specific methods (custom extensions)
  async getFeaturedWorks(): Promise<any[]> {
    try {
      const submissions = await this.getStudentSubmissions();
      return submissions.filter(sub => sub.featured);
    } catch (error) {
      console.error('Failed to fetch featured works:', error);
      throw error;
    }
  }

  async getStudentPortfolio(studentId: string): Promise<any> {
    try {
      if (USE_MOCK_API) {
        const portfolios = await import('../../../../mocks/student-submissions.json');
        return portfolios.studentPortfolios.find((p: any) => p.studentId === studentId) || null;
      } else {
        // Real API implementation
        const response = await this.axios.get('', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'core_user_get_users_by_field',
            moodlewsrestformat: 'json',
            field: 'id',
            'values[0]': studentId
          }
        });
        return response.data[0];
      }
    } catch (error) {
      console.error('Failed to fetch student portfolio:', error);
      throw error;
    }
  }

  // Utility methods
  async testConnection(): Promise<boolean> {
    try {
      if (USE_MOCK_API) {
        const response = await this.axios.get('/courses', {
          params: { wstoken: this.config.token }
        });
        return response.status === 200;
      } else {
        const response = await this.axios.get('', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'core_webservice_get_site_info',
            moodlewsrestformat: 'json'
          }
        });
        return response.status === 200;
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  // Configuration getters
  get isUsingMockApi(): boolean {
    return USE_MOCK_API;
  }

  get apiBaseUrl(): string {
    return this.config.baseURL;
  }
}

// Export singleton instance
export const moodleApi = new MoodleApiService();
export default moodleApi;