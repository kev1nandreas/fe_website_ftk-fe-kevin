'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { Autoplay, Navigation } from 'swiper/modules'; // Tambahkan Navigation

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Tambahkan CSS untuk navigasi
import NewsSlideButton from './NewsSlideButton';

interface Article {
  category: any;
  id: string;
  title: string;
  content: string;
  image: string | null;
  categoryId: string; // Tambahkan categoryId di sini
  createdAt: string;
  updatedAt: string;
}

const Postingan = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `/articles/?page=1&limit=5`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log('response', response);

        if (response.status === 401) {
          setError('Unauthorized. Please check your token.');
          return;
        }

        const result = await response.json();

        if (result.status === 'success') {
          setArticles(result.data.articles);
        } else {
          setError(`Error: ${result.message}`);
          console.log('result.message');
        }
      } catch (error) {
        setError('Error fetching articles');
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const imageBaseUrl = `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}`;

  return (
    <div
      id='postingan'
      className='flex flex-col w-full justify-center items-center bg-gradient-to-b from-yellow-400 via-amber-300 to-white py-12 p-4 rounded-t-[3rem] lg:rounded-t-[8rem]'
    >
      <div className='flex w-full lg:w-[1280px] flex-col items-center gap-y-12'>
        <h1 className='w-full text-center font-primary text-[50px] lg:text-[64px] font-extrabold text-black'>
          Postingan Terbaru
        </h1>

        {error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
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
            {articles.map((article) => (
              <SwiperSlide key={article.id}>
                <div className='mx-auto flex w-fit items-center justify-center gap-x-14 bg-white p-6 rounded-xl shadow-lg border-2'>
                  {article.image ? (
                    <div className='hidden md:block md:relative lg:h-[516px] lg:w-[412px] border-2 shadow-md rounded-lg overflow-hidden'>
                      <img
                        src={`${imageBaseUrl}/${article.image}`}
                        width={412}
                        height={516}
                        alt={article.title}
                        className='hidden lg:block rounded-lg w-full h-full object-cover'
                      />
                    </div>
                  ) : (
                    <div className='hidden md:block md:relative lg:h-[516px] lg:w-[412px] border-2 shadow-md bg-gray-300 rounded-lg overflow-hidden'>
                      {/* Background Image */}
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
        )}
      </div>

      <Link
        href='/artikel'
        className='flex h-fit w-fit rounded-md items-center justify-center bg-gradient-to-r from-yellow-dark-1 to-yellow-light-4 hover:from-yellow-light-4 hover:to-yellow-dark-1 px-4 py-2 font-secondary text-base font-medium text-white hover:bg-blue-dark-2'
      >
        More Articles
      </Link>
    </div>
  );
};

export default Postingan;
