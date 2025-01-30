import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Content from '@/components/artikel/Content';
import Footer from '@/components/layout/Footer';

const ArtikelPage = () => {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <div>
        <Content />
      </div>
      <Footer />
    </div>
  );
};

export default ArtikelPage;
