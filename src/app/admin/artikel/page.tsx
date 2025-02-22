'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import ArticleSection from '@/components/dashboard/ArticleSection';

const Dashboard = () => {
  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <Sidebar />
      <ArticleSection />
    </div>
  );
};

export default Dashboard;
