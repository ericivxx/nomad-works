
import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  savedSearches: string[];
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  saveSearch: (search: string) => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  saveSearch: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated via Replit Auth
    fetch('/api/auth/user')
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const saveSearch = async (search: string) => {
    if (!user) return;
    
    const res = await fetch('/api/user/searches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ search }),
    });
    
    if (res.ok) {
      const data = await res.json();
      setUser(prev => prev ? { ...prev, savedSearches: data.savedSearches } : null);
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, saveSearch }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
