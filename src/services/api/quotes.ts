import { type CoreQuote, type RiskModel } from "@/models/QuoteTypes";
import { aggregatorApiClient, transactorApiClient } from "../apiClient";

let inFlightGenerateQuoteKey: string | null = null;
let inFlightGenerateQuoteRequest: Promise<CoreQuote[]> | null = null;

// API service functions for quote operations
export const quotesApi = {
  // Generate quote - POST to transactor
  generateQuote: (riskModel: RiskModel): Promise<CoreQuote[]> => {
    const requestKey = JSON.stringify(riskModel);

    if (
      inFlightGenerateQuoteRequest !== null &&
      inFlightGenerateQuoteKey === requestKey
    ) {
      return inFlightGenerateQuoteRequest;
    }

    inFlightGenerateQuoteKey = requestKey;
    inFlightGenerateQuoteRequest = transactorApiClient
      .post<any>("/PedalCycle/GetQuote", riskModel)
      .then((response) => {
        if (Array.isArray(response)) {
          return response as CoreQuote[];
        }

        const quotes = response?.Value ?? response?.value ?? [];
        return Array.isArray(quotes) ? (quotes as CoreQuote[]) : [];
      })
      .finally(() => {
        if (inFlightGenerateQuoteKey === requestKey) {
          inFlightGenerateQuoteKey = null;
          inFlightGenerateQuoteRequest = null;
        }
      });

    return inFlightGenerateQuoteRequest;
  },

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
