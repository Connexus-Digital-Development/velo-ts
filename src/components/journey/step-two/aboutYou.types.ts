import type { FormikProps } from "formik";
import type { ChangeEvent, MouseEventHandler } from "react";
import type { AboutYouFormValues, JourneyState } from "@/models";
import type { AddressLookupResponse } from "@/models/api";

export type JourneyStatePatch = Partial<JourneyState>;
export type UpdateJourneyState = (updates: JourneyStatePatch) => void;

export interface AboutYouSectionProps {
  formik: FormikProps<AboutYouFormValues>;
  gState: JourneyState;
  updateJourneyState: UpdateJourneyState;
}

export interface PersonalDetailsProps extends AboutYouSectionProps {
  days: number[];
  months: number[];
  years: number[];
}

export interface AddressSectionProps extends AboutYouSectionProps {
  addressData?: AddressLookupResponse;
  error: string | null;
  addressesFound: boolean;
  showManualAddress: boolean;
  setShowManualAddress: (show: boolean) => void;
  isPending: boolean;
  postcodeRegex: RegExp;
  handleFindAddress: MouseEventHandler<HTMLButtonElement>;
  handleAddressSelect: (index: string) => void;
}

export interface AutomaticAddressEntryProps
  extends Omit<AddressSectionProps, "showManualAddress"> {}

export interface CoverSectionProps extends AboutYouSectionProps {
  minDate: Date;
  maxDate: Date;
  customReference: boolean;
  retailerReference: boolean;
  marketingReference: string;
  selectedMarketingReference: string;
  handleStartEndDate: (date: Date | null) => void;
  handleMarketingReferenceChange: (
    event: ChangeEvent<HTMLSelectElement>,
  ) => void;
  handleCustomReferenceChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  handleRetailerReferenceChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}
