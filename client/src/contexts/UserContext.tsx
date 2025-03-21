import React, { createContext, useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';

interface User {
  id: number;
  email: string;
  fullName?: string | null;
  gender?: string | null;
  location?: string | null;
  savedSearches?: string[];
  savedJobs?: string[];
  role?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    username: string;
    fullName?: string;
    gender?: string;
    location?: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  checkEmailExists: (email: string) => Promise<boolean>;
  saveJob: (jobSlug: string) => Promise<boolean>;
  unsaveJob: (jobSlug: string) => Promise<boolean>;
  isJobSaved: (jobSlug: string) => boolean;
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; token?: string }>;
  resetPassword: (token: string, newPassword: string, confirmPassword: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [, navigate] = useLocation();

  const handleLogin = async (email: string, password: string) => {
    const success = await auth.login(email, password);
    if (success) {
      navigate('/profile');
    }
    return success;
  };

  const handleRegister = async (userData: {
    email: string;
    password: string;
    username: string;
    fullName?: string;
    gender?: string;
    location?: string;
  }) => {
    const success = await auth.register(userData);
    if (success) {
      navigate('/profile');
    }
    return success;
  };
  
  const saveJob = async (jobSlug: string): Promise<boolean> => {
    if (!auth.isAuthenticated || !auth.user) {
      return false;
    }
    
    try {
      const response = await fetch('/api/auth/save-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobSlug }),
      });
      
      if (!response.ok) {
        return false;
      }
      
      const result = await response.json();
      
      // Update the user object with the updated savedJobs array
      if (result.success && result.user) {
        // We update the auth user with the returned user that includes the savedJobs
        auth.setUser(result.user);
      }
      
      return result.success;
    } catch (error) {
      console.error('Error saving job:', error);
      return false;
    }
  };
  
  const unsaveJob = async (jobSlug: string): Promise<boolean> => {
    if (!auth.isAuthenticated || !auth.user) {
      return false;
    }
    
    try {
      const response = await fetch('/api/auth/unsave-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobSlug }),
      });
      
      if (!response.ok) {
        return false;
      }
      
      const result = await response.json();
      
      // Update the user object with the updated savedJobs array
      if (result.success && result.user) {
        // We update the auth user with the returned user that includes the savedJobs
        auth.setUser(result.user);
      }
      
      return result.success;
    } catch (error) {
      console.error('Error unsaving job:', error);
      return false;
    }
  };
  
  const isJobSaved = (jobSlug: string): boolean => {
    if (!auth.user || !auth.user.savedJobs) {
      return false;
    }
    
    return auth.user.savedJobs.includes(jobSlug);
  };

  return (
    <UserContext.Provider 
      value={{
        user: auth.user,
        loading: auth.loading,
        isAuthenticated: auth.isAuthenticated,
        login: handleLogin,
        register: handleRegister,
        logout: auth.logout,
        checkEmailExists: auth.checkEmailExists,
        saveJob,
        unsaveJob,
        isJobSaved,
        changePassword: auth.changePassword,
        requestPasswordReset: auth.requestPasswordReset,
        resetPassword: auth.resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}