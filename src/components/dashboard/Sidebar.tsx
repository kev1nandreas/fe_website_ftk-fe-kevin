'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { TbCategoryFilled } from 'react-icons/tb';
import { BiLogOut } from 'react-icons/bi';
import { useLogout } from '@/app/login/api/useLogout';
import toast from 'react-hot-toast';
import { PATH } from '@/shared/path';
import { ConfirmationLogOut } from './Confirmation';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const mutation = useLogout({
    onSuccess: () => {
      router.push(PATH.PUBLIC_BASE);
      toast.success('Berhasil keluar');
    },
    onError: () => {
      toast.error('Gagal keluar. Silahkan coba lagi');
      setLoading(false);
    },
  });

  const handleLogout = async () => {
    setLoading(true);
    await mutation.mutateAsync();
    setLoading(false);
  };

  return (
    <>
      {/* Confirmation Log Out */}
      {showConfirm && (
        <ConfirmationLogOut
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleLogout}
        />
      )}

      {/* Tombol Hamburger untuk Mobile */}
      <div className='flex items-center justify-between bg-white px-4 py-2 sm:hidden'>
        <Image
          src='/icons/FTKIcon.png'
          width={40}
          height={40}
          alt='Logo Kabinet'
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='text-xl text-yellow-main'
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } w-full flex-col gap-y-6 bg-white px-4 py-6 sm:relative sm:flex sm:w-1/5 sm:px-6 sm:py-10`}
      >
        <div className='flex justify-end sm:hidden'>
          <button
            onClick={() => setIsOpen(false)}
            className='text-xl text-yellow-main'
          >
            <FaTimes />
          </button>
        </div>

        <Link
          href='/'
          className='flex w-full items-center justify-center gap-x-4'
        >
          <Image
            src='/icons/FTKIcon.png'
            width={40}
            height={40}
            alt='Logo Kabinet'
            className='md:w-[65px] md:h-[65px]'
          />
          <h1 className='w-24 font-primary text-lg font-extrabold text-base-dark sm:w-28 sm:text-xl'>
            Bentang Layar
          </h1>
        </Link>

        <div className='h-full w-full'>
          <Link
            href='/admin/artikel'
            className='flex w-full items-center gap-x-3 rounded-md px-4 py-3 hover:bg-base-gray sm:gap-x-4 sm:px-5'
          >
            <MdSpaceDashboard className='scale-[1.5] fill-yellow-main sm:scale-[1.75] hidden md:block' />
            <p className='font-secondary text-sm font-semibold text-yellow-main sm:text-lg'>
              Artikel
            </p>
          </Link>

          <Link
            href='/admin/kategori'
            className='flex w-full items-center gap-x-3 rounded-md px-4 py-3 hover:bg-base-gray sm:gap-x-4 sm:px-5'
          >
            <TbCategoryFilled className='scale-[1.5] fill-yellow-main sm:scale-[1.75] hidden lg:block' />
            <p className='font-secondary text-sm font-semibold text-yellow-main sm:text-lg'>
              Kategori
            </p>
          </Link>
        </div>

        <button
          className="flex w-full items-center gap-x-3 rounded-md bg-yellow-main px-4 py-3 hover:bg-yellow-dark-1 sm:gap-x-4 sm:px-5 {loading ? 'cursor-not-allowed' : ''}"
          onClick={() => setShowConfirm(true)}
        >
          <BiLogOut className='scale-[1.25] fill-white sm:scale-[1.5]' />
          <p className='font-secondary text-sm font-normal text-white sm:text-base'>
            Keluar
          </p>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
