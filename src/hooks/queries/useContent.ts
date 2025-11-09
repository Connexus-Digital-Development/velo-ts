import { useQuery } from '@tanstack/react-query';
import { contentApi } from '@/services/api/content';

// React Query hooks for content management
export const useArticles = (brand: string, count: number) => {
  return useQuery({
    queryKey: ['content', 'articles', brand, count],
    queryFn: () => contentApi.getArticles(brand, count),
    staleTime: 15 * 60 * 1000, // 15 minutes - content updates moderately
  });
};

export const useArticle = (slug: string) => {
  return useQuery({
    queryKey: ['content', 'article', slug],
    queryFn: () => contentApi.getArticleBySlug(slug),
    enabled: !!slug,
    staleTime: 30 * 60 * 1000, // 30 minutes - articles don't change often
  });
};