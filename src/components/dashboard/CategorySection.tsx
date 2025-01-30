'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Pagination } from '@heroui/pagination';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import { Slide, ToastContainer } from 'react-toastify';
import { errorToast, successToast } from '@/lib/utils';
import Confirmation from './Confirmation';

interface Category {
  id: string;
  name: string;
}

const CategorySection = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<Category | null>(null);
  const [newname, setNewname] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenPopUp, setIsOpenPopUp] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(
          `/categories/?page=${currentPage}&limit=10`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const result = await response.json();
          setTotalPages(result.data.totalPage);
          setCategories(result.data.categories);
        } else {
          const errorResult = await response.json();
          errorToast(`Error: ${errorResult.message}`);
        }
      } catch (error) {
        errorToast(`Error fetching categories: ${error}`);
      }
    };

    fetchCategories();
  });

  const handleDelete = async (id: string) => {
    setIsOpenPopUp('');
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        const router = useRouter();
        router.push('/login');
        return;
      }

      const response = await fetch(
        `/categories/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      if (result.status === 'success') {
        setCategories(
          categories.filter((category) => category.id !== id.toString()),
        );
        successToast('Kategori berhasil dihapus!');
      } else {
        errorToast(`Error: ${result.message}`);
      }
    } catch (error) {
      errorToast(`Error deleting category: ${error}`);
    }
  };

  const handleCreatecategory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `/categories`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newname }),
        },
      );

      const result = await response.json();

      if (result.status === 'success') {
        successToast('Kategori berhasil dibuat!');
        setIsCreating(false);
        setCategories([...categories, result.data]);
      } else {
        errorToast(`Error: ${result.message}`);
      }
    } catch (error) {
      errorToast(`Error creating category: ${error}`);
    }
  };

  useEffect(() => {
    if (isEditing) {
      setNewname(isEditing.name);
    }
  }, [isEditing]);

  useEffect(() => {
    if (isCreating) {
      setNewname('');
    }
  }, [isCreating]);

  const handleEditcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!isEditing) return;

      const token = localStorage.getItem('token');
      const response = await fetch(
        `/categories/${isEditing.id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newname }),
        },
      );

      const result = await response.json();

      if (result.status === 'success') {
        successToast('Kategori berhasil diubah!');
        setIsEditing(null);
        setCategories(
          categories.map((category) =>
            category.id === isEditing.id ? result.data : category,
          ),
        );
      } else {
        console.log('Error dari server:', result.message);
        errorToast(`Error: ${result.message}`);
      }
    } catch (error) {
      errorToast(`Error editing category: ${error}`);
    }
  };

  return (
    <div className='flex h-screen w-full overflow-y-auto flex-col items-center bg-slate-50 px-4 py-10 sm:w-4/5 sm:px-20'>
      {/* Toast Container */}
      <ToastContainer
        position='top-right'
        autoClose={4000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Slide}
      />

      {isOpenPopUp && (
        <Confirmation
          onCancel={() => setIsOpenPopUp('')}
          onConfirm={() => handleDelete(isOpenPopUp)}
          object='kategori'
        />
      )}

      {!isCreating && !isEditing ? (
        <div className='w-full'>
          <div className='flex w-full flex-col items-center justify-between sm:flex-row'>
            <h1 className='font-secondary text-2xl font-bold text-base-dark sm:text-3xl'>
              Kategori
            </h1>
            <button
              onClick={() => setIsCreating(true)}
              className='mt-4 flex w-full items-center gap-x-2 rounded-md bg-yellow-main px-3 py-2 hover:bg-yellow-dark-1 sm:mt-0 sm:w-auto sm:px-5 sm:py-3'
            >
              <FaPlus className='fill-white' />
              <p className='font-secondary text-sm font-normal text-white sm:text-lg'>
                Buat Kategori
              </p>
            </button>
          </div>

          <div className='mt-6 w-full overflow-x-auto rounded-lg bg-white p-4 shadow-md sm:mt-10 sm:p-6'>
            <Table aria-label='Example table with dynamic content'>
              <TableHeader>
                <TableColumn>No</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>ID</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody
                items={categories}
                emptyContent={'No rows to display.'}
              >
                {(item: Category) => (
                  <TableRow key={item.id}>
                    <TableCell>{categories.indexOf(item) + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <div className='flex gap-3'>
                        <button
                          onClick={() => setIsEditing(item)}
                          className='flex items-center gap-x-1 rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-700'
                        >
                          <FaEdit />
                          Edit
                        </button>
                        <button
                          onClick={() => setIsOpenPopUp(item.id)}
                          className='flex items-center gap-x-1 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700'
                        >
                          <FaTrashAlt />
                          Hapus
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className='flex justify-center mt-6'>
            <Pagination
              loop
              showControls
              color={'warning'}
              initialPage={1}
              total={totalPages}
              onChange={setCurrentPage}
            />
          </div>
        </div>
      ) : isCreating ? (
        <form
          onSubmit={handleCreatecategory}
          className='flex w-full flex-col gap-4 bg-white p-4 shadow sm:p-6'
        >
          <h2 className='font-secondary text-lg font-bold text-yellow-main sm:text-2xl'>
            Buat Category Baru
          </h2>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='name'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Category Name
              </label>
              <input
                id='name'
                type='text'
                value={newname}
                onChange={(e) => setNewname(e.target.value)}
                className='w-full rounded border p-2'
                placeholder='Enter name'
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <button
              type='button'
              onClick={() => setIsCreating(false)}
              className='mt-4 rounded bg-gray-300 px-4 py-2 font-medium text-black hover:bg-gray-500'
            >
              Batal
            </button>
            <button
              type='submit'
              className='mt-4 rounded bg-yellow-main px-4 py-2 font-medium text-white hover:bg-yellow-600'
            >
              Simpan
            </button>
          </div>
        </form>
      ) : isEditing ? (
        <form
          onSubmit={handleEditcategory}
          className='flex w-full flex-col gap-4 bg-white p-4 shadow sm:p-6'
        >
          <h2 className='font-secondary text-lg font-bold text-yellow-main sm:text-2xl'>
            Edit Category
          </h2>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='name'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Category Name
              </label>
              <input
                id='name'
                type='text'
                value={newname}
                onChange={(e) => setNewname(e.target.value)}
                className='w-full rounded border p-2'
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <button
              type='button'
              onClick={() => setIsEditing(null)}
              className='mt-4 rounded bg-gray-300 px-4 py-2 font-medium text-black hover:bg-gray-500'
            >
              Batal
            </button>
            <button
              type='submit'
              className='mt-4 rounded bg-yellow-main px-4 py-2 font-medium text-white hover:bg-yellow-600'
            >
              Simpan
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default CategorySection;
