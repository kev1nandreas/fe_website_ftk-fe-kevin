'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import ArticleSection from '@/components/dashboard/ArticleSection';
import { useRouter } from 'next/navigation';
import Authenticating from '@/app/authenticating';
import 'react-toastify/dist/ReactToastify.css';
import Confirmation from '@/components/dashboard/Confirmation';

const Dashboard = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Use null initially to represent "loading" state

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');

      return;
    }

    setIsLoggedIn(true);
  }, [router]);

  if (isLoggedIn === null) {
    // If the state is still null, we show the Authenticating component
    return <Authenticating />;
  }

  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <Sidebar />
      <ArticleSection />
    </div>
  );
};

export default Dashboard;
