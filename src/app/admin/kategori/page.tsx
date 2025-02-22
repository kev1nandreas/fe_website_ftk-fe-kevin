'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import CategorySection from '@/components/dashboard/CategorySection';
import { useRouter } from 'next/navigation';
import Authenticating from '@/app/authenticating';
import { Bounce, toast } from 'react-toastify';

const Category = () => {
  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <Sidebar />
      <CategorySection />
    </div>
  );
};

export default Category;
