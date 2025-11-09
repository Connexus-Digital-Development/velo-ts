import { veloApiClient } from "../apiClient";

export interface BankValidationData {
  sortCode: string;
  accNo: string;
}

// API service functions for bank validation operations
export const bankValidationApi = {
  // Validate UK bank account details
  validateUkBankAccount: (data: BankValidationData): Promise<any> =>
    veloApiClient.get(`/api/BankDetails/ValidateUkBankAccount?sortCode=${encodeURIComponent(
      data.sortCode
    )}&accNo=${encodeURIComponent(data.accNo)}`),
};