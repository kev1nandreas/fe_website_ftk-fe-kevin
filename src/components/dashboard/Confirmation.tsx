import { CiWarning } from 'react-icons/ci';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

interface ConfirmationProps {
    onCancel: () => void;
    onConfirm: () => void;
    object?: string;
}

export default function Confirmation({ onCancel, onConfirm, object }: ConfirmationProps) {
    useEffect(() => {
        AOS.init({ duration: 300 });
      }, []);

    return (
        <div className='fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-[30rem] h-fit flex flex-col gap-y-6 bg-white p-8 rounded-2xl text-center'>
                <div className='flex justify-center'>
                    <CiWarning className='text-red-main text-[7rem]' />
                </div>

                <h1 className='text-3xl font-semibold'>Apakah kamu yakin?</h1>
                <p className='opacity-70'>
                    Kamu benar-benar yakin ingin menghapus {object}? Perubahan akan dilakukan
                    secara permanen
                </p>
                <div className='flex justify-center gap-x-3 text-white'>
                    <button onClick={onCancel} className='w-[8rem] bg-gray-400 hover:bg-gray-600 px-4 py-2 rounded-md'>
                        Batal
                    </button>
                    <button onClick={onConfirm} className='w-[8rem] bg-red-main hover:bg-red-700 p-2 px-4 rounded-md'>
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

export function ConfirmationLogOut({ onCancel, onConfirm }: ConfirmationProps) {
    useEffect(() => {
        AOS.init({ duration: 300 });
      }, []);

    return (
        <div className='fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-[30rem] h-fit flex flex-col gap-y-6 bg-white p-8 rounded-2xl text-center'>
                <div className='flex justify-center'>
                    <CiWarning className='text-red-main text-[7rem]' />
                </div>

                <h1 className='text-3xl font-semibold'>Apakah kamu yakin?</h1>
                <p className='opacity-70'>
                    Kamu benar-benar yakin ingin keluar dari halaman admin?
                </p>
                <div className='flex justify-center gap-x-3 text-white'>
                    <button onClick={onCancel} className='w-[8rem] bg-gray-400 hover:bg-gray-600 px-4 py-2 rounded-md'>
                        Batal
                    </button>
                    <button onClick={onConfirm} className='w-[8rem] bg-red-main hover:bg-red-700 p-2 px-4 rounded-md'>
                        Keluar
                    </button>
                </div>
            </div>
        </div>
    );
}