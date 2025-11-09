import { type ExecResponse } from "@/types/api";
import { veloApiClient } from "../apiClient";

// API service functions for content operations (blogs, articles)
export const contentApi = {
  getArticles: (brand: string, count: number): Promise<ExecResponse<any[]>> =>
    veloApiClient.get(
      `/api/ConnexusCMS/Articles/GetNumberOfArticles/${brand}/${count}`,
    ),

  getArticleBySlug: (slug: string): Promise<ExecResponse<any>> =>
    veloApiClient.get(`/api/ConnexusCMS/Articles/GetArticleFromSlug/${slug}`),
};
