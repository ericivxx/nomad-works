
import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  email: string;
  fullName?: string | null;
  gender?: string | null;
  location?: string | null;
  savedJobs?: string[];
}

interface AuthResponse {
  user: User;
}

interface CheckEmailResponse {
  exists: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Fetch session on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await apiRequest<AuthResponse>('/api/auth/session', {
          method: 'GET'
        });
        
        if (response && response.user) {
          setUser(response.user);
        }
      } catch (error) {
        // Session not found or expired, user is not logged in
        console.log('No active session');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiRequest<AuthResponse>('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response && response.user) {
        setUser(response.user);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        return true;
      }
      return false;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.status === 401 
          ? "Invalid email or password. Please try again." 
          : "An error occurred. Please try again later.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData: {
    email: string;
    password: string;
    username: string;
    fullName?: string;
    gender?: string;
    location?: string;
  }) => {
    setLoading(true);
    try {
      const response = await apiRequest<AuthResponse>('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (response && response.user) {
        setUser(response.user);
        toast({
          title: "Registration successful",
          description: "Your account has been created.",
        });
        return true;
      }
      return false;
    } catch (error: any) {
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.status === 409) {
        errorMessage = "This email is already registered. Please login instead.";
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check if email exists
  const checkEmailExists = async (email: string) => {
    try {
      const response = await apiRequest<CheckEmailResponse>('/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      return response?.exists || false;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await apiRequest('/api/auth/logout', {
        method: 'POST',
      });
      
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  return { 
    user, 
    setUser,
    loading, 
    isAuthenticated: !!user, 
    login, 
    register, 
    logout, 
    checkEmailExists 
  };
}
