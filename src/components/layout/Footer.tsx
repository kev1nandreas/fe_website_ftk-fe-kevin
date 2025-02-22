import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiShopee } from 'react-icons/si';

const Footer = () => {
  return (
    <footer id='kontak' className='flex w-full justify-center bg-yellow-400 py-12 p-4'>
      <div className='flex w-[1280px] flex-col gap-y-6 text-white'>
        {/* Main */}
        <div className='flex h-[248px] w-full items-start flex-col md:flex-row'>
          <div className='flex w-full gap-x-4'>
            <Image
              src='/icons/FTKIcon.png'
              width={100}
              height={65}
              alt='Logo Kabinet'
            />
            <div className='font-primary text-2xl font-extrabold'>
              <h1>Badan Eksekutif Mahasiswa</h1>
              <h1>Fakultas Teknologi Kelautan.</h1>
            </div>
          </div>
          <div className='flex w-full gap-x-4 justify-center pt-8 md:pt-0'>
            <div className='flex w-48 flex-col gap-y-3 font-secondary'>
              <h2 className='text-base font-semibold text-white'>BEM FTK</h2>
              <div className='flex w-full flex-col items-start gap-y-2 text-sm font-medium text-white'>
                <Link href='/#tentangkami' className='hover:underline'>
                  Tentang Kami
                </Link>
                <Link href='/#kepengurusan' className='hover:underline'>
                  Kepengurusan
                </Link>
                <Link href='' className='hover:underline'>
                  MBKM
                </Link>
              </div>
            </div>
            <div className='flex w-48 flex-col gap-y-3 font-secondary'>
              <h2 className='text-base font-semibold text-white'>Akademik</h2>
              <div className='flex w-full flex-col items-start gap-y-2 text-sm font-medium text-white'>
                <Link href='' className='hover:underline'>
                  Akademik
                </Link>
                <Link href='' className='hover:underline'>
                  Lomba
                </Link>
                <Link href='' className='hover:underline'>
                  Beasiswa
                </Link>
                <Link href='' className='hover:underline'>
                  MSIB
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Line Divider */}
        <div className='w-full border-b border-white'></div>

        {/* Copyright */}
        <div className='flex flex-col items-center justify-between gap-3'>
          <p>Copyright © 2025 BEM FTK ITS</p>
          <div className='flex gap-x-4'>
            <Link
              href='https://shopee.co.id/bentanglayar'
              className='flex h-10 w-10 items-center justify-center rounded-full bg-white hover:scale-105'
              target='_blank'
            >
              <Image
                src='/icons/shopee.svg'
                width={24}
                height={24}
                alt='Shopee'
              />
            </Link>
            <Link
              href='https://www.tokopedia.com/bemftk?utm_campaign=Shop-103937879-18271345-210125-contextual_image-semua_produk-LSfHao&utm_source=salinlink&utm_medium=share&_branch_match_id=1189097796806111570&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL8nPzi9ITclM1MvJzMvW9y%2FwS%2FFLTA%2FKDkyyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUARDjjITwAAAA%3D'
              className='flex h-10 w-10 items-center justify-center rounded-full bg-white hover:scale-105'
              target='_blank'
            >
              <Image
                src='/icons/tokopedia.svg'
                width={24}
                height={24}
                alt='Tokopedia'
              />
            </Link>
            <Link
              href='https://www.instagram.com/bemftkits/?hl=en'
              className='flex h-10 w-10 items-center justify-center rounded-full bg-white hover:scale-105'
              target='_blank'
            >
              <Image
                src='/icons/instagram.svg'
                width={24}
                height={24}
                alt='Instagram'
              />
            </Link>
            <Link
              href='https://www.youtube.com/@BEMFTKITS'
              className='flex h-10 w-10 items-center justify-center rounded-full bg-white hover:scale-105'
              target='_blank'
            >
              <Image
                src='/icons/youtube.svg'
                width={24}
                height={24}
                alt='Youtube'
              />
            </Link>
            <Link
              href='https://www.linkedin.com/company/bem-ftk-its/'
              className='flex h-10 w-10 items-center justify-center rounded-full bg-white hover:scale-105'
              target='_blank'
            >
              <Image
                src='/icons/linkedin.svg'
                width={24}
                height={24}
                alt='Linkedin'
              />
            </Link>
            <Link
              href='https://www.tiktok.com/@bemftkits'
              className='flex h-10 w-10 items-center justify-center rounded-full bg-white hover:scale-105'
              target='_blank'
            >
              <Image
                src='/icons/tiktok.svg'
                width={24}
                height={24}
                alt='Tiktok'
              />
            </Link>
            <Link
              href='https://line.me/R/ti/p/@bxv1166z?oat_content=url'
              className='flex h-10 w-10 items-center justify-center rounded-full bg-white hover:scale-105'
              target='_blank'
            >
              <Image src='/icons/line.svg' width={24} height={24} alt='Line' />
            </Link>
            <Link
              href='mailto:bemftk@gmail.com'
              className='flex h-10 w-10 items-center justify-center rounded-full bg-white hover:scale-105'
              target='_blank'
            >
              <Image src='/icons/email.svg' width={24} height={24} alt='Line' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
