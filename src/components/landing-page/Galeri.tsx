import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Galeri = () => {
  return (
    <section className='flex w-full justify-center bg-yellow-400 py-24'>
      <div id='galeri' className='flex w-[1280px] flex-col gap-14 text-black'>
        <div className='flex flex-col md:flex-row w-full justify-between gap-5 px-6'>
          <h1 className='font-primary text-[64px] font-extrabold'>
            Galeri Kami.
          </h1>
          <Link
            href={
              'https://drive.google.com/drive/folders/1VO8qQq9yk_aMs00VWim8Gs3NuhWYgP15?usp=drive_link'
            }
            className='font-secondary text-lg font-semibold hover:underline text-right md:text-center'
            target='_blank'
          >
            Lihat Selengkapnya
          </Link>
        </div>

        {/* Galeri */}
        <div className='flex h-fit w-full flex-col gap-y-5'>
          <div className='flex w-full justify-between'>
            <Image
              src='/images/galeri/AMS1.jpg'
              width={420}
              height={547}
              alt='AMS 1'
              className='w-1/3 h-full'
            />
            <Image
              src='/images/galeri/FTKConnect.jpg'
              width={840}
              height={547}
              alt='FTK Connect 1'
              className='w-2/3 h-full'
            />
          </div>
          <div className='flex w-full justify-between'>
            <Image
              src='/images/galeri/FTKSatu.jpg'
              width={1280}
              height={547}
              alt='FTK Satu'
              className='w-full h-full'
            />
          </div>
          <div className='flex w-full justify-between'>
            <Image
              src='/images/galeri/IPF.jpg'
              width={840}
              height={547}
              alt='IPF'
              className='w-2/3 h-full'
            />
            <Image
              src='/images/galeri/Penghargaan.jpeg'
              width={420}
              height={547}
              alt='Penghargaan'
              className='w-1/3 h-full'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Galeri;
