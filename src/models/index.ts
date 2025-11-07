// Export all model types and interfaces for cleaner imports
export type { Bike } from './JourneyTypes';
export type { StepOneVM } from './stepOneVM';
export { default as defaultBike } from './bike';

// Re-export types from individual files, avoiding naming conflicts
export * from './JourneyTypes';
export * from './JourneyComponentTypes';
export * from './MarketingComponentTypes';

// Export specific types from QuoteTypes and ServiceTypes to avoid conflicts
export type {
  CoreQuote,
  PerformanceQuote,
  RiskModel,
  QuoteResponse as QuoteTypesResponse
} from './QuoteTypes';

export type {
  OfferData,
  TransactorNoteRequest,
  TransactorNoteResponse,
  PaymentValidationPayload,
  PaymentValidationResponse,
  AccessTokenPayload,
  AccessTokenResponse,
  CycleInsurancePurchase,
  SourceOfBusiness,
  OfferDetails,
  QuoteRequestData,
  QuoteResponse as ServiceQuoteResponse,
  QuoteEmailSendRequest,
  PolicyInceptionRequest,
  PolicyInceptionResponse,
  ApiError,
  SanctionsSearchRequest,
  SanctionsSearchResponse,
  RecaptchaResponse,
  LogEntry
} from './ServiceTypes';