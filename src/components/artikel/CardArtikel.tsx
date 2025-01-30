'use client';

import React, { use, useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaTag } from 'react-icons/fa6';
import {
  Pagination,
} from '@heroui/pagination';
import { parseDate } from '@/lib/utils';

interface Article {
  category: any;
  id: string;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function Artikel() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');
  const imageBaseUrl = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `/articles/?page=${currentPage}&limit=6&search=${keyword}`,
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
          setTotalPages(result.data.totalPage);
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
  }, [currentPage, keyword]);

  return (
    <div>
      <div className='px-5 mt-6 flex items-center justify-center'>
        <input
          type='text'
          placeholder='Cari Artikel...'
          className='mt-2 h-10 w-[50rem] rounded-full border-2 border-gray-300 px-4 focus:border-yellow-main focus:outline-none'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className='px-5 mt-6 gap-4 flex flex-wrap justify-center'>
        {articles.map((article) => (
          <div
            key={article.id}
            className='bg-white rounded-xl border-4 w-[25rem] p-5'
          >
            {article.image ? (
              <div className='relative w-full h-[15rem] border-2 shadow-md rounded-lg overflow-hidden'>
                <img
                  src={`${imageBaseUrl}/${article.image}`}
                  width={412}
                  height={516}
                  alt={article.title}
                  className='hidden lg:block rounded-lg w-full h-full object-cover'
                />
              </div>
            ) : (
              <div className='relative w-full h-[15rem] border-2 shadow-md bg-gray-300 rounded-lg overflow-hidden'>
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
            <div className='flex mt-2'>
              <div className='mr-6 flex items-center gap-1'>
                <FaCalendarAlt />
                <p>{parseDate(article.createdAt)}</p>
              </div>
              <div className='mr-6 flex items-center gap-1'>
                <FaTag />
                <p>{article.category.name}</p>
              </div>
            </div>
            <h1 className='text-2xl mt-2 font-bold'>{article.title}</h1>
            <div
              className='mt-2 text-justify'
              dangerouslySetInnerHTML={{
                __html:
                  article.content.length > 100
                    ? `${article.content.substring(0, 100)}... <a href="/artikel/${article.id}" class="text-yellow-400">Read More</a>`
                    : `${article.content.substring(0, article.content.length - 15)}... <a href="/artikel/${article.id}" class="text-yellow-400">Read More</a>`,
              }}
            ></div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <div>
          <h1 className='text-center my-8 text-xl'>No articles found</h1>
        </div>
      )}

      {/* Pagination */}
      <div className='flex justify-center my-6'>
        <Pagination
          loop
          showControls
          color={'warning'}
          initialPage={1}
          total={totalPages}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
