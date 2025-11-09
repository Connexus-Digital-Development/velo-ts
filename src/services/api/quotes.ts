import { type RiskModel } from "@/models/QuoteTypes";
import { type ExecResponse } from "@/types/api";
import { aggregatorApiClient, transactorApiClient } from "../apiClient";

// API service functions for quote operations
export const quotesApi = {
  // Generate quote - POST to transactor
  generateQuote: (riskModel: RiskModel): Promise<ExecResponse<any[]>> =>
    transactorApiClient.post("/PedalCycle/GetQuote", riskModel),

  // Retrieve quote by ID - POST to aggregator
  retrieveQuote: (quoteId: string): Promise<ExecResponse<any>> =>
    aggregatorApiClient.post("/AggregatorBackoffice/RetrieveQuote", {
      QuoteId: quoteId,
    }),

  // Retrieve quote by details (DOB + postcode) - POST to transactor
  retrieveQuoteByDetails: (data: {
    QuoteReference: string;
    DOB: Date;
    postcode: string;
    policyDetailsID?: string;
    newDD: boolean;
  }): Promise<ExecResponse<any>> =>
    transactorApiClient.post("/PedalCycle/RetrieveQuote", data),
};
