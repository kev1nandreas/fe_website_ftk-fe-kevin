'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PATH } from '@/shared/path';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { forgetPassword } from './api/useForgetPassword';

// Define Zod schema for form validation
const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email tidak boleh kosong.')
    .email('Email tidak valid.'),
});

type ForgetPasswordInputs = z.infer<typeof forgetPasswordSchema>;

const Page = () => {
  const [isVerified, setIsVerified] = useState('');
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordInputs>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const [loading, setLoading] = React.useState<boolean>(false);
  const mutation = forgetPassword({
    onSuccess: (data) => {
      toast.success('Email berhasil dikirimkan');
      setIsVerified(data.email);
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
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
        </div>

        <div className='flex flex-col gap-4 w-full md:w-2/3 items-center justify-center p-8 border-2'>
          <div className='flex flex-col w-full max-w-lg gap-y-8 md:gap-y-12 pb-8 text-base-dark'>
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
            <div className='flex w-full flex-col gap-y-4 md:gap-y-6'>
              <h1 className='w-full font-primary text-3xl md:text-[64px] font-bold'>
                Lupa Password?
              </h1>
              <p className='w-full font-secondary text-sm md:text-base font-normal'>
                Tautan untuk mereset password akan dikirimkan ke email anda.
              </p>
            </div>
          </div>

          {/* Form Login */}
          {isVerified ? (
            <div className='border-2 rounded-lg border-green-400 w-full max-w-lg flex text-base-dark justify-center items-center gap-3 p-3'>
              <MdOutlineVerifiedUser className='text-[7rem]' />
              <div className='flex flex-col gap-y-2 justify-center text-left'>
                <h3 className='text-2xl font-bold'>
                  Email Anda telah terverifikasi
                </h3>
                <p>
                  Tautan untuk melakukan reset password telah dikirimkan ke
                  alamat email <span className='font-medium'>{isVerified}</span>.
                </p>
              </div>
            </div>
          ) : (
            <form
              className='flex flex-col w-full max-w-lg gap-y-8 md:gap-y-12 text-base-dark'
              onSubmit={onSubmit}
            >
              <div className='flex flex-col gap-y-4 md:gap-y-6'>
                {/* Email */}
                <div className='flex flex-col gap-y-1'>
                  <label className='font-secondary text-lg md:text-xl font-semibold'>
                    Email
                  </label>
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type='email'
                        placeholder='Masukkan Email Anda'
                        className='mt-2 h-10 md:h-12 w-full rounded-lg border-2 border-gray-300 px-4 focus:border-blue-500 focus:outline-none'
                      />
                    )}
                  />
                  {errors.email && (
                    <p className='text-red-500 text-sm'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                disabled={loading}
                type='submit'
                className={`flex w-full items-center justify-center rounded-md bg-yellow-main hover:bg-yellow-500 transition-all py-2 font-secondary text-lg font-normal text-black ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {loading ? 'Memuat...' : 'Kirim Email'}
              </button>
            </form>
          )}

          <div>
            Kembali ke halaman login?{' '}
            <Link
              href={'/login'}
              className='text-yellow-500 hover:text-yellow-600 font-semibold'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
