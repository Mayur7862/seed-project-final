'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import "./global.css"; 

export default function WelcomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRedirect = (path: string) => {
    setLoading(true);
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome All</h1>
        <p className="mb-6 text-gray-300">This is the registration page. Choose an option to continue.</p>
        <div className="flex gap-10">
          <Button
            variant="default" 
            onClick={() => handleRedirect('/login')}
            disabled={loading}
          >
            Login
          </Button>
          <Button
            variant="default"
            onClick={() => handleRedirect('/signup')}
            disabled={loading}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
