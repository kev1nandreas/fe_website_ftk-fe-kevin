'use client';

import React, { use, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TentangKami = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  
  return (
    <div
      id='tentang-kami'
      className='flex w-full justify-center bg-white py-12 p-4'
    >
      <div className='flex w-[1280px] flex-col gap-y-6'>
        <div className='flex w-full justify-between text-base-dark'>
          <h1 data-aos="zoom-in-right" className='font-primary text-[64px] font-extrabold'>
            Tentang Kami.
          </h1>
        </div>
        <div data-aos="zoom-in-left" className='font-base font-secondary text-lg text-black-light-3 text-justify'>
          <div className='flex md:flex-row md:gap-11 flex-col gap-y-4'>
            <p>
              Dalam konteks BEM FTK, "Bentang" bisa melambangkan potensi dan
              ruang kreatif BEM FTK yang tak terbatas, serta keberagaman
              ide-ide/gagasan yang dapat diwujudkan. Terkini, FTK memiliki
              sumber daya mahasiswa yang fokus dengan pengembangan dirinya,
              sementara BEM FTK mewadahi itu semua, dan sekarang akan
              di-"Bentang"-kan ke arah yang lebih progresif sesuai kondisi
              empirisnya melampaui apa yang sudah ada.
            </p>
            <p>
              "Layar" dapat menggambarkan seluruh elemen di FTK, mulai dari
              mahasiswanya, bahkan ke organisasi BEM FTK itu sendiri. "Layar"
              disini adalah metafora bahwa setiap subjek di FTK adalah layar
              yang mampu menggerakkan kapalnya sendiri-sendiri, tinggal
              bagaimana BEM FTK selaku wadah yang menaungi dapat mengarahkan,
              memfasilitasi, serta menyatukan "Layar-Layar" yang ingin bergerak
              tersebut.
            </p>
          </div>
          <p className='mt-4'>
            Dengan filosofi ini, BEM FTK "Bentang Layar" bertujuan untuk menjadi
            poros yang menggerakkan sekaligus menjembatani seluruh elemen di FTK
            dengan membentangkan layarnya untuk terus maju.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TentangKami;
