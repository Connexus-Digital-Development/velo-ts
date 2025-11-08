// Journey Component Types
// Type definitions for journey-specific components and their props

import { type Bike } from "./JourneyTypes";

export interface AboutYourBikeProps {
  validateNextButton?: boolean;
}

export interface IndividualBikeProps {
  bike: Bike;
  validateNextButton?: boolean;
}

export interface PaymentsProps {
  fromExternalLink?: boolean;
  fromAggregator?: boolean;
  setRotate?: (rotate: boolean) => void;
  showPaymentWindow?: boolean;
  setShowPaymentWindow?: (show: boolean) => void;
  setPending?: (pending: boolean) => void;
}

export interface JourneyCheckProps {
  onContinue?: () => void;
}

export interface BikeSecurityProps {
  setLocationInvalid: (valid: boolean) => void;
}

export interface OptionalCoverProps {
  handleSCCheckbox: (checked: boolean) => void;
  handlePCCheckbox: (checked: boolean) => void;
  handleACCheckbox: (checked: boolean) => void;
  handleWCCheckbox: (checked: boolean) => void;
}

export interface QRPaymentProps {
  setShowPaymentWindow?: (show: boolean) => void;
}

// export interface AggregatorPaymentProps extends QRPaymentProps {
//   // Additional props for aggregator payment
// }

// Form value types
export interface BikeFormValues {
  bikeMake: string;
  bikeModel: string;
  bikeValue: string | number;
  isElectric: boolean | null;
}

export interface IndividualBikeFormValues extends BikeFormValues {
  id?: number;
}

// Event handler types
export type FormEventHandler = (e: React.FormEvent) => void;
export type ButtonClickHandler = (
  e: React.MouseEvent<HTMLButtonElement>,
) => void;
export type InputChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
) => void;
export type FocusEventHandler = (e: React.FocusEvent<HTMLInputElement>) => void;
export type CheckboxChangeHandler = (checked: boolean) => void;

// Common component prop patterns
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// export interface AboutYouProps {
//   // AboutYou component has no props, it's a standalone component
// }

// Address lookup API response types
export interface AddressLookupResponse {
  success: boolean;
  value: AddressItem[];
}

export interface AddressItem {
  organisation: string | null;
  houseNumber: string | null;
  houseName: string | null;
  subHouseName: string | null;
  street: string | null;
  townOrCity: string | null;
  locality: string | null;
  county: string | null;
  country: string | null; // Added country field
  postcode: string | null;
}

// AboutYou form values
export interface AboutYouFormValues {
  title: string;
  forename: string;
  surname: string;
  dob_d: number | null;
  dob_m: number | null;
  dob_y: number | null;
  telephoneNo: string;
  email: string;
  postalCode: string;
  coverStart: Date | null;
  showManualAddress: boolean;
  addressIsValid: boolean;
  disableSOB: boolean;
  hideAddressForm: boolean;
  houseNo: string;
  houseNumber: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  postcode: string;
  marketingReference: string;
  marketingOptIn: boolean;
  marketingPreferences: boolean;
  preferredMethodOfContact: string;
  iConfirm: boolean;
}

// YourAddress component types
// export interface YourAddressProps {
//   // YourAddress component has no props, it's a standalone component
// }

export interface YourAddressFormValues {
  postalCode: string;
  houseNumber: string;
}

// ManualAddressEntry component types
export interface ManualAddressEntryProps {
  formik: any; // TODO: Replace with proper Formik type when available
  gState: any; // TODO: Replace with proper JourneyState type when available
  setGState: (state: any) => void; // TODO: Replace with proper types when available
}

// AddressPreview component types
export interface AddressPreviewProps {
  formik: any; // TODO: Replace with proper Formik type when available
}

// AddressDropdown component types
export interface AddressDropdownProps {
  addressList: AddressLookupResponse | null;
}

// MarketingPreferences component types
export interface MarketingPreferencesProps {
  formik: any; // TODO: Replace with proper Formik type when available
}

// PreferenceButton component types
export interface PreferenceButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

// Quote data structure
export interface Quote {
  annualGrossPremium: number;
  basePremium: number;
  commission: number;
  declineReason: string | null;
  instalmentsApr: number;
  instalmentsFirstPayment: number;
  instalmentsGrossPremium: number;
  instalmentsInterestPc: number;
  instalmentsServiceCharge: number;
  instalmentsSubsequentPayments: number;
  ipt: number;
  netPremium: number;
  quoteReference: string;
  policyDetailsId?: string;
  referralReason: string | null;
  schemeId: string;
  schemeTable: number;
}

// YourQuote component types
export interface YourQuoteProps {
  error: string | null;
  coreQuote: Quote;
  performanceQuote: Quote;
  setIsLoading: (loading: boolean) => void;
  showError: boolean;
  clearShowError: () => void;
  canProceedToPayment: (canProceed: boolean) => void;
  showReQuote: boolean;
  showReQuoteCore: boolean;
  setShowReQuote: (show: boolean) => void;
  setShowReQuoteCore: (show: boolean) => void;
  showReQuoteMessage: boolean;
  setShowReQuoteMessage: (show: boolean) => void;
  showCoreReQuoteMessage: boolean;
  setShowCoreReQuoteMessage: (show: boolean) => void;
  showPerformanceReQuoteMessage: boolean;
  setShowPerformanceReQuoteMessage: (show: boolean) => void;
  fromExternalLink?: boolean;
}

// SummaryOfCover component types
export interface SummaryOfCoverProps {
  detailsText?: string;
  fromExternalLink?: boolean;
  validateNextButton?: boolean;
}

// SimpleBikeList component types
export interface SimpleBikeListProps {
  bikes: import("@/models/JourneyTypes").Bike[];
}

// QuoteReferral component types
export interface QuoteReferralProps {
  quoteReference: string;
}

// FeatureListPerformance component types
export interface FeatureListPerformanceProps {
  isCore: boolean;
  initPerformanceQuote: Quote;
  setIsLoading: (loading: boolean) => void;
  setPerformanceQuote: (quote: Quote) => void;
  unSelectAll: () => void;
  showReQuote: boolean;
  setShowReQuote: (show: boolean) => void;
  showReQuoteMessage: boolean;
  setShowReQuoteMessage: (show: boolean) => void;
  fromExternalLink: boolean;
  showReQuoteCore: boolean;
  clearShowError: () => void;
}

// FeatureListCore component types
export interface FeatureListCoreProps {
  isCore: boolean;
  initCoreQuote: Quote;
  setIsLoading: (loading: boolean) => void;
  setPerformanceQuote: (quote: Quote) => void;
  setCoreQuote: (quote: Quote) => void;
  unSelectAll: () => void;
  showReQuoteCore: boolean;
  setShowReQuoteCore: (show: boolean) => void;
  showReQuoteMessage: boolean;
  setShowReQuoteMessage: (show: boolean) => void;
  fromExternalLink: boolean;
  showReQuote: boolean;
  clearShowError: () => void;
}

// DocumentPreferences component types
// export interface DocumentPreferencesProps {
//   // No props required
// }

// Assumptions component types
export interface AssumptionsProps {
  setShowPaymentWindow: (show: boolean) => void;
}

// Declarations component types
export interface DeclarationsProps {
  setShowPaymentWindow?: (show: boolean) => void;
}

// DDGuarantee component types
export interface DDGuaranteeProps {
  readyToRead?: boolean;
}

// IndividualBikeRow component types
export interface IndividualBikeRowProps {
  bikeMake: string;
  bikeModel: string;
  lockName: string;
  bikeId: number;
  lockChecked: boolean;
  updateLockChecked: (bikeId: number, checked: boolean) => void;
}

// BikeListWithLockInfo component types
export interface BikeListWithLockInfoProps {
  bikes: import("@/models/JourneyTypes").Bike[];
  updateLockChecked: (bikeId: number, checked: boolean) => void;
}

// PaymentMethodSelector component types
export interface PaymentMethodSelectorProps {
  setShowPaymentWindow?: (show: boolean) => void;
}

// MonthlyPayments component types
// export interface MonthlyPaymentsProps {
//   // No props required
// }

// // OneOffPayment component types
// export interface OneOffPaymentProps {
//   // No props required
// }

// DDForm component types
export interface DDFormProps {
  formik: any; // TODO: Replace with proper Formik type when available
}

// Payment helper component types
export interface SinglePaymentProps {
  successMethod: (result: any) => void;
  failureMethod: (error: any) => void;
  gState: any; // TODO: Replace with proper JourneyState type when available
  uiLock: (lock: boolean) => void;
  threeDS: (show: boolean) => void;
  ddPayment?: boolean;
}

export interface CardPayProps {
  formik: any; // TODO: Replace with proper Formik type when available
}

export interface QuickPayProps {
  PaymentData: any;
  successMethod: (result: any) => void;
  failureMethod: (error: any) => void;
  uiLock: (lock: boolean) => void;
  gState: any; // TODO: Replace with proper JourneyState type when available
  errorMessage: (message: string) => void;
  ddPayment?: boolean;
}

// Page component types
// export interface StepOneProps {
//   // Page components typically have no props
// }

// export interface StepTwoProps {
//   // Page components typically have no props
// }

// export interface StepFourProps {
//   // Page components typically have no props
// }

// export interface QuoteSummaryProps {
//   // Page components typically have no props
// }

// export interface QRLandingPageProps {
//   // Page components typically have no props
// }

// export interface BeforeYouBeginProps {
//   // Page components typically have no props
// }
