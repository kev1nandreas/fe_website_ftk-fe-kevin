'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import CategorySection from '@/components/dashboard/CategorySection';
import { useRouter } from 'next/navigation';
import Authenticating from '@/app/authenticating';
import { Bounce, toast } from 'react-toastify';

const Category = () => {
  // check token
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    setIsLoggedIn(true);
  }, [router]);

  if (!isLoggedIn) {
    return <Authenticating />;
  }

  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <Sidebar />
      <CategorySection />
    </div>
  );
};

export default Category;
