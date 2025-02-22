'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PATH } from '@/shared/path';
import toast from 'react-hot-toast';
import { resetPassword } from '../api/useForgetPassword';
import usePagination from '@mui/material/usePagination/usePagination';

// Define Zod schema for form validation
const resetPasswordSchema = z
  .object({
    password: z.string().min(1, 'Password tidak boleh kosong.'),
    confirmPassword: z
      .string()
      .min(1, 'Konfirmasi password tidak boleh kosong.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak sama.',
    path: ['confirmPassword'],
  });

type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;

const Page = () => {
  const router = useRouter();
  const token = useParams().token as string;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const [loading, setLoading] = React.useState<boolean>(false);
  const mutation = resetPassword({
    onSuccess: () => {
      toast.success('Password berhasil direset');
      router.push(PATH.LOGIN);
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const withTokenData = { ...data, token };
    console.log(withTokenData);
    await mutation.mutateAsync(withTokenData);
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

        {/* Form Login */}
        <div className='flex w-full md:w-2/3 items-center justify-center p-8'>
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
            <div className='flex w-full flex-col gap-y-4 md:gap-y-6'>
              <h1 className='w-full font-primary text-3xl md:text-[64px] font-bold'>
                Reset Password
              </h1>
              <p className='w-full font-secondary text-sm md:text-base font-normal'>
                Silakan masukkan pasword baru anda untuk melakukan reset password.
              </p>
            </div>
            <div className='flex flex-col gap-y-4 md:gap-y-6'>
              {/* New Password */}
              <div className='flex flex-col gap-y-1'>
                <label className='font-secondary text-lg md:text-xl font-semibold'>
                  Password Baru
                </label>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type='password'
                      placeholder='Masukkan password baru Anda'
                      className='mt-2 h-10 md:h-12 w-full rounded-lg border-2 border-gray-300 px-4 focus:border-blue-500 focus:outline-none'
                    />
                  )}
                />
                {errors.password && (
                  <p className='text-red-500 text-sm'>{errors?.password?.message}</p>
                )}
              </div>
              
              {/* Confirm New Password */}
              <div className='flex flex-col gap-y-1'>
                <label className='font-secondary text-lg md:text-xl font-semibold'>
                  Konfirmasi Password Baru
                </label>
                <Controller
                  name='confirmPassword'
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type='password'
                      placeholder='Masukkan lagi password baru Anda'
                      className='mt-2 h-10 md:h-12 w-full rounded-lg border-2 border-gray-300 px-4 focus:border-blue-500 focus:outline-none'
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <p className='text-red-500 text-sm'>{errors?.confirmPassword?.message}</p>
                )}
              </div>

            </div>
            <button
              disabled={loading}
              type='submit'
              className={`flex w-full items-center justify-center rounded-md bg-yellow-main hover:bg-yellow-500 transition-all py-2 font-secondary text-lg font-normal text-black ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {loading ? 'Memuat...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Page;
