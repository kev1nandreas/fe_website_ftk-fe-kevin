'use client';

import dynamic from 'next/dynamic';
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
import { Spinner } from '@heroui/spinner';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'quill/dist/quill.core.css';
import Confirmation from './Confirmation';
import { useFetchArticles } from '@/app/api/useFetchArticle';
import { Article, typecastArticle, typecastCategory } from '@/types/article';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { parseDateShort } from '@/lib/utils';
import { PopUpArticle } from './PopUpArticle';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { fetchCategories } from '@/app/admin/kategori/api/useCategory';
import {
  createArticle,
  deleteArticle,
  editArticle,
  parseFormData,
} from '@/app/admin/artikel/api/useArticlesCUD';
import CircularProgress from '@mui/material/CircularProgress';

const ArticleSection = () => {
  function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
      const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
      return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
  }

  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [keyword, newKeyword] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const debouncedSearch = useDebounce(keyword, 500);
  const [isOpenPopUp, setIsOpenPopUp] = useState('');
  const [isOpenDesc, setIsOpenDesc] = useState<Article | null>(null);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const {
    data: articlesData,
    refetch: refetchArticles,
    isLoading: isLoadingArticles,
    error
  } = useFetchArticles(limit, page, debouncedSearch);
  const { data: categoriesData } = fetchCategories();
  const articles = typecastArticle(articlesData?.data?.articles) || [];
  const categories = typecastCategory(categoriesData?.data?.categories);

  useEffect(() => {
    refetchArticles();
  }, [debouncedSearch, page]);

  useEffect(() => {
    if (isEditing) {
      resetEdit({
        title: isEditing.title,
        content: isEditing.content,
        categoryId: isEditing.category.id,
        image: undefined,
      });
    }
  }, [isEditing]);

  const formSchema = z.object({
    title: z.string().nonempty('Title is required'),
    content: z.string().nonempty('Content is required'),
    categoryId: z.string().nonempty('Category is required'),
    image: z.instanceof(File).optional(),
  });

  type FormInputs = z.infer<typeof formSchema>;

  const {
    control: controlCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: errorsCreate },
    reset: resetCreate,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      categoryId: '',
      image: undefined,
    },
  });

  const {
    control: controlEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      categoryId: '',
      image: undefined,
    },
  });

  const newArticle = createArticle({
    onSuccess: () => {
      toast.success('Artikel berhasil dibuat');
      setIsCreating(false);
      resetCreate();
      refetchArticles();
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const renewArticle = editArticle({
    onSuccess: () => {
      toast.success('Artikel berhasil diubah');
      setIsEditing(null);
      refetchArticles();
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const removeArticle = deleteArticle({
    onSuccess: () => {
      toast.success('Artikel berhasil dihapus');
      setIsOpenPopUp('');
      refetchArticles();
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const onCreate = handleSubmitCreate(async (data) => {
    setLoading(true);
    const formdata = parseFormData(data);
    await newArticle.mutateAsync(formdata);
    setLoading(false);
  });

  const onEdit = handleSubmitEdit(async (data) => {
    setLoading(true);
    const formdata = parseFormData(data);
    if (formdata.get('title') === isEditing?.title) {
      formdata.delete('title');
    }
    formdata.append('id', isEditing?.id || '');
    await renewArticle.mutateAsync(formdata);
    setLoading(false);
  });

  const handleDelete = async (id: string) => {
    setLoading(true);
    await removeArticle.mutateAsync(id);
    setLoading(false);
  };

  return (
    <div className='flex h-screen w-full overflow-y-auto flex-col items-center bg-slate-50 px-4 py-10 sm:w-4/5 sm:px-20'>
      {isOpenPopUp && (
        <Confirmation
          onCancel={() => setIsOpenPopUp('')}
          onConfirm={() => handleDelete(isOpenPopUp)}
          object='artikel'
        />
      )}

      {isOpenDesc && (
        <PopUpArticle
          data={isOpenDesc}
          isOpen={isOpenDesc}
          onClose={() => setIsOpenDesc(null)}
        />
      )}

      {!isCreating && !isEditing ? (
        <div className='w-full'>
          <div className='flex w-full flex-col items-center justify-between sm:flex-row'>
            <h1 className='font-secondary text-2xl font-bold text-base-dark sm:text-3xl'>
              Artikel
            </h1>
            <button
              onClick={() => setIsCreating(true)}
              className='mt-4 flex w-full items-center gap-x-2 rounded-md bg-yellow-main hover:bg-yellow-dark-1 sm:mt-0 sm:w-auto sm:px-5 p-3'
            >
              <FaPlus className='fill-white' />
              <p className='font-secondary text-sm font-normal text-white sm:text-lg'>
                Buat Artikel
              </p>
            </button>
          </div>

          <div>
            <input
              type='text'
              name='keyword'
              id='keyword'
              value={keyword}
              className='border-2 p-2 px-4 rounded-lg mt-4 w-[18rem] focus:border-yellow-main focus:outline-none'
              placeholder='Cari kata kunci... '
              onChange={(e) => newKeyword(e.target.value)}
            />
          </div>

          {/* tabel artikel */}
          <div className='overflow-x-auto shadow-md sm:rounded-lg mt-2'>
            <Table isStriped aria-label='Example table with dynamic content'>
              <TableHeader>
                <TableColumn>No</TableColumn>
                <TableColumn>Judul</TableColumn>
                <TableColumn>Konten</TableColumn>
                <TableColumn>Gambar</TableColumn>
                <TableColumn>Tanggal dibuat</TableColumn>
                <TableColumn>Aksi</TableColumn>
              </TableHeader>
              <TableBody
                items={articles}
                emptyContent={error ? `Error: ${error.message}`: 'Tidak ada artikel yang ditemukan' }
                isLoading={isLoadingArticles}
                loadingContent={
                  <div className='flex justify-center my-8 items-center gap-4'>
                    <CircularProgress size="30px" />
                    <p>Memuat...</p>
                  </div>
                }
              >
                {(item: Article) => (
                  <TableRow key={item.id} className='cursor-pointer'>
                    <TableCell onClick={() => setIsOpenDesc(item)}>
                      {limit * (page - 1) + articles.indexOf(item) + 1}
                    </TableCell>
                    <TableCell onClick={() => setIsOpenDesc(item)}>
                      {item.title}
                    </TableCell>
                    <TableCell onClick={() => setIsOpenDesc(item)}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            item.content.length > 500
                              ? `${item.content.substring(0, 500)}...`
                              : `${item.content.substring(0, item.content.length - 15)}...`,
                        }}
                      />
                    </TableCell>
                    <TableCell onClick={() => setIsOpenDesc(item)}>
                      {item.image ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${item.image}`}
                          alt='Image'
                          width={20}
                          height={20}
                          className='hidden lg:block w-[6rem] h-[6rem] rounded-md'
                        />
                      ) : (
                        <div className='hidden lg:flex w-[6rem] h-[6rem] bg-gray-200 rounded-md items-center justify-center text-center'>
                          Tidak ada gambar
                        </div>
                      )}
                    </TableCell>
                    <TableCell onClick={() => setIsOpenDesc(item)}>
                      {parseDateShort(item.createdAt)}
                    </TableCell>
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
              count={articlesData?.data?.totalPage}
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
            Buat Artikel Baru
          </h2>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='title'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Judul
              </label>
              <Controller
                name='title'
                control={controlCreate}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    className='w-full rounded border p-2'
                    placeholder='Enter title'
                  />
                )}
              />
            </div>
            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='content'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Konten
              </label>
              <Controller
                name='content'
                control={controlCreate}
                render={({ field }) => (
                  <ReactQuill {...field} className='mb-10' theme='snow' />
                )}
              />
            </div>

            {/* Dropdown untuk memilih kategori */}
            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='category'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Kategori
              </label>
              <Controller
                name='categoryId'
                control={controlCreate}
                render={({ field }) => (
                  <select
                    {...field}
                    id='category'
                    required
                    className='w-full rounded border p-2'
                  >
                    <option value=''>Pilih Kategori</option>
                    {categories &&
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                )}
              />
            </div>

            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='image'
                className='font-secondary text-sm font-medium sm:text-lg flex items-center gap-x-2'
              >
                Gambar
                <div
                  className='relative'
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <IoIosInformationCircleOutline className='text-red-400' />
                  {showTooltip && (
                    <span className='absolute text-center bg-slate-400 text-white text-[10px] py-1 px-2 rounded-lg w-[12rem] bottom-5 left-2'>
                      Hanya dapat memilih 1 gambar
                    </span>
                  )}
                </div>
              </label>
              <Controller
                name='image'
                control={controlCreate}
                render={({ field: { onChange } }) => (
                  <input
                    id='image'
                    type='file'
                    accept='image/*'
                    className='w-full'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                    }}
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
              className={`mt-4 rounded px-4 py-2 font-medium text-white bg-yellow-main hover:bg-yellow-700 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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
            Edit Artikel
          </h2>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='title'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Judul
              </label>
              <Controller
                name='title'
                control={controlEdit}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    className='w-full rounded border p-2'
                    placeholder='Enter title'
                  />
                )}
              />
            </div>
            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='content'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Konten
              </label>
              <Controller
                name='content'
                control={controlEdit}
                render={({ field }) => (
                  <ReactQuill {...field} className='mb-10' theme='snow' />
                )}
              />
            </div>

            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='category'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Kategori
              </label>
              <Controller
                name='categoryId'
                control={controlEdit}
                render={({ field }) => (
                  <select
                    {...field}
                    id='category'
                    className='w-full rounded border p-2'
                  >
                    <option value=''>Pilih Kategori</option>
                    {categories &&
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                )}
              />
            </div>

            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='image'
                className='font-secondary text-sm font-medium sm:text-lg flex items-center gap-x-2'
              >
                Gambar
                <div
                  className='relative'
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <IoIosInformationCircleOutline className='text-red-400' />
                  {showTooltip && (
                    <span className='absolute text-center bg-slate-400 text-white text-[10px] py-1 px-2 rounded-lg w-[12rem] bottom-5 left-2'>
                      Hanya dapat memilih 1 gambar
                    </span>
                  )}
                </div>
              </label>
              <Controller
                name='image'
                control={controlEdit}
                render={({ field: { onChange } }) => (
                  <input
                    id='image'
                    type='file'
                    accept='image/*'
                    className='w-full'
                    onChange={(e) => {
                      const file = e.target.files?.[0]; // Get the selected file
                      onChange(file); // Pass file to React Hook Form
                    }}
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
              className={`mt-4 rounded px-4 py-2 font-medium text-white bg-yellow-main hover:bg-yellow-700 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Kirim
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default ArticleSection;
