import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CreativeCourse } from '@/types/moodle';
import moodleApi from '@/services/moodleApi';

interface CourseState {
  courses: CreativeCourse[];
  currentCourse: CreativeCourse | null;
  assignments: unknown[];
  forums: unknown[];
  courseContent: unknown[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchCourses: () => Promise<void>;
  fetchEnrolledCourses: (classification?: 'inprogress' | 'future' | 'past') => Promise<void>;
  setCurrentCourse: (courseId: string) => Promise<void>;
  fetchAssignments: (courseId?: string) => Promise<void>;
  fetchForums: (courseIds?: string[]) => Promise<void>;
  fetchCourseContent: (courseId: string) => Promise<void>;
  updateAssignmentProgress: (assignmentId: string, progress: number) => void;
  clearError: () => void;
}

export const useCourseStore = create<CourseState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        courses: [],
        currentCourse: null,
        assignments: [],
        forums: [],
        courseContent: [],
        loading: false,
        error: null,

        // Actions
        fetchCourses: async () => {
          try {
            set({ loading: true, error: null });
            const courses = await moodleApi.getCourses();
            set({ courses, loading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch courses',
              loading: false 
            });
          }
        },

        fetchEnrolledCourses: async (classification = 'inprogress') => {
          try {
            set({ loading: true, error: null });
            const courses = await moodleApi.getEnrolledCourses(classification);
            set({ courses, loading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch enrolled courses',
              loading: false 
            });
          }
        },

        setCurrentCourse: async (courseId: string) => {
          try {
            const { courses } = get();
            const currentCourse = courses.find(course => course.id === courseId) || null;
            set({ currentCourse });
            
            if (currentCourse) {
              // Fetch related data for the current course
              await Promise.all([
                get().fetchAssignments(courseId),
                get().fetchCourseContent(courseId),
                get().fetchForums([courseId])
              ]);
            }
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to set current course'
            });
          }
        },

        fetchAssignments: async (courseId?: string) => {
          try {
            const assignments = await moodleApi.getAssignments(courseId);
            set({ assignments });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch assignments'
            });
          }
        },

        fetchForums: async (courseIds?: string[]) => {
          try {
            const forums = await moodleApi.getDetailedForums(courseIds);
            set({ forums });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch forums'
            });
          }
        },

        fetchCourseContent: async (courseId: string) => {
          try {
            const courseContent = await moodleApi.getDetailedCourseContent(courseId);
            set({ courseContent });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch course content'
            });
          }
        },

        updateAssignmentProgress: (assignmentId: string, progress: number) => {
          set((state) => ({
            assignments: state.assignments.map(assignment => 
              assignment.id === assignmentId 
                ? { ...assignment, progress }
                : assignment
            )
          }));
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: 'course-store',
        partialize: (state) => ({
          courses: state.courses,
          currentCourse: state.currentCourse,
          assignments: state.assignments,
          forums: state.forums,
          courseContent: state.courseContent,
        }),
      }
    ),
    {
      name: 'course-store',
    }
  )
);

export default useCourseStore;