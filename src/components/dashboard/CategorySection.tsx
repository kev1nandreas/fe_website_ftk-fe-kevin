'use client';

import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Pagination from '@mui/material/Pagination';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import Confirmation from './Confirmation';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '@/app/admin/kategori/api/useCategory';
import { Category, typecastCategory } from '@/types/article';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Spinner } from '@heroui/spinner';
import CircularProgress from '@mui/material/CircularProgress';

const CategorySection = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<Category | null>(null);
  const [isOpenPopUp, setIsOpenPopUp] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {
    data: categoriesData,
    refetch: refetchCategories,
    isLoading: isLoadingcategories,
    error
  } = fetchCategories(limit, page);
  const categories = typecastCategory(categoriesData?.data?.categories) || [];

  const formSchema = z.object({
    name: z.string().nonempty('Nama kategori tidak boleh kosong'),
  });

  type FormType = z.infer<typeof formSchema>;

  useEffect(() => {
    refetchCategories();
  }, [page]);

  useEffect(() => {
    if (isEditing) {
      resetEdit({
        name: isEditing.name,
      });
    }
  }, [isEditing]);

  const {
    control: controlCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: errorsCreate },
    reset: resetCreate,
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const {
    control: controlEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const newCategory = createCategory({
    onSuccess: () => {
      toast.success('Kategori berhasil dibuat');
      setIsCreating(false);
      resetCreate();
      refetchCategories();
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const renewCategory = updateCategory({
    onSuccess: () => {
      toast.success('Kategori berhasil diubah');
      setIsEditing(null);
      refetchCategories();
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const removeCategory = deleteCategory({
    onSuccess: () => {
      toast.success('Kategori berhasil dihapus');
      refetchCategories();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onCreate = handleSubmitCreate(async (data) => {
    setLoading(true);
    await newCategory.mutateAsync(data);
    setLoading(false);
  });

  const onEdit = handleSubmitEdit(async (data) => {
    setLoading(true);
    if (isEditing) {
      const withIdData = { ...data, id: isEditing.id };
      await renewCategory.mutateAsync(withIdData);
    }
    setLoading(false);
  });

  const handleDelete = async (id: string) => {
    await removeCategory.mutateAsync(id);
    setIsOpenPopUp('');
  };

  return (
    <div className='flex h-screen w-full overflow-y-auto flex-col items-center bg-slate-50 px-4 py-10 sm:w-4/5 sm:px-20'>
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
            <Table isStriped aria-label='Example table with dynamic content'>
              <TableHeader>
                <TableColumn>No</TableColumn>
                <TableColumn>Nama</TableColumn>
                <TableColumn>Aksi</TableColumn>
              </TableHeader>
              <TableBody
                items={categories}
                emptyContent={error ? `Error: ${error.message}`: 'Tidak ada kategori yang ditemukan'}
                isLoading={isLoadingcategories}
                loadingContent={
                  <div className='flex justify-center my-8 items-center gap-4'>
                    <CircularProgress size="30px" />
                    <p>Memuat...</p>
                  </div>
                }
              >
                {(item: Category) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {limit * (page - 1) + categories.indexOf(item) + 1}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
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
          <div className='flex overflow-x-auto justify-center mt-6'>
            <Pagination
              count={categoriesData?.data?.totalPage || 0}
              page={page}
              onChange={(_, value: number) => setPage(value)}
            />
          </div>
        </div>
      ) : isCreating ? (
        <form
          onSubmit={onCreate}
          className='flex w-full flex-col gap-4 bg-white p-4 shadow sm:p-6'
        >
          <h2 className='font-secondary text-lg font-bold text-yellow-main sm:text-2xl'>
            Buat Kategori Baru
          </h2>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='name'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Nama Kategori
              </label>
              <Controller
                name='name'
                control={controlCreate}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    className='w-full rounded border p-2'
                  />
                )}
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
              disabled={loading}
              className={`mt-4 rounded bg-yellow-main px-4 py-2 font-medium text-white hover:bg-yellow-600 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Kirim
            </button>
          </div>
        </form>
      ) : isEditing ? (
        <form
          onSubmit={onEdit}
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
                Nama Kategori
              </label>
              <Controller
                name='name'
                control={controlEdit}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    className='w-full rounded border p-2'
                  />
                )}
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
              disabled={loading}
              className={`mt-4 rounded bg-yellow-main px-4 py-2 font-medium text-white hover:bg-yellow-600 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Kirim
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default CategorySection;
