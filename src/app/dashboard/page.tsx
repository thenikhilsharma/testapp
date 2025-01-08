// app/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './dashboard.css';

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
      // console.log('Token:', token);

      if (!token) {
        alert("Sign-In failed please try again")
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

        // console.log('Response:', response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        alert('SignIn verification failed. Please try again')
        setError('Token verification failed.');
        router.push('/signin'); // Redirect to sign-in if token verification fails
      }
    };

    verifyToken();
  }, [router]);

  if (user?.username && user.username.split('_')[0] === "admin") {
    router.push('/admin');
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='dashboardContainer'>
      <h1>Welcome, {user.username}!</h1>
      <p>GET Track of your Academic Progress</p>
      <Link href={`/userCourses/${user.username}`}>
        <p className='courseBtn'>Check Courses</p>
      </Link>
    </div>
  );
}