'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SlideButton from './SlideButton/SlideButton';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { Suspense, useEffect } from 'react';
import Loading from '@/app/not-found';
import Link from 'next/link';

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <section className='flex mb-10 h-fit justify-center p-4'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: "url('/images/backdrop-hero.jpg')",
          opacity: 0.1,
        }}
      ></div>

      <div className='flex h-fit w-full lg:w-[1280px] flex-col gap-y-12'>
        <div
          data-aos='fade-right'
          className='mt-12 h-fit w-full font-primary text-[50px] lg:text-[64px] font-extrabold text-base-dark'
        >
          <div className='text-2xl bg-gradient-to-r from-yellow-dark-1 to-yellow-light-4 p-2 px-6 w-fit rounded-full'>
            Selamat Datang Di
          </div>
          <h1>BEM FTK ITS 2025</h1>
          <p className='text-lg font-medium max-w-[45rem]'>
            BEM FTK ITS (Badan Eksekutif Mahasiswa Fakultas Teknologi Kelautan
            Institut Teknologi Sepuluh Nopember) adalah organisasi kemahasiswaan
            yang bertujuan untuk menampung aspirasi dan memperjuangkan
            kepentingan mahasiswa di Fakultas Teknologi Kelautan ITS.
          </p>
          <Link
            href='/#postingan'
            className='flex h-fit w-[12rem] my-4 rounded-md items-center justify-center bg-gradient-to-r from-yellow-dark-1 to-yellow-light-4 hover:from-yellow-light-1 hover:to-yellow-dark-1 px-4 py-2 font-secondary text-base font-medium text-white'
          >
            Dive In
          </Link>
        </div>

        <Suspense fallback={<Loading />}>
          <div className='relative h-fit w-full'>
            <Swiper
              breakpoints={{
                320: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
              loop={true}
              centeredSlides={true}
              initialSlide={2}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              speed={2000}
              modules={[Autoplay]}
            >
              <SlideButton />
              <SwiperSlide>
                <div className='h-[300px] w-[280px] lg:h-[446px] lg:w-[400px] rounded-md overflow-hidden'>
                  <img
                    src='/images/AMS.jpg'
                    alt='Activity1'
                    className='h-full w-full object-cover'
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='h-[300px] w-[280px] lg:h-[446px] lg:w-[400px] rounded-md overflow-hidden'>
                  <img
                    src='/images/IPF.jpg'
                    alt='Activity2'
                    className='h-full w-full object-cover'
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='h-[300px] w-[280px] lg:h-[446px] lg:w-[400px] rounded-md overflow-hidden'>
                  <img
                    src='/images/Welpar.jpg'
                    alt='Activity3'
                    className='h-full w-full object-cover'
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='h-[300px] w-[280px] lg:h-[446px] lg:w-[400px] rounded-md overflow-hidden'>
                  <img
                    src='/images/Welpar2.jpg'
                    alt='Activity4'
                    className='h-full w-full object-cover'
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </Suspense>
      </div>
    </section>
  );
};

export default Hero;
