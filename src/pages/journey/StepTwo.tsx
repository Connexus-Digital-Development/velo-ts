import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AddressSection from "@/components/journey/step-two/AboutYouView/AddressSection";
import CoverSection from "@/components/journey/step-two/AboutYouView/CoverSection";
import PersonalDetails from "@/components/journey/step-two/AboutYouView/PersonalDetails";
import MarketingPreferences from "@/components/journey/step-two/MarketingPreferences";
import {
  ABOUT_YOU_POSTCODE_REGEX,
  DAY_OPTIONS,
  MARKETING_REFERENCE_OPTIONS,
  MONTH_OPTIONS,
  getYearRange,
} from "@/components/journey/step-two/aboutYou.shared";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import RegularBanner from "@/components/shared/RegularBanner";
import TopNavBlank from "@/components/shared/TopNavBlank";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import { useAddressLookup } from "@/hooks/queries/useAddress";
import { type AboutYouFormValues, type JourneyState } from "@/models";
import type { AddressLookupResult } from "@/models/api";
import { loggingService } from "@/services/loggingService";
import transactorService from "@/services/transactorService";
import { modelAdaptorHelper } from "@/utils/modelAdaptorHelper";

const isEmpty = (value?: string | null) => !value?.trim().length;

const getAddressSummary = (selectedAddress: AddressLookupResult) => {
  const organisation = selectedAddress.organisation ?? "";
  const subHouseName = selectedAddress.subHouseName ?? "";
  const houseName = selectedAddress.houseName ?? "";
  const houseNumber = selectedAddress.houseNumber ?? "";
  const street = selectedAddress.street ?? "";

  const combinedHouseName = [organisation, subHouseName, houseName]
    .filter(Boolean)
    .join(", ")
    .trim();

  return {
    houseNo: combinedHouseName || houseNumber,
    addressLine1: combinedHouseName ? `${houseNumber} ${street}`.trim() : street,
    addressLine2: selectedAddress.townOrCity ?? "",
    addressLine3: selectedAddress.locality ?? "",
    addressLine4: selectedAddress.county ?? "",
    postcode: selectedAddress.postcode ?? "",
  };
};

const getAddressStatePatch = (selectedAddress: AddressLookupResult) => ({
  organisation: selectedAddress.organisation ?? "",
  houseNo: selectedAddress.houseNumber ?? "",
  houseName: selectedAddress.houseName ?? "",
  houseSubName: selectedAddress.subHouseName ?? "",
  addressLine1: selectedAddress.street ?? "",
  addressLine2: selectedAddress.townOrCity ?? "",
  addressLine3: selectedAddress.locality ?? "",
  addressLine4: selectedAddress.county ?? "",
  postcode: selectedAddress.postcode ?? "",
  hideAddressForm: true,
});

const getMarketingReferenceMode = (reference: string | null) => {
  const value = reference ?? "";
  const retailerReference = value.startsWith("Retailer");
  const knownReference = MARKETING_REFERENCE_OPTIONS.some(
    (option) => option !== "Retailer" && option !== "Other" && option === value,
  );

  return {
    customReference: Boolean(value) && !retailerReference && !knownReference,
    retailerReference,
    selectedMarketingReference: retailerReference
      ? "Retailer"
      : knownReference
        ? value
        : value
          ? "Other"
          : "",
    referenceValue: retailerReference
      ? value.replace("Retailer -", "").replace("Retailer", "").trim()
      : knownReference
        ? value
        : value,
  };
};

const createValidationSchema = (earliestYear: number, latestYear: number) =>
  Yup.object({
    showManualAddress: Yup.boolean(),
    addressLine1IsValid: Yup.boolean(),
    houseIsValid: Yup.boolean(),
    disableSOB: Yup.boolean(),
    title: Yup.string()
      .min(1, "Please select your title")
      .required("Please select your title"),
    forename: Yup.string()
      .trim()
      .required("First name is required")
      .matches(
        /^(?=.{1,50}$)[a-z]+(?:[-'.\s][a-z]+)*$/i,
        "Please enter a valid first name",
      )
      .min(2, "First name is too short")
      .max(40, "First name is too long"),
    surname: Yup.string()
      .trim()
      .required("Second name is required")
      .matches(
        /^(?=.{1,50}$)[a-z]+(?:[-'.\s][a-z]+)*$/i,
        "Please enter a valid last name",
      )
      .min(2, "Second name is too short")
      .max(40, "Second name name is too long"),
    telephoneNo: Yup.string()
      .trim()
      .required("Telephone number is required")
      .min(9, "Telephone number is too short")
      .matches(
        /^(\+44\s?\d{10}|0044\s?\d{10}|0\s?\d{10})?$/,
        "Telephone number is invalid",
      ),
    email: Yup.string()
      .trim()
      .email()
      .required("Email address is required")
      .min(2, "Email address is too short")
      .max(40, "Email address name is too long"),
    dob_d: Yup.number()
      .nullable()
      .required("This is required")
      .min(1, "Please select a day.")
      .max(31, "Please select a day."),
    dob_m: Yup.number()
      .nullable()
      .required("This is required")
      .min(1, "Please select a month.")
      .max(12, "Please select a month."),
    dob_y: Yup.number()
      .nullable()
      .required("This is required")
      .min(earliestYear, "Please select a year.")
      .max(latestYear, "Please select a year."),
    postalCode: Yup.string().when("showManualAddress", {
      is: false,
      then: (schema) =>
        schema
          .min(5, "This postcode is too short")
          .required("Please enter your post code to complete your address")
          .matches(ABOUT_YOU_POSTCODE_REGEX, "This postcode is not valid"),
      otherwise: (schema) => schema,
    }),
    addressLine1: Yup.string()
      .nullable()
      .required("Address line 1 is required")
      .matches(
        /^[A-Za-z0-9 ./-]*$/,
        "Address line 1 can only contain letters, numbers, spaces, full stops, hyphens and forward slashes",
      ),
    addressLine2: Yup.string().when("showManualAddress", {
      is: true,
      then: (schema) =>
        schema
          .required("Address line 2 is required")
          .matches(
            /^[A-Za-z ./-]+$/,
            "Address line 2 can only contain letters, spaces, full stops, hyphens and forward slashes",
          ),
      otherwise: (schema) => schema,
    }),
    houseNo: Yup.string()
      .nullable()
      .matches(
        /^[A-Za-z0-9 ./-]*$/,
        "House name or number can only contain letters, numbers, spaces, full stops, hyphens and forward slashes",
      ),
    addressLine3: Yup.string()
      .nullable()
      .matches(
        /^[A-Za-z .-]+$/,
        "Address line 3 can only contain letters, spaces, full stops and hyphens",
      ),
    addressLine4: Yup.string()
      .nullable()
      .matches(
        /^[A-Za-z .-]+$/,
        "Address line 4 can only contain letters, spaces, full stops and hyphens",
      ),
    postcode: Yup.string().when("showManualAddress", {
      is: true,
      then: (schema) =>
        schema
          .required("Postcode is required")
          .min(5, "This postcode is too short")
          .matches(ABOUT_YOU_POSTCODE_REGEX, "This postcode is not valid")
          .max(10, "This postcode is too long"),
      otherwise: (schema) => schema,
    }),
    coverStart: Yup.date()
      .nullable()
      .required("Please select the date that you would like cover to start."),
    hideAddressForm: Yup.boolean().when("showManualAddress", {
      is: false,
      then: (schema) =>
        schema.oneOf([true], "Please select / enter your Address."),
      otherwise: (schema) => schema,
    }),
    marketingReference: Yup.string().when("disableSOB", {
      is: false,
      then: (schema) =>
        schema
          .nullable()
          .required("Marketing Reference is required")
          .min(1, "Marketing Reference you've entered is too short"),
      otherwise: (schema) => schema,
    }),
    marketingPreferences: Yup.boolean()
      .oneOf([true], "Please select your marketing preference or opt out")
      .required("Please select your marketing preference or opt out"),
    iConfirm: Yup.boolean()
      .oneOf(
        [true],
        "You must confirm that you have read and understood the information above",
      )
      .required("Confirmation is required"),
  });

const StepTwo = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [gState, setGState] = useSafeContext({
    componentName: "AboutYou",
  });
  const { earliestYear, latestYear, years } = useMemo(() => getYearRange(), []);
  const validationSchema = useMemo(
    () => createValidationSchema(earliestYear, latestYear),
    [earliestYear, latestYear],
  );
  const initialMarketingMode = useMemo(
    () => getMarketingReferenceMode(gState.marketingReference),
    [gState.marketingReference],
  );
  const [error, setError] = useState<string | null>(null);
  const [addressesFound, setAddressesFound] = useState(false);
  const [showManualAddress, setShowManualAddress] = useState(false);
  const [customReference, setCustomReference] = useState(
    initialMarketingMode.customReference,
  );
  const [retailerReference, setRetailerReference] = useState(
    initialMarketingMode.retailerReference,
  );
  const [selectedMarketingReference, setSelectedMarketingReference] = useState(
    initialMarketingMode.selectedMarketingReference,
  );
  const [marketingReference, setMarketingReference] = useState(
    initialMarketingMode.referenceValue,
  );
  const autoSelectedAddressKeyRef = useRef<string | null>(null);

  const formik = useFormik<AboutYouFormValues>({
    initialValues: {
      title: gState.title,
      forename: gState.forename,
      surname: gState.surname,
      dob_d: gState.dob_d ? parseInt(gState.dob_d, 10) : null,
      dob_m: gState.dob_m ? parseInt(gState.dob_m, 10) : null,
      dob_y: gState.dob_y ? parseInt(gState.dob_y, 10) : null,
      telephoneNo: gState.telephoneNo,
      email: gState.email,
      postalCode: gState.postcode,
      coverStart:
        gState.coverStartDate === null ? null : new Date(gState.coverStartDate),
      showManualAddress: false,
      addressIsValid: true,
      disableSOB: gState.disableSOB ?? false,
      hideAddressForm: gState.hideAddressForm,
      houseNo: gState.houseNo,
      houseNumber: gState.houseNo,
      addressLine1: gState.addressLine1,
      addressLine2: gState.addressLine2,
      addressLine3: gState.addressLine3,
      addressLine4: gState.addressLine4,
      postcode: gState.postcode,
      marketingReference: gState.marketingReference ?? "",
      marketingPreferences:
        gState.adminPhone || gState.adminEmail || gState.adminOptOut,
      preferredMethodOfContact: gState.preferredMethodOfContact,
      iConfirm: gState.iConfirm ?? false,
      marketingOptIn: gState.optIn ?? false,
    },
    validationSchema,
    onSubmit: (values) => {
      formik.setFieldValue("showManualAddress", false, false);
      formik.setFieldValue("hideAddressForm", true, false);

      setGState((previousState) => ({
        ...previousState,
        title: values.title,
        forename: values.forename,
        surname: values.surname,
        dob_d: values.dob_d ? values.dob_d.toString() : "",
        dob_m: values.dob_m ? values.dob_m.toString() : "",
        dob_y: values.dob_y ? values.dob_y.toString() : "",
        dob: modelAdaptorHelper
          .getFormattedDOBFromDateParts(
            values.dob_d!,
            values.dob_m!,
            values.dob_y!,
          )
          .toString(),
        houseSubName: showManualAddress ? "" : previousState.houseSubName,
        houseName: showManualAddress ? "" : previousState.houseName,
        houseNo: showManualAddress
          ? values.houseNo
          : isEmpty(previousState.houseNo)
            ? values.houseNo
            : previousState.houseNo,
        addressLine1: showManualAddress
          ? values.addressLine1
          : isEmpty(previousState.addressLine1)
            ? values.addressLine1
            : previousState.addressLine1,
        addressLine2: showManualAddress
          ? values.addressLine2
          : isEmpty(previousState.addressLine2)
            ? values.addressLine2
            : previousState.addressLine2,
        addressLine3: showManualAddress
          ? values.addressLine3 ?? ""
          : isEmpty(previousState.addressLine3)
            ? values.addressLine3 ?? ""
            : previousState.addressLine3,
        addressLine4: showManualAddress
          ? values.addressLine4 ?? ""
          : isEmpty(previousState.addressLine4)
            ? values.addressLine4 ?? ""
            : previousState.addressLine4,
        postcode: showManualAddress
          ? values.postcode
          : isEmpty(previousState.postcode)
            ? values.postcode
            : previousState.postcode,
        telephoneNo: values.telephoneNo.trim(),
        email: values.email.trim(),
        coverStartDate: values.coverStart,
        hideAddressForm: true,
        marketingReference: customReference
          ? marketingReference
          : retailerReference && marketingReference.length > 0
            ? `Retailer - ${marketingReference}`
            : selectedMarketingReference || marketingReference,
        customSource: customReference,
        optIn: values.marketingOptIn,
        preferredMethodOfContact: values.preferredMethodOfContact,
      }));

      navigate(`/stepThree${search}`);
    },
  });

  const {
    data: addressData,
    isFetching: isAddressLoading,
    error: addressError,
    refetch: refetchAddress,
  } = useAddressLookup(formik.values.postalCode, false);

  const minDate = useMemo(() => new Date(), []);
  const maxDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 45);
    return date;
  }, []);

  const updateJourneyState = useCallback(
    (updates: Partial<JourneyState>) => {
      setGState((previousState) => ({
        ...previousState,
        ...updates,
        generateQuote: true,
        yourQuoteCrumb: 0,
      }));
    },
    [setGState],
  );

  const applySelectedAddress = useCallback(
    (selectedAddress: AddressLookupResult) => {
      const addressSummary = getAddressSummary(selectedAddress);

      updateJourneyState(getAddressStatePatch(selectedAddress));
      formik.setFieldValue("houseNo", addressSummary.houseNo, false);
      formik.setFieldValue("addressLine1", addressSummary.addressLine1, false);
      formik.setFieldValue("addressLine2", addressSummary.addressLine2, false);
      formik.setFieldValue("addressLine3", addressSummary.addressLine3, false);
      formik.setFieldValue("addressLine4", addressSummary.addressLine4, false);
      formik.setFieldValue("postcode", addressSummary.postcode, false);
      formik.setFieldValue("showManualAddress", false, false);
      formik.setFieldValue("hideAddressForm", true, false);
      formik.setFieldValue("addressIsValid", true, false);

      setShowManualAddress(false);
      setAddressesFound(false);
    },
    [formik, updateJourneyState],
  );

  const handleAddressSelect = useCallback(
    (index: string) => {
      const selectedAddress = addressData?.Value?.[parseInt(index, 10)];

      if (!selectedAddress) {
        return;
      }

      applySelectedAddress(selectedAddress);
    },
    [addressData, applySelectedAddress],
  );

  const handleFindAddress = useCallback(async () => {
    setShowManualAddress(false);
    setAddressesFound(false);
    setError(null);
    formik.setFieldValue("showManualAddress", false, false);
    updateJourneyState({});

    await refetchAddress();
  }, [formik, refetchAddress, updateJourneyState]);

  const handleStartEndDate = useCallback(
    (date: Date | null) => {
      formik.setFieldValue("coverStart", date, false);
      updateJourneyState({ coverStartDate: date });
    },
    [formik, updateJourneyState],
  );

  const handleMarketingReferenceChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.currentTarget;

      setSelectedMarketingReference(value);
      setCustomReference(value === "Other");
      setRetailerReference(value === "Retailer");

      if (value === "Other" || value === "Retailer") {
        setMarketingReference("");
        formik.setFieldValue("marketingReference", "", false);
        updateJourneyState({ marketingReference: "" });
      } else {
        setMarketingReference(value);
        formik.setFieldValue("marketingReference", value, false);
        updateJourneyState({ marketingReference: value });
      }

      if (!value) {
        return;
      }

      try {
        const response = await transactorService.fetchSourceOfBusinessByName(value);
        updateJourneyState({ sourceOfBusinessId: String(response.value.id) });
      } catch {
        loggingService.logWarning(
          `Source of business lookup failed for marketing reference: ${value}`,
        );
      }
    },
    [formik, updateJourneyState],
  );

  const handleCustomReferenceChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;

      setMarketingReference(value);
      formik.setFieldValue("marketingReference", value, false);
      updateJourneyState({ marketingReference: value });
    },
    [formik, updateJourneyState],
  );

  const handleRetailerReferenceChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      const formattedValue = value.length > 0 ? `Retailer - ${value}` : "";

      setMarketingReference(value);
      formik.setFieldValue("marketingReference", formattedValue, false);
      updateJourneyState({ marketingReference: formattedValue });
    },
    [formik, updateJourneyState],
  );

  useEffect(() => {
    if (gState.bikes.length === 0) {
      navigate(`/get-a-quote${search}`);
    }
  }, [gState.bikes.length, navigate, search]);

  useEffect(() => {
    setGState((previousState) => {
      const updatedState =
        modelAdaptorHelper.resetAssumptionsAndDeclarations(previousState);

      return {
        ...updatedState,
        paymentCrumb: 0,
        generateQuote: true,
        yourQuoteCrumb:
          previousState.yourQuoteCrumb === 2 ? 1 : previousState.yourQuoteCrumb,
        yourCoverCrumb:
          previousState.yourCoverCrumb === 2 ? 1 : previousState.yourCoverCrumb,
        yourDetailsCrumb: 2,
        currentlyEditingABike: false,
        currentlyAddingABike: false,
        selectedCoreScheme: null,
      };
    });
  }, [setGState]);

  useEffect(() => {
    const addressLookupErrorMessage =
      "Address lookup failed for that postcode. Please try again or use the following form.";

    if (isAddressLoading) {
      return;
    }

    if (addressError) {
      loggingService.logWarning(
        `Address lookup failed with postcode: ${formik.values.postalCode}`,
      );
      setError((currentError) =>
        currentError === addressLookupErrorMessage
          ? currentError
          : addressLookupErrorMessage,
      );

      if (!formik.values.showManualAddress) {
        formik.setFieldValue("showManualAddress", true, false);
      }
      if (!showManualAddress) {
        setShowManualAddress(true);
      }
      if (addressesFound) {
        setAddressesFound(false);
      }
      return;
    }

    if (!addressData) {
      return;
    }

    if (addressData.Success === false || !addressData.Value?.length) {
      loggingService.logWarning(
        `Address lookup returned no results for postcode: ${formik.values.postalCode}`,
      );
      setError((currentError) =>
        currentError === addressLookupErrorMessage
          ? currentError
          : addressLookupErrorMessage,
      );

      if (!formik.values.showManualAddress) {
        formik.setFieldValue("showManualAddress", true, false);
      }
      if (!showManualAddress) {
        setShowManualAddress(true);
      }
      if (addressesFound) {
        setAddressesFound(false);
      }
      return;
    }

    if (formik.values.showManualAddress) {
      formik.setFieldValue("showManualAddress", false, false);
    }
    if (showManualAddress) {
      setShowManualAddress(false);
    }
    setError((currentError) => (currentError === null ? currentError : null));
    if (!addressesFound) {
      setAddressesFound(true);
    }
  }, [
    addressData,
    addressError,
    addressesFound,
    formik.setFieldValue,
    formik.values.postalCode,
    formik.values.showManualAddress,
    isAddressLoading,
    showManualAddress,
  ]);

  useEffect(() => {
    const searchValue = formik.values.houseNumber.trim();

    const filteredAddresses = addressData?.Value?.filter((address) => {

      if (!searchValue) {
        return false;
      }

      return (
        `${address.houseNumber ?? ""} ${address.street ?? ""}`
          .trim()
          .startsWith(searchValue) ||
        `${address.houseName ?? ""} ${address.street ?? ""}`
          .trim()
          .startsWith(searchValue)
      );
    });

    if (filteredAddresses?.length === 1) {
      const selectedAddress = filteredAddresses[0];
      const autoSelectKey = [
        searchValue,
        selectedAddress.postcode ?? "",
        selectedAddress.houseNumber ?? "",
        selectedAddress.houseName ?? "",
        selectedAddress.street ?? "",
      ].join("|");

      if (autoSelectedAddressKeyRef.current === autoSelectKey) {
        return;
      }

      autoSelectedAddressKeyRef.current = autoSelectKey;
      applySelectedAddress(selectedAddress);
      return;
    }

    autoSelectedAddressKeyRef.current = null;
  }, [addressData, applySelectedAddress, formik.values.houseNumber]);

  useEffect(() => {
    setGState((previousState) => {
      const nextValidity = formik.isValid && formik.dirty;

      if (previousState.AboutYouFormIsValid === nextValidity) {
        return previousState;
      }

      return {
        ...previousState,
        AboutYouFormIsValid: nextValidity,
      };
    });
  }, [formik.dirty, formik.isValid, setGState]);

  useEffect(() => {
    if (formik.submitCount === 0 || formik.isValid) {
      return;
    }

    const firstErrorField = Object.keys(formik.errors).find(
      (field) => field !== "showManualAddress",
    );

    if (!firstErrorField) {
      return;
    }

    document
      .getElementById(firstErrorField)
      ?.scrollIntoView({ behavior: "auto", block: "center" });
  }, [formik.errors, formik.isValid, formik.submitCount]);

  return (
    <div className="container-fluid mb-5 blueBorderBott oh">
      <TopNavBlank />
      <RegularBanner
        headlineLine1={"Your bike "}
        headlineLine2={"insurance quote"}
        subheadlineLine1={"Tell us about you, your bike and cover you need."}
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
      />

      <Breadcrumbs />

      <section className="container container_narrow">
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="content_section mt-3">
            <h3 className="journey-section-titles">
              About<span className="blueFont"> you</span>.
            </h3>
            <PersonalDetails
              formik={formik}
              gState={gState}
              updateJourneyState={updateJourneyState}
              days={DAY_OPTIONS}
              months={MONTH_OPTIONS}
              years={years}
            />
          </div>

          <div className="content_section mt-3">
            <h3 className="journey-section-titles">
              Address where the <span className="blueFont"> bike is usually kept</span>?
            </h3>
            <AddressSection
              formik={formik}
              gState={gState}
              updateJourneyState={updateJourneyState}
              addressData={addressData}
              error={error}
              addressesFound={addressesFound}
              showManualAddress={showManualAddress}
              setShowManualAddress={setShowManualAddress}
              isPending={isAddressLoading}
              postcodeRegex={ABOUT_YOU_POSTCODE_REGEX}
              handleFindAddress={handleFindAddress}
              handleAddressSelect={handleAddressSelect}
            />
          </div>

          <div className="content_section mt-3">
            <h3 className="journey-section-titles">
              About<span className="blueFont"> your cover</span>.
            </h3>
            <CoverSection
              formik={formik}
              gState={gState}
              updateJourneyState={updateJourneyState}
              minDate={minDate}
              maxDate={maxDate}
              customReference={customReference}
              retailerReference={retailerReference}
              marketingReference={marketingReference}
              selectedMarketingReference={selectedMarketingReference}
              handleStartEndDate={handleStartEndDate}
              handleMarketingReferenceChange={handleMarketingReferenceChange}
              handleCustomReferenceChange={handleCustomReferenceChange}
              handleRetailerReferenceChange={handleRetailerReferenceChange}
            />
          </div>

          <MarketingPreferences formik={formik} />

          <div className="container">
            <div className="row">
              <div className="col-6 col-md-4 col-lg-3 mb-4 mt-5">
                <Link
                  to={`/stepOne${search}`}
                  className="btn btn-wider btn-secondary mb-2 btn-100"
                >
                  Back
                </Link>
              </div>
              <div className="col-6 col-md-4 col-lg-3 offset-md-4 offset-lg-6 mb-4 mt-5">
                <button
                  type="submit"
                  className="btn btn-wider btn-green mb-2 btn-100"
                  id="move-to-step-three"
                >
                  Next step
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default StepTwo;
