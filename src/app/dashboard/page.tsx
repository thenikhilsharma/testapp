// app/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  interface User {
    username: string;
    // add other properties if needed
  }

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      if (!token) {
        router.push('/signin'); // Redirect to sign-in if no token is found
        console.log('No token found');
      }

      try {
        const response = await fetch('/api/auth/verifyToken', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Response:', response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        setError('Token verification failed.');
        router.push('/signin'); // Redirect to sign-in if token verification fails
      }
    };

    verifyToken();
  }, [router]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>This is a protected page.</p>
    </div>
  );
}