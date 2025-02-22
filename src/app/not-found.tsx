'use client';

import { useRouter } from 'next/navigation';
import { PiSmileySadThin } from 'react-icons/pi';

export default function notFound() {
  const router = useRouter();
  const handlePreviousPage = () => {
    router.back();
  };

  return (
    <div className='flex justify-center items-center h-screen w-screen p-5'>
      <div className='flex flex-col items-center gap-5'>
        <h1 className='text-[8rem] font-bold'>404</h1>
        <h1 className='text-[2.5rem] md:text-[5rem] font-bold text-center'>
          Tidak ada apa-apa disini
        </h1>
        <h1 className='text-[1rem] font-semibold text-center'>
          ... mungkin halaman yang kamu cari telah dihapus atau tidak pernah ada
        </h1>
        <div
          onClick={handlePreviousPage}
          className='flex h-fit w-fit rounded-md items-center justify-center bg-gradient-to-r cursor-pointer from-yellow-dark-1 to-yellow-light-1 hover:from-yellow-light-1 hover:to-yellow-dark-1 px-4 py-2 font-secondary text-base font-medium text-white hover:bg-blue-dark-2'
        >
          Kembali ke halaman sebelumnya
        </div>
      </div>
    </div>
  );
}
