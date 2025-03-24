'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Ensure this path is correct

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password || !captcha) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    // Simulating a login process. Replace with your API call later.
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');  // Redirect to a dashboard or home page
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-lg text-center w-full sm:w-96">
        <h1 className="text-3xl font-bold mb-4">Login</h1>

        <div className="mb-4">
          <label className="block text-left text-gray-300 mb-2">Username *</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-left text-gray-300 mb-2">Password *</label>
          <input
            type="password"
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-left text-gray-300 mb-2">Captcha *</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            placeholder="Enter captcha"
          />
        </div>

        <Button
          variant="outline"
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600"
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    </div>
  );
}
