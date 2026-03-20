import { type AddressLookupResponse } from "@/models/api";
import { veloApiClient } from "../apiClient";

// API service functions for address operations
export const addressApi = {
  lookupByPostcode: async (postcode: string): Promise<AddressLookupResponse> => {
    const response = await veloApiClient.get<any>(
      `/api/AddressLookup/AddressLookup?postcode=${encodeURIComponent(postcode)}`,
    );

    const rawSuccess = response?.Success ?? response?.success ?? false;
    const rawValue = response?.Value ?? response?.value ?? [];

    return {
      ErrorCode: response?.ErrorCode ?? response?.errorCode ?? 0,
      Message: response?.Message ?? response?.message ?? "",
      Success: Boolean(rawSuccess),
      Value: Array.isArray(rawValue) ? rawValue : [],
    };
  },
};
