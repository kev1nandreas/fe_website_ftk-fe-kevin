'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SlideButton from './SlideButton/SlideButton';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { pengurus } from '@/lib/data';
import { PopUpDesc } from './PopUpDesc';
import LeftSlideButton from './SlideButton/LeftSlideButton';
import RightSlideButton from './SlideButton/RightSlideButton';

interface Pengurus {
  abbreviation: string;
  name: string;
  description: string;
}

const Kepengurusan = () => {
  const [isPopUpOpen, setIsPopUpOpen] = React.useState(false);
  const [dataPengurus, setDataPengurus] = React.useState<Pengurus | null>(null);

  function handleOpen(pengurus: Pengurus) {
    setDataPengurus(pengurus);
    setIsPopUpOpen(true);
  }
  const handleClose = () => {
    setIsPopUpOpen(false);
    setDataPengurus(null);
  };

  return (
    <section className='flex w-full justify-center bg-white py-24 p-4'>
      <div
        id='kepengurusan'
        className='relative flex w-full lg:w-[1280px] flex-col gap-y-14'
      >
        <h1 className='w-full font-primary text-[64px] font-extrabold text-base-dark'>
          Kepengurusan.
        </h1>
        <div className='w-full'>
          <Swiper
            slidesPerView={3}
            spaceBetween={40}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            speed={2000}
            modules={[Autoplay]}
          >
            <LeftSlideButton/>
            <RightSlideButton/>

            {/* PopUpDesc Component */}
            {isPopUpOpen && (
              <PopUpDesc
                data={dataPengurus}
                isOpen={isPopUpOpen}
                onClose={handleClose}
              />
            )}

            {pengurus.map((person) => (
              <SwiperSlide key={person.id}>
                <div
                  onClick={() => {
                    handleOpen(person);
                  }}
                  className='flex flex-col gap-6 text-center items-center hover:cursor-pointer'
                >
                  <div
                    className='relative w-[10rem] h-[10rem] lg:w-[20rem] lg:h-[20rem] overflow-hidden shadow-md'
                    style={{
                      borderRadius: '30% 70% 70% 30% / 39% 35% 65% 61%', // Custom border-radius
                    }}
                  >
                    <Image
                      src={`/images/pengurus/${person.abbreviation}.png`}
                      width={380}
                      height={457}
                      alt={person.abbreviation}
                      className='object-cover h-full w-full'
                    />
                  </div>

                  <div className='flex w-full flex-col items-center gap-y-1'>
                    <p className='font-secondary text-xl font-semibold text-base-dark'>
                      {person.abbreviation}
                    </p>
                    <p className='font-secondary text-base font-semibold tracking-widest text-black-light-3'>
                      {person.name}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Kepengurusan;
