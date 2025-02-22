'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navbarContent } from '@/lib/data';
import { HiMenuAlt3 } from 'react-icons/hi';
import { getCookies } from '@/modules/cookies';
import { ENV } from '@/configs/environment';
import { MdDashboard } from 'react-icons/md';
import { IoLogIn } from 'react-icons/io5';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [hash, setHash] = useState('/');
  const path = usePathname();

  const toggleMenu = () => {
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await getCookies(ENV.TOKEN_KEY);
      token ? setIsLoggedIn(true) : setIsLoggedIn(false);
    };
    checkToken();

    path.startsWith('/artikel') && setHash('/artikel');

    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
      if (!path.startsWith('/artikel')) {
        window.scrollY >= 0 && setHash('/');
        window.scrollY > 900 && setHash('/artikel');
        window.scrollY > 1700 && setHash('/#tentang-kami');
        window.scrollY > 3400 && setHash('/#kepengurusan');
        window.scrollY > 4150 && setHash('/#galeri');
        window.scrollY > 6400 && setHash('/#akademik');
        window.scrollY > 6780 && setHash('/#kontak');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className={`sticky top-3 mx-3 z-50 h-16 justify-center transition-all ${isScrolled ? 'bg-slate-100 border-slate-300 border-2 rounded-full mx-3 top-3 drop-shadow-md' : 'bg-[F0F0F0]'}`}
    >
      <div className='flex h-16 px-10 items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/icons/FTKIcon.png'
            width={50}
            height={50}
            alt='logo ftk'
          />
          <h1 className='font-secondary text-2xl font-black text-yellow-main'>
            BEM FTK
          </h1>
        </Link>

        {/* Menu for desktop view */}
        <div className='hidden xl:flex gap-x-4'>
          {navbarContent.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`flex h-fit w-fit items-center justify-center px-4 py-2 font-secondary text-base font-medium text-base-nav hover:border-b-[3px] select-none hover:text-yellow-main border-yellow-main transition-all ${hash === item.link ? 'border-b-[3px]' : ''}`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Menu for mobile view */}
        <div className='xl:hidden'>
          <button
            onClick={toggleMenu}
            className='flex h-8 w-8 items-center justify-center'
          >
            <HiMenuAlt3 className='h-8 w-8 text-base-nav' />
          </button>
        </div>
      </div>

      {isOpened && (
        <div className='xl:hidden flex flex-col gap-y-4 bg-white rounded-xl w-full py-4'>
          {navbarContent.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className='flex h-fit w-full items-center justify-center px-4 py-2 font-secondary text-base font-medium text-base-nav hover:text-yellow-main transition-all'
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Navbar;
