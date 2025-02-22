interface Article {
  id: string;
  title: string;
  content: string;
  image: string | null;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
}

export function typecastArticle(data: any): Article[] | undefined {
  return data as Article[] | undefined;
}

export function typecastCategory(data: any): Category[] | undefined {
  return data as Category[] | undefined;
}

export type { Article, Category };
