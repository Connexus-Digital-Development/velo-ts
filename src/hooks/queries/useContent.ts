import { type Article } from "@/models/api";
import { contentApi } from "@/services/api/content";
import { useQuery } from "@tanstack/react-query";

// React Query hooks for content management
export const useArticles = (brand: string, count: number) => {
  return useQuery({
    queryKey: ["content", "articles", brand, count],
    queryFn: async () => {
      try {
        const response = await contentApi.getArticles(brand, count);
        return response;
      } catch (error) {
        console.error("Error fetching articles:", error);
        throw new Error("Failed to fetch articles");
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes - content updates moderately
    retry: false, // Fail immediately without retries
    retryDelay: 0, // No delay between retries (though disabled)
  });
};

export const useAllArticles = (brand: string) => {
  return useQuery({
    queryKey: ["content", "all-articles", brand],
    queryFn: async () => {
      try {
        const response: Article[] = await contentApi.getAllArticles(brand);
        return response;
      } catch (error) {
        console.error("Error fetching all articles:", error);
        throw new Error("Failed to fetch all articles");
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes - content updates moderately
    retry: false, // Fail immediately without retries
    retryDelay: 0, // No delay between retries (though disabled)
  });
};

export const useCategories = (categoryType: string) => {
  return useQuery({
    queryKey: ["content", "categories", categoryType],
    queryFn: () => contentApi.getCategories(categoryType),
    staleTime: 30 * 60 * 1000, // 30 minutes - categories change infrequently
    retry: false, // Fail immediately without retries
    retryDelay: 0, // No delay between retries (though disabled)
  });
};

export const useFAQs = (brand: string) => {
  return useQuery({
    queryKey: ["content", "faqs", brand],
    queryFn: () => contentApi.getFAQs(brand),
    staleTime: 15 * 60 * 1000, // 15 minutes - FAQs don't change often
    retry: false, // Fail immediately without retries
    retryDelay: 0, // No delay between retries (though disabled)
  });
};

export const useArticle = (slug: string) => {
  return useQuery({
    queryKey: ["content", "article", slug],
    queryFn: async () => {
      try {
        const response: Article = await contentApi.getArticleBySlug(slug);
        return response;
      } catch (error) {
        console.error("Error fetching article:", error);
        throw new Error("Failed to fetch article");
      }
    },
    enabled: !!slug,
    staleTime: 30 * 60 * 1000, // 30 minutes - articles don't change often
  });
};
