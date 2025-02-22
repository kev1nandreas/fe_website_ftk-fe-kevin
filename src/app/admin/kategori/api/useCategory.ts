import { del, get, patch, post } from '@/services/api/main/call';
import { MAIN_ENDPOINT } from '@/services/api/main/endpoint';
import { CategoryInputs } from '@/types/inputs';
import { useMutation, useQuery } from '@tanstack/react-query';

export const fetchCategories = (
  limit?: number,
  page?: number,
  keyword?: string,
  onSuccess?: () => void,
  onError?: () => void,
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK, StatusCode } = await get(
        MAIN_ENDPOINT.Category.AllCategory,
        {
          limit: limit,
          page: page,
          search: keyword,
        },
      );
      if (!OK) {
        throw new Error((Kind as { message: string }).message || (Kind as { Message: string }).Message);
      }
      return Kind;
    },
    queryKey: ['fetch.categories', limit, page],
  }) as any;
};

export const createCategory = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (data: CategoryInputs) => {
      const { Kind, OK, StatusCode } = await post(
        MAIN_ENDPOINT.Category.AllCategory,
        { name: data.name },
      );
      if (!OK) {
        throw new Error((Kind as { message: string }).message || (Kind as { Message: string }).Message);
      }
      return Kind;
    },
    mutationKey: ['create.category'],
    onSuccess,
    onError,
  }) as any;
};

export const updateCategory = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (data: CategoryInputs) => {
      const { Kind, OK, StatusCode } = await patch(
        MAIN_ENDPOINT.Category.AllCategory + '/' + data.id,
        { name: data.name },
      );
      if (!OK) {
        throw new Error((Kind as { message: string }).message || (Kind as { Message: string }).Message);
      }
      return Kind;
    },
    mutationKey: ['update.category'],
    onSuccess,
    onError,
  }) as any;
};

export const deleteCategory = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const { Kind, OK, StatusCode } = await del(
        MAIN_ENDPOINT.Category.AllCategory + '/' + id,
      );
      if (!OK) {
        throw new Error((Kind as { message: string }).message || (Kind as { Message: string }).Message);
      }
      return Kind;
    },
    mutationKey: ['delete.category'],
    onSuccess,
    onError,
  }) as any;
};
