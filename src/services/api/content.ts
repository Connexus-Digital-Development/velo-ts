import { type ExecResponse } from "@/models/api";
import { veloApiClient } from "../apiClient";

// API service functions for content operations (blogs, articles)
export const contentApi = {
  getArticles: (brand: string, count: number): Promise<ExecResponse<any[]>> =>
    veloApiClient.get(
      `/api/ConnexusCMS/Articles/GetNumberOfArticles/${brand}/${count}`,
    ),

  getAllArticles: (brand: string): Promise<ExecResponse<any[]>> =>
    veloApiClient.get(`/api/ConnexusCMS/Articles/GetArticles/${brand}`),

  getCategories: (categoryType: string): Promise<ExecResponse<any[]>> =>
    veloApiClient.get(`/api/ConnexusCMS/Categories/GetCategoriesByType/${categoryType}`),

  getFAQs: (brand: string): Promise<ExecResponse<any[]>> =>
    veloApiClient.get(`/api/ConnexusCMS/FAQs/GetFAQs/${brand}`),

  getArticleBySlug: (slug: string): Promise<ExecResponse<any>> =>
    veloApiClient.get(`/api/ConnexusCMS/Articles/GetArticleFromSlug/${slug}`),
};
