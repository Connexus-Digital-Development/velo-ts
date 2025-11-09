import { type FormikProps } from "formik";
import { type AboutYouFormValues } from "@/models/JourneyComponentTypes";
import type { AddressLookupResult } from "@/models/api";
import AddressPreview from "../AddressPreview";
import ManualAddressEntry from "../ManualAddressEntry";
import AutomaticAddressEntry from "../AutomaticAddressEntry";

interface AddressSectionProps {
  formik: FormikProps<AboutYouFormValues>;
  gState: any;
  setGState: (state: any) => void;
  addressData: { Value?: AddressLookupResult[] } | undefined;
  error: string | null;
  addressesFound: boolean;
  showManualAddress: boolean;
  setShowManualAddress: (show: boolean) => void;
  isPending: boolean;
  postcodeRegex: RegExp;
  handleFindAddress: (e: React.FormEvent) => void;
  handleAddressSelect: (index: string) => void;
}

const AddressSection = ({
  formik,
  gState,
  setGState,
  addressData,
  error,
  addressesFound,
  showManualAddress,
  isPending,
  postcodeRegex,
  handleFindAddress,
  handleAddressSelect,
  setShowManualAddress,
}: AddressSectionProps) => {
  return (
    <>
      <AutomaticAddressEntry
        formik={formik}
        gState={gState}
        setGState={setGState}
        addressData={addressData}
        error={error}
        addressesFound={addressesFound}
        isPending={isPending}
        postcodeRegex={postcodeRegex}
        handleFindAddress={handleFindAddress}
        handleAddressSelect={handleAddressSelect}
        setShowManualAddress={setShowManualAddress}
      />

      {showManualAddress && (
        <div>
          <p className="redFont mt-3">{error} </p>
          <ManualAddressEntry
            formik={formik}
            gState={gState}
            setGState={setGState}
          />
        </div>
      )}
      {gState.hideAddressForm === true && <AddressPreview formik={formik} />}
    </>
  );
};

export default AddressSection;
