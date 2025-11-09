import { type CoreQuote, type RiskModel } from "@/models/QuoteTypes";
import { aggregatorApiClient, transactorApiClient } from "../apiClient";

// API service functions for quote operations
export const quotesApi = {
  // Generate quote - POST to transactor
  generateQuote: (riskModel: RiskModel): Promise<CoreQuote[]> =>
    transactorApiClient.post("/PedalCycle/GetQuote", riskModel),

  // Retrieve quote by ID - POST to aggregator
  retrieveQuote: (quoteId: string): Promise<CoreQuote> =>
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
  }): Promise<CoreQuote> =>
    transactorApiClient.post("/PedalCycle/RetrieveQuote", data),
};
