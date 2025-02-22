'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { parseDate } from '@/lib/utils';
import { FaTag } from 'react-icons/fa6';
import Loading from '@/app/loading';
import { fetchArticleByID, useFetchArticles } from '@/app/api/useFetchArticle';
import { typecastArticle } from '@/types/article';

const Content = () => {
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const idArtikel = id as string;
  const { data: articleData } = fetchArticleByID(idArtikel);
  const { data: recommendedData } = useFetchArticles(11, 1);

  const article = articleData?.data || null;
  const recommendedArticles =
    recommendedData?.data?.articles.map(typecastArticle) || [];

  if (error) return <p className='text-center text-red-600'>{error}</p>;
  if (!article) return <Loading />;

  console.log(article);

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
          <p className='mb-6 text-sm text-gray-500'>
            <span className='font-semibold'>{article.category.name}</span>
          </p>

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
            {recommendedArticles.slice(0, 10).map((recommended: any) => (
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
