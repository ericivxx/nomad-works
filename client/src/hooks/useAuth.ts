
import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<{id: string; name: string} | null>(null);

  useEffect(() => {
    const userId = document.querySelector('meta[name="user-id"]')?.getAttribute('content');
    const userName = document.querySelector('meta[name="user-name"]')?.getAttribute('content');
    
    if (userId && userName) {
      setUser({ id: userId, name: userName });
    }
  }, []);

  return { user, isAuthenticated: !!user };
}
