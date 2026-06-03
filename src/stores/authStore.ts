import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { User } from '@/src/types/user';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setAuth: (accessToken: string, refreshToken: string, user: User) => void;
    clearAuth: () => void;
  setAccessToken: (token: string) => void;
}

type AuthStore = AuthState & AuthActions;

// SecureStore adapter for Zustand persist middleware
const secureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const value = await SecureStore.getItemAsync(name);
      return value;
    } catch (error) {
      console.error(`Error getting item ${name} from SecureStore:`, error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (error) {
      console.error(`Error setting item ${name} in SecureStore:`, error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (error) {
      console.error(`Error removing item ${name} from SecureStore:`, error);
    }
  },
};

// Create the store with persistence
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      // Actions
      setAuth: (accessToken: string, refreshToken: string, user: User) => {
        set({
          accessToken,
          refreshToken,
          user,
          isAuthenticated: true,
        });
      },

      clearAuth: () => {
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
      },

      setAccessToken: (token: string) => {
        set({ accessToken: token });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);

// Non-hook version for use in axios interceptors
export const authStore = {
  getState: () => useAuthStore.getState(),
  setState: (state: Partial<AuthStore>) => useAuthStore.setState(state),
  subscribe: (listener: (state: AuthStore) => void) => useAuthStore.subscribe(listener),
};
