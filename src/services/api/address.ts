import { type AddressLookupResponse } from "@/models/api";
import { veloApiClient } from "../apiClient";

// API service functions for address operations
export const addressApi = {
  lookupByPostcode: (postcode: string): Promise<AddressLookupResponse> =>
    veloApiClient.get(
      `/api/AddressLookup/AddressLookup?postcode=${encodeURIComponent(postcode)}`,
    ),
};
