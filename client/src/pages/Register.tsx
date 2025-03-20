import { useState } from 'react';
import { useLocation } from 'wouter';
import { useUser } from '@/contexts/UserContext';

export default function Register() {
  const [, setLocation] = useLocation();
  const { register } = useUser();
  const [error, setError] = useState('');
  const emailFromUrl = new URLSearchParams(window.location.search).get('email') || '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    try {
      await register({
        email: emailFromUrl,
        password: (form.password as HTMLInputElement).value,
        fullName: (form.fullName as HTMLInputElement).value,
        gender: (form.gender as HTMLSelectElement).value,
        location: (form.location as HTMLInputElement).value,
      });
      setError('Registration successful! Redirecting...');
      setTimeout(() => setLocation('/'), 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message;
      if (errorMessage.includes('already exists')) {
        setError('This email is already registered. Please login instead.');
        setTimeout(() => setLocation('/login'), 2000);
      } else {
        setError(errorMessage || 'Failed to register');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Complete Your Registration</h1>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input type="email" value={emailFromUrl} disabled className="w-full p-2 border rounded bg-gray-50" />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input type="password" name="password" required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">Full Name</label>
            <input type="text" name="fullName" required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">Gender</label>
            <select name="gender" required className="w-full p-2 border rounded">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Location</label>
            <input type="text" name="location" required className="w-full p-2 border rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
}