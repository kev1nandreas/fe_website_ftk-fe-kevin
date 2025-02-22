interface PopUpArticleProps {
  data: Article | null; // The data passed from the parent
  isOpen: Article | null; // To determine if the popup is visible
  onClose: () => void; // Function to close the popup
}

import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Article } from '@/types/article';
import { ENV } from '@/configs/environment';
import { parseDateShort } from '@/lib/utils';

export const PopUpArticle: React.FC<PopUpArticleProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  if (!isOpen || !data) return null;
  return (
    <div
      onClick={onClose}
      className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-3'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-aos='zoom-in'
        className='w-full text-center md:max-w-[40%] max-h-[35rem] overflow-y-scroll bg-white p-6 rounded-2xl shadow-lg relative no-scrollbar'
      >
        {/* Close Button */}
        <IoCloseCircleOutline
          onClick={onClose}
          className='absolute top-2 right-2 text-3xl text-gray-500 hover:text-red-500 cursor-pointer'
        />

        {/* Content */}
        <div className='flex flex-col items-center gap-4'>
          {data.image ? (
            <Image
              src={`${ENV.URI.IMAGE_URL}/${data.image}`}
              alt={data.image}
              width={20}
              height={20}
              unoptimized={true}
              className='hidden lg:block w-[6rem] h-[6rem] rounded-md'
            />
          ) : (
            <div className='hidden lg:flex w-[6rem] h-[6rem] bg-gray-200 rounded-md items-center justify-center text-center'>
              Tidak ada gambar
            </div>
          )}

          <p className='font-secondary text-2xl font-semibold text-gray-800'>
            {data.title}
          </p>

          <div className='flex flex-row gap-2 opacity-70'>
            <p className='font-secondary text-base text-gray-700 text-center'>
              Created: {parseDateShort(data.createdAt)}
            </p>

            <p className='font-secondary text-base text-gray-700 text-center'>
              Modified: {parseDateShort(data.updatedAt)}
            </p>
          </div>

          {seeMore ? (
            <p
              className='font-secondary text-base text-gray-700 text-center'
              dangerouslySetInnerHTML={{ __html: data.content }}
            ></p>
          ) : (
            <p
              className='font-secondary text-base text-gray-700 text-center'
              dangerouslySetInnerHTML={{
                __html:
                  data.content.length > 500
                    ? `${data.content.substring(0, 200)}...`
                    : `${data.content.substring(0, data.content.length - 15)}...`,
              }}
            ></p>
          )}

          <button
            onClick={() => setSeeMore(!seeMore)}
            className='w-38 rounded-md items-center justify-center bg-yellow-dark-1 hover:bg-yellow-dark-2 px-4 py-2 font-secondary text-base font-medium text-white'
          >
            {seeMore ? 'Tutup' : 'Lihat Selengkapnya'}
          </button>
        </div>
      </div>
    </div>
  );
};
