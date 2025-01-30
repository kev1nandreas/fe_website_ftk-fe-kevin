'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { parseDate } from '@/lib/utils';
import { FaTag } from 'react-icons/fa6';
import Image from 'next/image';
import Loading from '@/app/loading';

interface Article {
  id: string;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

interface Category {
  id: number;
  name: string;
}

const Content = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recommendedArticles, setRecommendedArticles] = useState<Article[]>([]);
  const { id } = useParams();

  // Fetch artikel yang sedang dibaca
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `/articles/${id}`,
        );
        const data = await res.json();

        if (data.status === 'success') {
          setArticle(data.data);
        } else {
          setError('Failed to load article');
        }
      } catch (err) {
        setError('Error fetching article');
        console.error(err);
      }
    };
    console.log(id);

    if (id) {
      fetchArticle();
    }
  }, [id]);

  // Fetch semua artikel untuk rekomendasi
  useEffect(() => {
    const fetchRecommendedArticles = async () => {
      try {
        const res = await fetch(
          `/articles`,
        );
        const data = await res.json();

        if (data.status === 'success') {
          const articles = data.data.articles.filter(
            (item: Article) => item.id !== id,
          );

          setRecommendedArticles(articles);
        } else {
          setError('Failed to load recommended articles');
        }
      } catch (err) {
        console.error('Error fetching recommended articles:', err);
      }
    };

    fetchRecommendedArticles();
  }, [id]);

  if (error) return <p className='text-center text-red-600'>{error}</p>;
  if (!article) return <Loading />;

  return (
    <div className='mx-auto max-w-6xl p-8'>
      {/* Bagian dengan grid untuk memisahkan konten utama dan rekomendasi */}
      <div className='flex flex-col md:flex-row gap-8 justify-between'>
        {/* Kolom utama (2/3 dari lebar halaman) */}
        <div className='w-full'>
          <h1 className='mb-4 text-4xl font-bold text-gray-900'>
            {article.title}
          </h1>
          <p className='mb-2 text-sm text-gray-500'>
            Diposting pada {parseDate(article.createdAt)}
          </p>
          {category && (
            <p className='mb-6 text-sm text-gray-500'>
              <span className='font-semibold'>{category}</span>
            </p>
          )}

          <div className='clearfix'>
            {article.image && (
              <div className='mb-4 max-h-[30rem] overflow-hidden rounded-md'>
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${article.image}`}
                  alt={article.title}
                  className='w-full h-full object-cover'
                />
              </div>
            )}

            <div className='prose prose-lg text-justify leading-7 text-gray-800'>
              <div
                dangerouslySetInnerHTML={{
                  __html: article.content,
                }}
              ></div>
            </div>
          </div>

          <hr className='my-8 border-gray-300' />

          <p className='text-sm text-gray-400'>
            Terakhir diperbarui pada {parseDate(article.updatedAt)}
          </p>
        </div>

        {/* Kolom rekomendasi artikel (1/3 dari lebar halaman) */}
        <aside className='rounded-md'>
          <h2 className='mb-4 text-2xl font-bold'>Artikel Terbaru Lainnya</h2>
          <div className='flex flex-col gap-4 flex-wrap'>
            {recommendedArticles.slice(0, 10).map((recommended) => (
              <div
                key={recommended.id}
                className='rounded-md bg-white p-4 shadow w-[25rem]'
              >
                <div className='w-full'>
                  <div className='w-full flex justify-between'>
                    <div className='flex gap-2 items-center'>
                      <FaTag />
                      <p className='mb-1 text-xs text-gray-500'>
                        {recommended.category.name}
                      </p>
                    </div>

                    <p className='mb-1 text-xs text-gray-500'>
                      {parseDate(recommended.createdAt)}
                    </p>
                  </div>

                  <Link
                    className='font-bold text-yellow-main hover:underline'
                    href={`/artikel/${recommended.id}`}
                  >
                    {recommended.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Content;
