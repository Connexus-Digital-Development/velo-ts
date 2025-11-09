import { type RiskModel, type CoreQuote } from "@/models/QuoteTypes";
import { type ExecResponse } from "@/models/api";
import { aggregatorApiClient, transactorApiClient } from "../apiClient";

// API service functions for quote operations
export const quotesApi = {
  // Generate quote - POST to transactor
  generateQuote: (riskModel: RiskModel): Promise<ExecResponse<CoreQuote[]>> =>
    transactorApiClient.post("/PedalCycle/GetQuote", riskModel),

  // Retrieve quote by ID - POST to aggregator
  retrieveQuote: (quoteId: string): Promise<ExecResponse<CoreQuote>> =>
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
  }): Promise<ExecResponse<CoreQuote>> =>
    transactorApiClient.post("/PedalCycle/RetrieveQuote", data),
};
