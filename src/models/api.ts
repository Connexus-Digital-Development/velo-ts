// API Types for Velosure API
// Generated from C# API analysis

// Base response wrapper used by most API endpoints
export interface ExecResponse<T = any> {
  ErrorCode: number;
  Message: string;
  Success: boolean;
  Value?: T;
}

// Simple response without generic value
export interface ApiResponse {
  ErrorCode: number;
  Message: string;
  Success: boolean;
}

// Article-related types
export interface ArticleCategory {
  id: number;
  name: string;
}

export interface ArticleSEOTag {
  id: number;
  name: string;
}

export interface ArticleSEOTagsEntry {
  tagsId: number;
  tag: ArticleSEOTag;
}

export interface Article {
  id: number;
  headline: string;
  subHeading: string;
  category: ArticleCategory;
  imageUrl: string;
  body: string;
  author: string;
  authorImage: string;
  publishedDate: string;
  seoTitle: string;
  seoDescription: string;
  articleSEOTags: ArticleSEOTagsEntry[];
  pageURL: string;
}

// Payment API Types
export interface CycleInsurancePurchase {
  houseNameNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  townCity?: string;
  postCode?: string;
  email?: string;
  telephone?: string;
  amountToCharge: number;
}

export interface PaymentResponse {
  responseCode: string;
  responseMessage: string;
  transactionId: string;
}

export interface PaymentAnswerModel {
  ACCOUNT?: string;
  AMOUNT?: string;
  AUTHCODE?: string;
  AVSADDRESSRESULT?: string;
  AVSPOSTCODERESULT?: string;
  BATCHID?: string;
  BILLING_CO?: string;
  BILLING_CODE?: string;
  CVNRESULT?: string;
  HPP_ADDRESS_MATCH_INDICATOR?: string;
  HPP_BILLING_CITY?: string;
  HPP_BILLING_COUNTRY?: string;
  HPP_BILLING_POSTALCODE?: string;
  HPP_BILLING_STREET1?: string;
  HPP_BILLING_STREET2?: string;
  HPP_BILLING_STREET3?: string;
  HPP_CUSTOMER_EMAIL?: string;
  HPP_CUSTOMER_PHONENUMBER_MOBILE?: string;
  HPP_FRAUDFILTER_RESULT?: string;
  HPP_SHIPPING_CITY?: string;
  HPP_SHIPPING_COUNTRY?: string;
  HPP_SHIPPING_POSTALCODE?: string;
  HPP_SHIPPING_STREET1?: string;
  HPP_SHIPPING_STREET2?: string;
  HPP_SHIPPING_STREET3?: string;
  MERCHANT_ID?: string;
  MESSAGE?: string;
  ORDER_ID?: string;
  PASREF?: string;
  RESULT?: string;
  SHA1HASH?: string;
  SHIPPING_CO?: string;
  SHIPPING_CODE?: string;
  SRD?: string;
  TIMESTAMP?: string;
  pas_uuid?: string;
}

// Email API Types
export interface AffiliateSchemeRequestViewModel {
  name: string;
  businessName: string;
  email: string;
}

export interface RequestCallbackViewModel {
  fullName: string;
  phoneNumber: string;
  acceptedPrivacyPolicy: boolean;
}

export interface ContactUsViewModel {
  natureOfEnquiry: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  enquiry: string;
  marketByTelephone: boolean;
  marketByEmail: boolean;
  marketByTelephoneCarbon: boolean;
  marketByEmailCarbon: boolean;
  acceptedPrivacyPolicy: boolean;
}

// Address Lookup API Types
export interface AddressLookupResult {
  organisation?: string;
  houseName?: string;
  subHouseName?: string;
  houseNumber?: string;
  street?: string;
  locality?: string;
  townOrCity?: string;
  county?: string;
  country?: string;
  postcode?: string;
  latitude?: number;
  longitude?: number;
}

// Bank Details API Types
// Note: These endpoints return ExecResponse without a specific typed Value

// Transactor Notes API Types
export interface TransactorNotesRequest {
  success: boolean;
  failure: boolean;
  error: boolean;
  reference: string;
  policyDetailsId: string;
}

// Recaptcha API Types
// Note: Returns raw string response from Google reCAPTCHA

// API Response Types for specific endpoints
export type PaymentAccessTokenResponse = ExecResponse<string>;
export type PaymentValidationResponse = ExecResponse<PaymentResponse>;
export type AddressLookupResponse = ExecResponse<AddressLookupResult[]>;
export type BankValidationResponse = ExecResponse; // Generic response without typed Value
export type EmailResponse = ApiResponse;
