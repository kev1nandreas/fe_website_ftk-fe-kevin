'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { Slide, toast, ToastContainer } from 'react-toastify';

interface DecodedToken {
  userId: string;
  username: string;
  role: string;
}

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          localStorage.clear();
          const token = data.data.accessToken;
          localStorage.setItem('token', token);
          const decodedToken = jwtDecode<DecodedToken>(token);

          localStorage.setItem('userId', decodedToken.userId);
          localStorage.setItem('username', decodedToken.username);
          localStorage.setItem('role', decodedToken.role);

          toast.success('Log In Success', {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Slide,
          });

          router.push('/login/dashboard');
        } else {
          toast.warn(data.message, {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Slide,
          });
        }
      } else if (response.status === 401) {
        const data = await response.json();
        toast.warn(data.message, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });
      } else {
        toast.error('Internal server error', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });
      }
    } catch (error) {
      toast.error('Network error', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
    }
  };

  return (
    <main className='h-full w-full'>
      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        limit={2}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Slide}
      />

      <div className='flex flex-col md:flex-row w-full'>
        <div className='relative hidden md:block md:h-screen md:w-2/4'>
          <Image
            src='/images/login.jpg'
            width={670}
            height={1024}
            className='w-full h-full'
            alt='Login Side Design'
          />
          <button
            type='button'
            onClick={() => router.push('/')}
            className='absolute left-5 top-10 flex h-fit w-fit items-center justify-center rounded-full bg-white p-2 hover:bg-gray-100'
          >
            <Image
              src='/icons/arrow-left-black.svg'
              width={24}
              height={24}
              alt='Back'
            />
          </button>
        </div>

        {/* Form Login */}
        <div className='flex w-full md:w-2/3 items-center justify-center p-8'>
          <form
            className='flex flex-col w-full max-w-lg gap-y-8 md:gap-y-12 text-base-dark'
            onSubmit={handleSubmit}
          >
            <div className='flex items-center gap-x-3'>
              <h1 className='font-secondary text-2xl md:text-4xl font-black'>
                BEM FTK
              </h1>
              <Image
                src='/icons/FTKIcon.png'
                width={48}
                height={48}
                className='md:w-[65px] md:h-[65px]'
                alt='Logo Kabinet'
              />
            </div>
            <div className='flex w-full flex-col gap-y-2 md:gap-y-3'>
              <h1 className='w-full font-primary text-3xl md:text-[64px] font-bold'>
                MASUK
              </h1>
              <p className='w-full font-secondary text-sm md:text-base font-normal'>
                Silahkan masuk informasi login untuk mengakses akun
              </p>
            </div>
            <div className='flex flex-col gap-y-4 md:gap-y-6'>
              {/* Username */}
              <div className='flex flex-col gap-y-1'>
                <label className='font-secondary text-lg md:text-xl font-semibold'>
                  Username
                </label>
                <input
                  type='text'
                  placeholder='Masukkan Username'
                  required
                  className='mt-2 h-10 md:h-12 w-full rounded-lg border-2 border-gray-300 px-4 focus:border-blue-500 focus:outline-none'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className='flex flex-col gap-y-1'>
                <label className='font-secondary text-lg md:text-xl font-semibold'>
                  Password
                </label>
                <input
                  type='password'
                  placeholder='Masukkan Password'
                  required
                  className='mt-2 h-10 md:h-12 w-full rounded-lg border-2 border-gray-300 px-4 focus:border-blue-500 focus:outline-none'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type='submit'
              className='flex w-full items-center justify-center rounded-md bg-yellow-main hover:bg-yellow-500 transition-all py-2 font-secondary text-lg font-normal text-black'
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Page;
