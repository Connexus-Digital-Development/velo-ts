// Quote Types
// Type definitions for quote data structures used in the application

export interface Bicycle {
  make: string;
  model: string;
  homeValue: number;
  isElectric?: boolean;
}

export interface QuoteResponse {
  declineReason: string | null;
  quoteReference: string;
  referralReason: string | null;
  // Add other quote response properties as needed
  [key: string]: any; // Temporary for unknown properties
}

export interface CoreQuote {
  isElectric: boolean;
  includeAccessoriesCover: boolean;
  includeWorldWideCover: boolean;
  includeSportCover: boolean;
  includePersonalAccidentCover: boolean;
  bicycles: Bicycle[];
  title: string;
  forename: string;
  surname: string;
  dateOfBirth: string;
  number: string;
  emailaddress: string;
  house?: string;
  street: string;
  city: string;
  locality: string;
  county: string;
  postcode: string;
  quoteResponse: QuoteResponse;
  sourceBusinessId: string;
  allowTelephoneFromAdmin?: boolean;
  allowMailFromAdmin?: boolean;
  allowTelephoneFromThirdParty?: boolean;
  allowMailFromThirdParty?: boolean;
  awayValue: number;
  [key: string]: any; // Temporary for unknown properties
}

export interface PerformanceQuote {
  includePersonalAccidentCover: boolean;
  quoteResponse: QuoteResponse;
  [key: string]: any; // Temporary for unknown properties
}

export interface SelectedCoreScheme {
  // Define properties based on actual usage
  [key: string]: any; // Temporary for unknown properties
}

// Risk Model types for useRiskModelAdaptor
export interface RiskModelProposer {
  title: string;
  titleId: number;
  forename: string;
  initials: string;
  surname: string;
  emailAddress: string;
  dateOfBirth: string;
  gender: string;
  address: {
    house: string;
    postcode: string;
    street: string;
    locality: string;
    city: string;
    county: string;
    country: string;
  };
  telephone: {
    number: string;
    telephoneTypeId: string;
  };
}

export interface RiskModelPolicy {
  policyReference: string | null;
  policyStatusId: string | null;
  paymentPlanId: string | null;
  portfolioKey: string | null;
  agentId: string | null;
  productId: string | null;
  schemeId: string;
  schemeTable: number;
  premium: number | null;
  stopRenewal: string | null;
  insurerPolicyReference: string | null;
  createdBy: string | null;
  coverStartDate: Date;
  coverEndDate: Date;
  inceptionDate: string | null;
  originalInceptionDate: string | null;
  GuaranteeDate: string | null;
}

export interface RiskModelMarketing {
  sourceOriginId: string;
  sourceBusinessId: string;
  allowMailFromAdmin: boolean;
  allowMailFromThirdParty: boolean;
  allowTelephoneFromAdmin: boolean;
  allowTelephoneFromThirdParty: boolean;
  preferredMethodOfContact: string;
  preferredMethodOfContact_id: string;
  reference: string;
  contactByPostAndEmail: boolean;
}

export interface RiskModel {
  homeValue: number;
  awayValue: number;
  bicycles: Bicycle[];
  hasSecondaryAddress: boolean;
  secondaryAddress: {
    address: {
      city: string;
      country: string;
      county: string;
      house: string;
      locality: string;
      postcode: string;
    };
  };
  isElectric: boolean;
  publicLiabilityCoverId: string;
  includeFamilyCover: boolean;
  accessoriesCoverId: string;
  hasPreviousClaims: boolean;
  saleId: string | null;
  includeWorldwideCover: boolean;
  includeSportsCover: boolean;
  includeSportCover: boolean;
  includePersonalAccidentCover: boolean;
  includePersonalAccidentCoverCore: boolean;
  includePersonalAccidentCoverPerformance: boolean;
  includeRoadRageCover: boolean;
  includeAccessoriesCover: boolean;
  europeanCover: boolean;
  cycleHire: boolean;
  proposer: RiskModelProposer;
  policy: RiskModelPolicy;
  marketing: RiskModelMarketing;
  paymentDetails: {
    paymentTypeId: string | null;
    bankDetails: any | null;
    cardDetails: any | null;
  };
  callCentreUserID: string | null;
  aggregatorQuoteId: string | null;
  newDD: boolean;
  globalPayTransactionId?: string; // Added for payment processing
}
