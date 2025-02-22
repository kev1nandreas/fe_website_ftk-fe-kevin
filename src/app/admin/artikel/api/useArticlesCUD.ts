import { del, patchArticle, upload } from '@/services/api/main/call';
import { MAIN_ENDPOINT } from '@/services/api/main/endpoint';
import { ArticleInputs } from '@/types/inputs';
import { useMutation } from '@tanstack/react-query';

export const parseFormData = (data: any) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

export const createArticle = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const { Kind, OK, StatusCode } = await upload(
        MAIN_ENDPOINT.Article.AllArticle,
        data,
      );
      if (!OK) {
        throw new Error((Kind as { message: string }).message || (Kind as { Message: string }).Message);
      }
      return Kind;
    },
    mutationKey: ['create.article'],
    onSuccess,
    onError,
  }) as any;
};

export const editArticle = ({
    onSuccess,
    onError,
}: {
    onSuccess: () => void;
    onError?: (error: any) => void;
}) => {
    return useMutation({
        mutationFn: async (data: FormData) => {
            const { Kind, OK, StatusCode } = await patchArticle(
                MAIN_ENDPOINT.Article.AllArticle + '/' + data.get('id'),
                data,
            );
            if (!OK) {
              throw new Error((Kind as { message: string }).message || (Kind as { Message: string }).Message);
            }
            return Kind;
        },
        mutationKey: ['edit.article'],
        onSuccess,
        onError,
    }) as any;
}

export const deleteArticle = ({
    onSuccess,
    onError,
}: {
    onSuccess: () => void;
    onError?: (error: any) => void;
}) => {
    return useMutation({
        mutationFn: async (id: string) => {
            const { Kind, OK, StatusCode } = await del(
                MAIN_ENDPOINT.Article.AllArticle + '/' + id,
            );
            console.log(Kind);
            if (!OK) {
              throw new Error((Kind as { message: string }).message || (Kind as { Message: string }).Message);
            }
            return Kind;
        },
        mutationKey: ['delete.article'],
        onSuccess,
        onError,
    }) as any;
}
