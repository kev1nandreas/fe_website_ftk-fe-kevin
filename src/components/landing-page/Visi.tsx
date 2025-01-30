'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Visi = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className='flex w-full bg-yellow-400 pb-24 pt-20 p-4'>
      <div className='flex flex-col gap-8 justify-between md:mx-16 md:gap-x-11 text-black'>
        <div className='flex h-fit flex-col gap-y-6'>
          <h2 data-aos="fade-right" className='font-primary text-5xl font-extrabold'>Visi</h2>
          <p data-aos="fade-right" className='font-secondary text-lg font-normal text-black text-opacity-70'>
            “Adaptif dan ekspansif sebagai integrator yang impresif untuk
            mahasiswa FTK”
          </p>
        </div>
        <div className='flex h-fit flex-col gap-y-6'>
          <h2 data-aos="fade-right" className='font-primary text-5xl font-extrabold'>Misi</h2>
          <div className='flex flex-col gap-y-4'>
            <p data-aos="fade-right" className='font-secondary text-lg font-normal text-black text-opacity-70'>
              Optimalisasi sistem, strategi, dan instrumen pendukung BEM FTK -
              ITS yang adaptif dan dinamis.
            </p>
            <p data-aos="fade-right" className='font-secondary text-lg font-normal text-black text-opacity-70'>
              Ekspansi BEM FTK - ITS sebagai wadah eskalasi kemampuan dan
              kebutuhan mahasiswa FTK - ITS.
            </p>
            <p data-aos="fade-right" className='font-secondary text-lg font-normal text-black text-opacity-70'>
              Penguatan harmonisasi dan kolaborasi aktif kepada seluruh
              mahasiswa FTK dan stakeholder BEM FTK - ITS.
            </p>
            <p data-aos="fade-right" className='font-secondary text-lg font-normal text-black text-opacity-70'>
              Mewujudkan pergerakan nyata BEM FTK - ITS yang berdampak masif
              bagi mahasiswa FTK - ITS dan masyarakat."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visi;
