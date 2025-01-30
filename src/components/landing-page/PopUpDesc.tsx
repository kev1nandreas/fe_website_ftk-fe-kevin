interface Pengurus {
  abbreviation: string;
  name: string;
  description: string;
}

interface PopUpDescProps {
  data: Pengurus | null; // The data passed from the parent
  isOpen: boolean; // To determine if the popup is visible
  onClose: () => void; // Function to close the popup
}

import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { prokers } from '@/lib/data';

export const PopUpDesc: React.FC<PopUpDescProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const proker = prokers.filter(
    (proker) =>
      proker.departemen.toLowerCase() === data?.abbreviation.toLowerCase(),
  )[0];

  console.log(proker);

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
        className='w-full md:max-w-[40%] max-h-[35rem] overflow-y-scroll bg-white p-6 rounded-2xl shadow-lg relative no-scrollbar'
      >
        {/* Close Button */}
        <IoCloseCircleOutline
          onClick={onClose}
          className='absolute top-2 right-2 text-3xl text-gray-500 hover:text-red-500 cursor-pointer'
        />

        {/* Content */}
        <div className='flex flex-col items-center gap-4'>
          <Image
            width={300}
            height={300}
            src={`/images/pengurus/${data.abbreviation}.png`}
            alt={data.abbreviation}
            className='w-40 h-40 rounded-full object-cover shadow-md'
          />

          <p className='font-secondary text-2xl font-semibold text-gray-800'>
            {data.abbreviation}
          </p>

          <p className='font-secondary text-base font-medium tracking-wide text-gray-600 uppercase'>
            {data.name}
          </p>

          <p className='font-secondary text-base text-gray-700 text-center'>
            {data.description}
          </p>

          <Accordion>
            {proker?.proker?.map((proker, index) => (
              <AccordionItem
                key={index}
                aria-label={proker.nama}
                title={proker.nama}
              >
                {proker.tujuan}
              </AccordionItem>
            )) || null}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
