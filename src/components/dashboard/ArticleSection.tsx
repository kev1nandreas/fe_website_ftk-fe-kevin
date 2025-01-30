'use client';

import React, { useEffect, useState } from 'react';
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
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import 'quill/dist/quill.core.css';
import Confirmation from './Confirmation';

interface Article {
  category: Category;
  id: string;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
}

const ArticleSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<Article | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [keyword, newKeyword] = useState('');
  const [isOpenPopUp, setIsOpenPopUp] = useState('');

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `/articles/?page=${currentPage}&limit=6&search=${keyword}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 401) {
        errorToast('Unauthorized. Please check your token.');
        return;
      }

      const result = await response.json();

      if (result.status === 'success') {
        setTotalPages(result.data.totalPage);
        setArticles(result.data.articles);
      } else {
        errorToast(`Error: ${result.message}`);
      }
    } catch (error) {
      errorToast(`Error fetching articles: ${error}`);
      console.error('Error fetching articles:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `/categories`,
        {
          method: 'GET',
        },
      );

      if (response.ok) {
        const result = await response.json();
        setCategories(result.data.categories);
      } else {
        const errorResult = await response.json();
        errorToast(`Error: ${errorResult.message}`);
      }
    } catch (error) {
      errorToast(`Error fetching categories: ${error}`);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPage, keyword]);

  const handleDelete = async (id: string) => {
    setIsOpenPopUp('');
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `/articles/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      if (result.status === 'success') {
        successToast('Artikel berhasil dihapus!');
        setArticles(articles.filter((article) => article.id !== id.toString()));
      } else {
        errorToast(`Error: ${result.message}`);
      }
    } catch (error) {
      errorToast(`Failed to delete article: ${error}`);
      console.error('Failed to delete article:', error);
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newTitle);
      formData.append('content', newContent);
      if (newImage) {
        formData.append('image', newImage);
      }
      formData.append('categoryId', selectedCategory);

      const token = localStorage.getItem('token');
      const response = await fetch(
        `/articles`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const result = await response.json();
      if (result.status === 'success') {
        successToast('Artikel berhasil dibuat!');
        setIsCreating(false);
        setArticles([result.data, ...articles.slice(0, 4)]);
      } else {
        errorToast(`Error: ${result.message}`);
      }
    } catch (error) {
      errorToast(`Failed to create article: ${error}`);
    }
  };

  useEffect(() => {
    if (isEditing) {
      setNewTitle(isEditing.title);
      setNewContent(isEditing.content);
      setSelectedCategory(isEditing.category.id || '');
      fetchCategories();
    }
  }, [isEditing]);

  useEffect(() => {
    if (isCreating) {
      setNewTitle('');
      setNewContent('');
      setNewImage(null);
      setSelectedCategory('');
      fetchCategories();
    }
  }, [isCreating]);

  const handleEditArticle: (e: React.FormEvent) => Promise<void> = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();
    try {
      if (!isEditing) return;

      const formData = new FormData();

      if (newTitle !== isEditing.title) formData.append('title', newTitle);
      formData.append('content', newContent);
      formData.append('categoryId', selectedCategory);
      if (newImage) {
        formData.append('image', newImage);
      }

      const token = localStorage.getItem('token');
      const response = await fetch(
        `/articles/${isEditing.id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const result = await response.json();
      console.log(result);
      if (result.status === 'success') {
        successToast('Artikel berhasil diubah!');
        setIsEditing(null);
        setArticles(
          articles.map((article) =>
            article.id === isEditing.id ? result.data : article,
          ),
        );
      } else {
        errorToast(`Error: ${result.message}`);
      }
    } catch (error) {
      errorToast(`Failed to edit article: ${error}`);
      console.error('Failed to edit article:', error);
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
          object='artikel'
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
              className='border-2 p-2 px-4 rounded-lg mt-4 w-[20rem] focus:border-yellow-main focus:outline-none'
              placeholder='Search keyword... '
              onChange={(e) => newKeyword(e.target.value)}
            />
          </div>

          {/* tabel artikel */}
          <div className='overflow-x-auto shadow-md sm:rounded-lg mt-2'>
            <Table isStriped aria-label='Example table with dynamic content'>
              <TableHeader>
                <TableColumn>No</TableColumn>
                <TableColumn>Title</TableColumn>
                <TableColumn>Content</TableColumn>
                <TableColumn>Image</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody items={articles} emptyContent={'No rows to display.'}>
                {(item: Article) => (
                  <TableRow key={item.id}>
                    <TableCell>{articles.indexOf(item) + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            item.content.length > 500
                              ? `${item.content.substring(0, 500)}...`
                              : `${item.content.substring(0, item.content.length - 15)}...`,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {item.image ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${item.image}`}
                          alt='Image'
                          width={20}
                          height={20}
                          className='hidden lg:block w-[6rem] h-[6rem] rounded-md'
                        />
                      ) : (
                        <div className='hidden lg:flex w-[6rem] h-[6rem] bg-gray-200 rounded-md items-center justify-center'>
                          No Image
                        </div>
                      )}
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
          onSubmit={handleCreateArticle}
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
                Title
              </label>
              <input
                id='title'
                required
                type='text'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className='w-full rounded border p-2'
                placeholder='Enter title'
              />
            </div>
            <div className='flex flex-col gap-y-2'>
              <label
                // htmlFor='content'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Content
              </label>
              <ReactQuill
                className='mb-10'
                theme='snow'
                value={newContent}
                onChange={setNewContent}
              />
              {/* <textarea
                id='content'
                required
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                onInput={(e) => {
                  (e.target as HTMLTextAreaElement).style.height = 'auto'; // Reset the height
                  (e.target as HTMLTextAreaElement).style.height =
                    (e.target as HTMLTextAreaElement).scrollHeight + 'px';
                }}
                className='w-full resize-none overflow-hidden rounded border p-2'
                placeholder='Enter content'
                style={{ minHeight: '150px' }} // Optional: Set a minimum height for better UX
              /> */}
            </div>

            {/* Dropdown untuk memilih kategori */}
            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='category'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Category
              </label>
              <select
                id='category'
                required
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='w-full rounded border p-2'
              >
                <option value=''>Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='image'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Image
              </label>
              <input
                id='image'
                type='file'
                accept='image/*'
                onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                className='w-full'
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
              className='mt-4 rounded px-4 py-2 font-medium text-white bg-yellow-main hover:bg-yellow-700'
            >
              Submit
            </button>
          </div>
        </form>
      ) : isEditing ? (
        <form
          onSubmit={handleEditArticle}
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
                Title
              </label>
              <input
                id='title'
                type='text'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className='w-full rounded border p-2'
              />
            </div>
            <div className='flex flex-col gap-y-2'>
              <label
                // htmlFor='content'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Content
              </label>
              <ReactQuill
                className='mb-10'
                theme='snow'
                value={newContent}
                onChange={setNewContent}
              />
              {/* <textarea
                id='content'
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                onInput={(e) => {
                  (e.target as HTMLTextAreaElement).style.height = 'auto'; // Reset the height
                  (e.target as HTMLTextAreaElement).style.height =
                    (e.target as HTMLTextAreaElement).scrollHeight + 'px'; // Adjust height to content
                }}
                className='w-full resize-none overflow-hidden rounded border p-2'
                placeholder='Enter content'
                style={{ minHeight: '150px' }} // Optional: Set a minimum height for better UX
              /> */}
            </div>

            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='category'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Category
              </label>
              <select
                id='category'
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='w-full rounded border p-2'
              >
                <option value=''>Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='image'
                className='font-secondary text-sm font-medium sm:text-lg'
              >
                Image
              </label>
              <input
                id='image'
                type='file'
                accept='image/*'
                onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                className='w-full'
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
              className='mt-4 rounded px-4 py-2 font-medium text-white bg-yellow-main hover:bg-yellow-700'
            >
              Submit
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default ArticleSection;
