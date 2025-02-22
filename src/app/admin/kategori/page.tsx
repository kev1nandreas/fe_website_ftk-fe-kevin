'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import CategorySection from '@/components/dashboard/CategorySection';

const Category = () => {
  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <Sidebar />
      <CategorySection />
    </div>
  );
};

export default Category;
