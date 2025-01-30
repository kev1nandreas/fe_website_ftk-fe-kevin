'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Logo = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className='flex h-fit py-32 w-full items-center justify-center bg-white'>
      <div className='flex items-center justify-center gap-x-3 lg:gap-x-14'>
        <Image
          src='/icons/BentangLayarLogo.png'
          width={188}
          height={197}
          data-aos="fade-right"
          className='w-[150px] lg:w-[188px] object-cover'
          alt='Logo Kabinet'
        />
        {/* Nama kabinet untuk desktop view */}
        <h1 data-aos="zoom-in" className='h-fit w-fit font-primary hidden md:block md:text-[104px] font-bold leading-none text-yellow-main drop-shadow-md'>
          Bentang Layar
        </h1>

        {/* Nama kabinet untuk mobile view */}
        <div data-aos="zoom-in">
          <h1 className='h-fit w-fit font-primary text-[60px] md:hidden font-bold leading-none text-yellow-main drop-shadow-md'>
            Bentang
          </h1>
          <h1 className='h-fit w-fit font-primary text-[60px] md:hidden font-bold leading-none text-yellow-main drop-shadow-md'>
            Layar
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Logo;
