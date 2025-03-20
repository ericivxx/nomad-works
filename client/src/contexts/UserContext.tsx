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