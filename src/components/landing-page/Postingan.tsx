'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { Autoplay, Navigation } from 'swiper/modules'; // Tambahkan Navigation

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Tambahkan CSS untuk navigasi
import NewsSlideButton from './SlideButton/NewsSlideButton';
import { useFetchArticles } from '@/app/api/useFetchArticle';
import { typecastArticle } from '@/types/article';
import { ENV } from '@/configs/environment';
import CircularProgress from '@mui/material/CircularProgress';

const Postingan = () => {
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const { data: articleData, isLoading, error } = useFetchArticles(limit, page);
  const articles = typecastArticle(articleData?.data?.articles) || [];

  return (
    <div
      id='postingan'
      className='flex flex-col w-full justify-center items-center bg-gradient-to-b from-yellow-400 via-amber-300 to-white py-12 p-4 rounded-t-[3rem] lg:rounded-t-[8rem]'
    >
      <div className='flex w-full lg:w-[1280px] flex-col items-center gap-y-12'>
        <h1 className='w-full text-center font-primary text-[50px] lg:text-[64px] font-extrabold text-black'>
          Artikel Terbaru
        </h1>

        {isLoading && (
          <div className='flex justify-center my-8 items-center gap-4'>
            <CircularProgress size="30px" />
            <p>Memuat...</p>
          </div>
        )}

        {error && (
          <div className='flex justify-center my-8 text-red-500'>
            <p>Error: {error.message}</p>
          </div>
        )}

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          className='flex w-full items-center justify-center'
          centeredSlides={true}
          autoplay={{
            delay: 3000,
          }}
          speed={4000}
          modules={[Autoplay]}
        >
          {articles?.map((article) => (
            <SwiperSlide key={article?.id}>
              <div className='mx-auto flex w-fit items-center justify-center gap-x-14 bg-white p-6 rounded-xl shadow-lg border-2'>
                {article.image ? (
                  <div className='hidden md:block md:relative lg:h-[516px] lg:w-[412px] border-2 shadow-md rounded-lg overflow-hidden'>
                    <img
                      src={`${ENV.URI.IMAGE_URL}/${article.image}`}
                      width={412}
                      height={516}
                      alt={article.title}
                      className='hidden lg:block rounded-lg w-full h-full object-cover'
                    />
                  </div>
                ) : (
                  <div className='hidden md:block md:relative lg:h-[516px] lg:w-[412px] border-2 shadow-md bg-gray-300 rounded-lg overflow-hidden'>
                    <div
                      className='absolute inset-0 w-full h-full'
                      style={{
                        backgroundImage: "url('/images/backdrop-hero.jpg')",
                        opacity: 0.2,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    ></div>
                    <div className='absolute inset-0 flex items-center justify-center text-black font-semibold p-3 text-center'>
                      {article.title}
                    </div>
                  </div>
                )}

                <div className='flex lg:w-[462px] flex-col gap-y-4'>
                  <div className='inline-block max-w-fit py-2 bg-gradient-to-r from-yellow-dark-1 via-yellow-dark-1 to-yellow-light-1 text-white rounded-full px-3 text-sm font-bold shadow-lg'>
                    {article.category.name}
                  </div>

                  <h1 className='font-secondary text-[32px] font-bold text-black'>
                    {article.title}
                  </h1>
                  <div
                    className='font-secondary text-base font-normal text-black text-justify'
                    dangerouslySetInnerHTML={{
                      __html:
                        article.content.length > 512
                          ? `${article.content.substring(0, 512)}... <a href="/artikel/${article.id}" class="text-yellow-400">Read More</a>`
                          : `${article.content.substring(0, article.content.length - 15)}... <a href="/artikel/${article.id}" class="text-yellow-400">Read More</a>`,
                    }}
                  ></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <NewsSlideButton />
        </Swiper>
      </div>

      <Link
        href='/artikel'
        className='flex h-fit w-fit rounded-md items-center justify-center bg-gradient-to-r from-yellow-dark-1 to-yellow-light-4 hover:from-yellow-light-4 hover:to-yellow-dark-1 px-4 py-2 font-secondary text-base font-medium text-white hover:bg-blue-dark-2'
      >
        Lihat Semua Artikel
      </Link>
    </div>
  );
};

export default Postingan;
