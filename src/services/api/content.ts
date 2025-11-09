import { type Article, type ArticleCategory } from "@/models/api";
import { type BlogPost, type FAQItem } from "@/models/MarketingComponentTypes";
import { veloApiClient } from "../apiClient";

// API service functions for content operations (blogs, articles)
export const contentApi = {
  getArticles: (brand: string, count: number): Promise<Article[]> =>
    veloApiClient.get(
      `/api/ConnexusCMS/Articles/GetNumberOfArticles/${brand}/${count}`,
    ),

  getAllArticles: (brand: string) =>
    veloApiClient.get<BlogPost[]>(
      `/api/ConnexusCMS/Articles/GetArticles/${brand}`,
    ),

  getCategories: (categoryType: string): Promise<ArticleCategory[]> =>
    veloApiClient.get(
      `/api/ConnexusCMS/Categories/GetCategoriesByType/${categoryType}`,
    ),

  getFAQs: (brand: string): Promise<FAQItem[]> =>
    veloApiClient.get(`/api/ConnexusCMS/FAQs/GetFAQs/${brand}`),

  getArticleBySlug: (slug: string) =>
    veloApiClient.get<BlogPost>(
      `/api/ConnexusCMS/Articles/GetArticleFromSlug/${slug}`,
    ),
};
