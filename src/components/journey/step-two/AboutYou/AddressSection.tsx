import { type FormikProps } from "formik";
import { type AboutYouFormValues } from "@/models/JourneyComponentTypes";
import type { AddressLookupResult } from "@/types/api";
import AddressPreview from "../AddressPreview";
import ManualAddressEntry from "../ManualAddressEntry";
import Spinner from "@/components/shared/Spinner";

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
  setShowManualAddress,
  isPending,
  postcodeRegex,
  handleFindAddress,
  handleAddressSelect,
}: AddressSectionProps) => {
  return (
    <>
      {gState.hideAddressForm === false && (
        <div className="row">
          {formik.touched.hideAddressForm &&
          formik.errors.hideAddressForm ? (
            <small id="hideAddressForm" className="redFont mt-1">
              {formik.errors.hideAddressForm}
            </small>
          ) : null}
          <div id="left" className="col-12 col-sm-6">
            <div className="col-12 col-sm-12 mb-3">
              <label className="form-label">House number or name</label>
              <input
                type="text"
                className="form-control"
                id="houseNumber"
                autoComplete="off"
                // placeholder="Enter house name or house number"
                value={formik.values.houseNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <label className="form-label mt-3">Postcode*</label>
              <input
                type="text"
                className={`form-control ${
                  formik.errors.postalCode
                    ? formik.touched.postalCode && "is-invalid"
                    : formik.touched.postalCode && "is-valid"
                }`}
                id="postalCode"
                autoComplete="off"
                // placeholder="Enter postcode to search"
                value={formik.values.postalCode}
                onChange={(e) => {
                  e.currentTarget.value =
                    e.currentTarget.value.toUpperCase();
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.postalCode && formik.errors.postalCode ? (
                <small className="redFont mt-1">
                  {formik.errors.postalCode}
                </small>
              ) : null}
            </div>
            <div className="col-12 col-sm-12 ">
              <button
                className="btn btn-primary btn-wider col-12 col-md-5 mb-1"
                disabled={
                  formik.values.postalCode.length < 5 ||
                  !postcodeRegex.test(formik.values.postalCode)
                }
                onClick={handleFindAddress}
              >
                Find Address
              </button>

              <a
                className="btn btn-green btn-wider col-12 col-md-5 offset-md-2"
                onClick={() => {
                  formik.setFieldValue("showManualAddress", true);
                  formik.setFieldValue(
                    "addressIsValid",
                    formik.values.houseNo?.length > 1 ||
                      formik.values.addressLine1?.length > 1,
                  );
                  setShowManualAddress(true);
                  // setAddressesFound(false);
                }}
              >
                Enter manually
              </a>
            </div>
            {isPending && <Spinner colour="velo-blue" />}
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

            {addressesFound === true && (
              <select
                // type="text"
                className="form-control form-select mt-3"
                id="AddressDD"
                onChange={(e) => {
                  handleAddressSelect(e.target.value);
                }}
                onBlur={formik.handleBlur}
                // placeholder="select "
              >
                <option>Please select</option>
                {addressData?.Value?.map((address, index) => {
                  return (
                    <option key={index} id={`opt-${index}`} value={index}>
                      {address.organisation !== null &&
                        address.organisation}
                      {address.subHouseName !== null &&
                        address.subHouseName + ", "}
                      {address.houseName !== null &&
                        address.houseName + ", "}
                      {address.houseNumber} {address.street},{" "}
                      {address.townOrCity}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
        </div>
      )}

      {gState.hideAddressForm === true && (
        <AddressPreview formik={formik} />
      )}
    </>
  );
};

export default AddressSection;