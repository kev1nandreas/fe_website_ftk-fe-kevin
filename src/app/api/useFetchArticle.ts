import { get } from '@/services/api/main/call';
import { MAIN_ENDPOINT } from '@/services/api/main/endpoint';
import { Article } from '@/types/article';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

interface ArticleResponse {
  status: boolean;
  message: string;
  data: Article[];
}

export const useFetchArticles = (
  limit: number,
  page: number,
  keyword?: string,
  onSuccess?: () => void,
  onError?: (error: any) => void,
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK, StatusCode } = await get(
        MAIN_ENDPOINT.Article.AllArticle,
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
    queryKey: ['fetch.articles', limit, page],
  }) as any;
};

export const fetchArticleByID = (
  id: string,
  onSuccess?: () => void,
  onError?: () => void,
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK, StatusCode } = await get(
        `${MAIN_ENDPOINT.Article.AllArticle}/${id}`,
      );
      if (!OK) {
        throw new Error((Kind as { message: string }).message || (Kind as { Message: string }).Message);
      }
      return Kind;
    },
    queryKey: ['fetch.article.by.id', id],
  }) as any;
};
