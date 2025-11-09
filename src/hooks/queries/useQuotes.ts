import { type RiskModel } from "@/models/QuoteTypes";
import { quotesApi } from "@/services/api/quotes";
import { type ExecResponse } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";

// Mutation hook for generating quotes
export const useGenerateQuote = () => {
  return useMutation({
    mutationFn: (riskModel: RiskModel) => quotesApi.generateQuote(riskModel),
    onSuccess: (data: ExecResponse<any[]>) => {
      // Handle successful quote generation
      // This will be called when the mutation succeeds
      console.log("Quote generated successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Quote generation failed:", error);
    },
  });
};

// Query hook for retrieving quotes by ID
export const useRetrieveQuote = (quoteId: string) => {
  return useQuery({
    queryKey: ["quotes", "retrieve", quoteId],
    queryFn: () => quotesApi.retrieveQuote(quoteId),
    enabled: !!quoteId,
    staleTime: 5 * 60 * 1000, // 5 minutes - quotes don't change often once retrieved
  });
};

// Mutation hook for retrieving quotes by details
export const useRetrieveQuoteByDetails = () => {
  return useMutation({
    mutationFn: (data: {
      QuoteReference: string;
      DOB: Date;
      postcode: string;
      policyDetailsID?: string;
      newDD: boolean;
    }) => quotesApi.retrieveQuoteByDetails(data),
    onSuccess: (data: ExecResponse<any>) => {
      console.log("Quote retrieved by details successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Quote retrieval by details failed:", error);
    },
  });
};
