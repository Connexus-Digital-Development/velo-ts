import AutomaticAddressEntry from "../AutomaticAddressEntry";
import AddressPreview from "../AddressPreview";
import ManualAddressEntry from "../ManualAddressEntry";
import type { AddressSectionProps } from "../aboutYou.types";

const AddressSection = ({
  formik,
  gState,
  updateJourneyState,
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
        updateJourneyState={updateJourneyState}
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
          <p className="redFont mt-3">{error}</p>
          <ManualAddressEntry
            formik={formik}
            gState={gState}
            updateJourneyState={updateJourneyState}
          />
        </div>
      )}

      {gState.hideAddressForm && <AddressPreview formik={formik} />}
    </>
  );
};

export default AddressSection;
