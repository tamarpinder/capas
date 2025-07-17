import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import moodleApi from '@/services/moodleApi';

interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  department: string;
  profileimageurlsmall: string;
  profileimageurl: string;
  preferences: Array<{
    name: string;
    value: string;
  }>;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  
  // Actions
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,

        // Actions
        login: async (username: string, password: string) => {
          try {
            set({ loading: true, error: null });
            
            // Mock authentication - in real implementation this would call Moodle auth API
            if (moodleApi.isUsingMockApi) {
              // Simulate authentication delay
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              // Mock successful login
              if (username && password) {
                const user = await moodleApi.getCurrentUser();
                set({ 
                  user, 
                  isAuthenticated: true, 
                  loading: false 
                });
                return true;
              } else {
                throw new Error('Invalid credentials');
              }
            } else {
              // Real authentication would happen here
              const response = await fetch(`${moodleApi.apiBaseUrl}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                  username,
                  password,
                  service: 'moodle_mobile_app'
                })
              });
              
              if (response.ok) {
                const data = await response.json();
                if (data.token) {
                  const user = await moodleApi.getCurrentUser();
                  set({ 
                    user, 
                    isAuthenticated: true, 
                    loading: false 
                  });
                  return true;
                }
              }
              throw new Error('Authentication failed');
            }
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Login failed',
              loading: false,
              isAuthenticated: false,
              user: null
            });
            return false;
          }
        },

        logout: () => {
          set({ 
            user: null, 
            isAuthenticated: false, 
            error: null 
          });
        },

        fetchCurrentUser: async () => {
          try {
            set({ loading: true, error: null });
            const user = await moodleApi.getCurrentUser();
            set({ 
              user, 
              isAuthenticated: true, 
              loading: false 
            });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch user data',
              loading: false 
            });
          }
        },

        updateProfile: async (updates: Partial<User>) => {
          try {
            set({ loading: true, error: null });
            
            // In real implementation, this would call Moodle update API
            const { user } = get();
            if (user) {
              const updatedUser = { ...user, ...updates };
              set({ 
                user: updatedUser, 
                loading: false 
              });
            }
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to update profile',
              loading: false 
            });
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: 'user-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'user-store',
    }
  )
);

export default useUserStore;