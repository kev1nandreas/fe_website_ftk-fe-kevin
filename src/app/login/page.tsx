'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLogin } from './api/useLogin';
import { PATH } from '@/shared/path';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { LoginInputs } from '@/types/inputs';

// Define Zod schema for form validation

const Page = () => {
  const router = useRouter();
  const loginSchema = z.object({
    username: z.string().min(1, 'Username tidak boleh kosong.'),
    password: z.string().min(1, 'Password tidak boleh kosong'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [loading, setLoading] = React.useState<boolean>(false);
  const mutation = useLogin({
    onSuccess: () => {
      toast.success('Berhasil masuk');
      router.push('/admin/artikel');
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setLoading(true);
    await mutation.mutateAsync(data);
    setLoading(false);
  });

  return (
    <main className='h-full w-full'>
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
        <div className='flex flex-col gap-4 w-full md:w-2/3 items-center justify-center p-8'>
          <form
            className='flex flex-col w-full max-w-lg gap-y-8 md:gap-y-12 text-base-dark'
            onSubmit={onSubmit}
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
                Silahkan masukkan informasi untuk mengakses akun
              </p>
            </div>
            <div className='flex flex-col gap-y-4 md:gap-y-6'>
              {/* Username */}
              <div className='flex flex-col gap-y-1'>
                <label className='font-secondary text-lg md:text-xl font-semibold'>
                  Username
                </label>
                <Controller
                  name='username'
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type='text'
                      placeholder='Masukkan Username'
                      className='mt-2 h-10 md:h-12 w-full rounded-lg border-2 border-gray-300 px-4 focus:border-blue-500 focus:outline-none'
                    />
                  )}
                />
                {errors.username && (
                  <p className='text-red-500 text-sm'>
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className='flex flex-col gap-y-1'>
                <label className='font-secondary text-lg md:text-xl font-semibold'>
                  Password
                </label>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type='password'
                      placeholder='Masukkan Password'
                      className='mt-2 h-10 md:h-12 w-full rounded-lg border-2 border-gray-300 px-4 focus:border-blue-500 focus:outline-none'
                    />
                  )}
                />
                {errors.password && (
                  <p className='text-red-500 text-sm'>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <button
              disabled={loading}
              type='submit'
              className={`flex w-full items-center justify-center rounded-md bg-yellow-main hover:bg-yellow-500 transition-all py-2 font-secondary text-lg font-normal text-black ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {loading ? 'Memuat...' : 'Masuk'}
            </button>
          </form>

          <div>
            Lupa password Anda?{' '}
            <Link
              href={'/forget-password'}
              className='text-yellow-500 hover:text-yellow-600 font-semibold'
            >
              Reset Passsword
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
