// Journey Component Types
// Type definitions for journey-specific components and their props

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

export interface YourAddressFormValues {
  postalCode: string;
  houseNumber: string;
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
  deposit: number;
}
