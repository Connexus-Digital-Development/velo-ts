// Service Types
// Type definitions for API services and their request/response structures

// VeloAPIService Types
export interface OfferData {
  name: string;
  offerRules?: string;
  defaultCode?: string;
  footerText?: string;
  jouneryHeaderText?: string;
  offerIcon?: string;
  status?: number;
}

export interface TransactorNoteRequest {
  [key: string]: any; // Define based on actual usage
}

export interface TransactorNoteResponse {
  [key: string]: any; // Define based on actual usage
}

// paymentService Types
export interface PaymentValidationPayload {
  [key: string]: any; // Define based on actual payment structure
}

export interface PaymentValidationResponse {
  [key: string]: any; // Define based on actual response structure
}

export interface AccessTokenPayload {
  [key: string]: any; // Define based on actual token request structure
}

export interface AccessTokenResponse {
  accessToken: string;
  [key: string]: any; // Additional token properties
}

export interface CycleInsurancePurchase {
  houseNameNumber: string;
  addressLine1: string;
  addressLine2: string;
  townCity: string;
  postCode: string;
  email: string;
  telephone: string;
  amountToCharge: number;
}

// TransactorService Types
export interface SourceOfBusiness {
  id: string;
  name: string;
  [key: string]: any; // Additional properties
}

export interface OfferDetails {
  code: string;
  discountAmount?: number;
  discountType?: string;
  [key: string]: any; // Additional offer properties
}

export interface QuoteRequestData {
  [key: string]: any; // Define based on actual quote request structure
}

export interface QuoteResponse {
  quoteReference?: string;
  premium?: number;
  declineReason?: string;
  referralReason?: string;
  [key: string]: any; // Additional quote properties
}

export interface QuoteEmailSendRequest {
  quoteReferences: string[];
  [key: string]: any; // Additional email properties
}

export interface PolicyInceptionRequest {
  [key: string]: any; // Define based on actual policy inception structure
}

export interface PolicyInceptionResponse {
  policyReference: string;
  [key: string]: any; // Additional policy properties
}

// restApiCommBaseService Types
export interface ApiError {
  message?: string;
  error_description?: string;
  status?: number;
  [key: string]: any;
}

// SanctionsSearchService Types (if used)
export interface SanctionsSearchRequest {
  [key: string]: any;
}

export interface SanctionsSearchResponse {
  [key: string]: any;
}

// RecaptchaHelper Types (if used)
export interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  "error-codes"?: string[];
}

// loggingService Types (if used)
export interface LogEntry {
  level: "error" | "warn" | "info" | "debug";
  message: string;
  timestamp?: Date;
  [key: string]: any;
}
