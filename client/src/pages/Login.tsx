
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useUser } from '@/contexts/UserContext';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useUser();
  const [error, setError] = useState('');
  const emailFromUrl = new URLSearchParams(window.location.search).get('email') || '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    try {
      await login({
        email: emailFromUrl || (form.email as HTMLInputElement).value,
        password: (form.password as HTMLInputElement).value,
      });
      setLocation('/profile');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              defaultValue={emailFromUrl}
              required 
              className="w-full p-2 border rounded" 
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input type="password" name="password" required className="w-full p-2 border rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
