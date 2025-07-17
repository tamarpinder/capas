import axios, { AxiosInstance } from 'axios';
import { CreativeCourse } from '@/types/moodle';

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
        // Simulate realistic API delay
        await this.simulateDelay(300, 800);
        
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

  // Utility methods
  private async simulateDelay(minMs: number = 200, maxMs: number = 600): Promise<void> {
    if (USE_MOCK_API) {
      const delay = Math.random() * (maxMs - minMs) + minMs;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // Assignment-related methods
  async getAssignments(courseId?: string): Promise<unknown[]> {
    try {
      if (USE_MOCK_API) {
        await this.simulateDelay(300, 700);
        const assignmentsData = await import('../../../../mocks/moodle-api-responses/assignments.json');
        let assignments = assignmentsData.assignments;
        
        if (courseId) {
          assignments = assignments.filter((assignment: { course: number }) => assignment.course.toString() === courseId);
        }
        
        return assignments;
      } else {
        const response = await this.axios.get('', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'mod_assign_get_assignments',
            moodlewsrestformat: 'json',
            courseids: courseId ? [courseId] : []
          }
        });
        return response.data.courses?.[0]?.assignments || [];
      }
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
      throw error;
    }
  }

  async getDetailedCourseContent(courseId: string): Promise<unknown> {
    try {
      if (USE_MOCK_API) {
        await this.simulateDelay(400, 900);
        const courseContentData = await import('../../../../mocks/moodle-api-responses/course-content.json');
        return courseContentData.courseContent;
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
      console.error('Failed to fetch detailed course content:', error);
      throw error;
    }
  }

  async getDetailedForums(courseIds?: string[]): Promise<unknown[]> {
    try {
      if (USE_MOCK_API) {
        await this.simulateDelay(350, 750);
        const forumsData = await import('../../../../mocks/moodle-api-responses/forums.json');
        let forums = forumsData.forums;
        
        if (courseIds && courseIds.length > 0) {
          forums = forums.filter((forum: { course: number }) => 
            courseIds.includes(forum.course.toString())
          );
        }
        
        return forums;
      } else {
        const response = await this.axios.get('', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'mod_forum_get_forums_by_courses',
            moodlewsrestformat: 'json',
            ...courseIds?.reduce((acc, id, index) => ({
              ...acc,
              [`courseids[${index}]`]: id
            }), {})
          }
        });
        return response.data;
      }
    } catch (error) {
      console.error('Failed to fetch detailed forums:', error);
      throw error;
    }
  }

  // User and enrollment methods
  async getCurrentUser(): Promise<unknown> {
    try {
      if (USE_MOCK_API) {
        await this.simulateDelay(200, 400);
        return {
          id: 15,
          username: 'sophia.chen',
          firstname: 'Sophia',
          lastname: 'Chen',
          fullname: 'Sophia Chen',
          email: 'sophia.chen@capas.edu.bs',
          department: 'Music Performance',
          profileimageurlsmall: '/user/sophia-chen-small.jpg',
          profileimageurl: '/user/sophia-chen.jpg',
          preferences: [
            { name: 'auth_forcepasswordchange', value: '0' },
            { name: 'email_bounce_count', value: '0' },
            { name: 'email_send_count', value: '0' }
          ]
        };
      } else {
        const response = await this.axios.get('', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'core_webservice_get_site_info',
            moodlewsrestformat: 'json'
          }
        });
        return response.data;
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw error;
    }
  }

  async getGrades(courseId?: string): Promise<unknown[]> {
    try {
      if (USE_MOCK_API) {
        await this.simulateDelay(400, 800);
        return [
          {
            courseid: 301,
            coursename: '3D Digital Sculpture',
            grades: [
              {
                itemname: 'Conch Shell Digital Recreation',
                grade: '92.00',
                gradeformatted: 'A-',
                feedback: 'Excellent attention to cultural detail and technical execution.',
                dategraded: 1708041600
              },
              {
                itemname: 'Junkanoo Mask Digital Sculpture',
                grade: null,
                gradeformatted: '-',
                feedback: null,
                dategraded: null
              }
            ]
          }
        ];
      } else {
        const response = await this.axios.get('', {
          params: {
            wstoken: this.config.token,
            wsfunction: 'gradereport_user_get_grade_items',
            moodlewsrestformat: 'json',
            courseid: courseId
          }
        });
        return response.data.usergrades;
      }
    } catch (error) {
      console.error('Failed to fetch grades:', error);
      throw error;
    }
  }

  // Resource and content methods
  async getResources(courseId?: string): Promise<unknown[]> {
    try {
      if (USE_MOCK_API) {
        await this.simulateDelay(300, 600);
        return [
          {
            id: 1,
            name: 'Course Introduction and Syllabus',
            type: 'resource',
            url: '/mock/content/ART301_Syllabus_Fall2024.pdf',
            description: 'Complete course overview including projects, expectations, and cultural focus.',
            timemodified: 1703097600,
            course: courseId || '301'
          },
          {
            id: 2,
            name: 'Sculpting Brush Reference Guide',
            type: 'resource', 
            url: '/mock/content/Sculpting_Brush_Reference_Guide.pdf',
            description: 'Comprehensive reference guide covering all essential sculpting brushes.',
            timemodified: 1703184000,
            course: courseId || '301'
          },
          {
            id: 3,
            name: 'Cultural Heritage Video Lecture',
            type: 'url',
            url: '/mock/videos/bahamian_heritage_intro.mp4',
            description: 'Explore the rich artistic traditions of the Bahamas.',
            timemodified: 1703097600,
            course: courseId || '301'
          }
        ];
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
      console.error('Failed to fetch resources:', error);
      throw error;
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