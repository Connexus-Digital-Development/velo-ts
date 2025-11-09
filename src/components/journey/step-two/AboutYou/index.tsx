import { useFormik } from "formik";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
// import { JourneyContext } from "@/context/journeyStore";
import { loggingService } from "@/services/loggingService";
import transactorHelper from "@/services/transactorService";
import MarketingPreferences from "../MarketingPreferences";
import { useAddressLookup } from "@/hooks/queries/useAddress";
import { type AboutYouFormValues } from "@/models/JourneyComponentTypes";
import { modelAdaptorHelper } from "@/utils/modelAdaptorHelper";
import type { AddressLookupResult } from "@/models/api";
import PersonalDetails from "./PersonalDetails";
import AddressSection from "./AddressSection";
import CoverSection from "./CoverSection";

const postcodeRegex =
  /^(([A-Z][A-HJ-Y]?\d[A-Z\d]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?\d[A-Z]{2}|BFPO ?\d{1,4}|(KY\d|MSR|VG|AI)[ ]?\d{4}|[A-Z]{2} ?\d{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/;
const AboutYou = () => {
  const { search } = useLocation();
  const [gState, setGState] = useSafeContext({
    componentName: "AboutYou",
  });

  const navigate = useNavigate();
  const MIN_AGE = 18,
    MAX_AGE = 90;
  const upper = new Date().getFullYear() - MIN_AGE;
  const lower = upper - MAX_AGE + MIN_AGE;
  // const [data, setData] = useState<AddressLookupResponse | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [addressesFound, setAddressesFound] = useState<boolean>(false); //use to show/hide the postcode select list
  const [customReference, setCustomReference] = useState<boolean>(
    gState.customSource ?? false,
  );
  const [retailerReference, setRetailerReference] = useState<boolean>(
    gState.marketingReference?.startsWith("Retailer") ?? false,
  );
  const [marketingReference, setMarketingReference] = useState<string>(
    gState.marketingReference ?? "",
  );
  const [showManualAddress, setShowManualAddress] = useState<boolean>(false);
  const [SOBId, setSOBId] = useState<number>(
    gState.sourceOfBusinessId ? parseInt(gState.sourceOfBusinessId) : 0,
  );

  const schema = Yup.object().shape({
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
      .required("This is required")
      .min(1, "Please select a day.")
      .max(31, "Please select a day."),
    dob_m: Yup.number()
      .required("This is required")
      .min(1, "Please select a month.")
      .max(12, "Please select a month."),
    dob_y: Yup.number()
      .required("This is required")
      .min(lower, "Please select a year.")
      .max(upper),
    postalCode: Yup.string().when(
      "showManualAddress",
      ([showManualAddress], schema) => {
        return showManualAddress === false
          ? Yup.string()
              .min(5, "This postcode is too short")
              .required("Please enter your post code to complete your address")
              .matches(postcodeRegex, "This postcode is not valid")
          : schema;
      },
    ),
    addressLine1: Yup.string()
      .nullable()
      .required("Address line 1 is required")
      .matches(
        new RegExp("^[A-Za-z0-9 ./-]*$"),
        "Address line 1 can only contain letters, numbers, spaces, full stops, hyphens and forward slashes",
      ),
    addressLine2: Yup.string().when(
      "showManualAddress",
      ([showManualAddress], schema) => {
        return showManualAddress === true
          ? Yup.string()
              .required("Address line 2 is required")
              .matches(
                new RegExp("^[A-Za-z ./-]+$"),
                "Address line 2 can only contain letters, spaces, full stops, hyphens and forward slashes",
              )
          : schema;
      },
    ),
    houseNo: Yup.string()
      .nullable()
      .matches(
        new RegExp("^[A-Za-z0-9 ./-]*$"),
        "House name or number can only contain letters, numbers, spaces, full stops, hyphens and forward slashes",
      ),
    addressLine3: Yup.string()
      .nullable()
      .matches(
        new RegExp("^[A-Za-z .-]+$"),
        "Address line 3 can only contain letters, spaces, full stops and hyphens",
      ),
    addressLine4: Yup.string()
      .nullable()
      .matches(
        new RegExp("^[A-Za-z .-]+$"),
        "Address line 4 can only contain letters, spaces, full stops and hyphens",
      ),
    postcode: Yup.string().when(
      "showManualAddress",
      ([showManualAddress], schema) => {
        return showManualAddress === true
          ? Yup.string()
              .required("Postcode is required")
              .min(5, "This postcode is too short")
              .matches(postcodeRegex, "This postcode is not valid")
              .max(10, "This postcode is too long")
          : schema;
      },
    ),
    coverStart: Yup.date()
      .nullable()
      .required("Please select the date that you would like cover to start."),
    hideAddressForm: Yup.boolean().when(
      "showManualAddress",
      ([showManualAddress], schema) => {
        return showManualAddress === false
          ? Yup.boolean().oneOf([true], "Please select / enter your Address.")
          : schema;
      },
    ),
    marketingReference: Yup.string().when(
      "disableSOB",
      ([disableSOB], schema) => {
        return disableSOB === false
          ? Yup.string()
              .nullable()
              .required("Marketing Reference is required")
              .min(1, "Marketing Reference you've entered is too short")
          : schema;
      },
    ),
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

  const formik = useFormik<AboutYouFormValues>({
    initialValues: {
      title: gState.title,
      forename: gState.forename,
      surname: gState.surname,
      dob_d: gState.dob_d ? parseInt(gState.dob_d) : null,
      dob_m: gState.dob_m ? parseInt(gState.dob_m) : null,
      dob_y: gState.dob_y ? parseInt(gState.dob_y) : null,
      telephoneNo: gState.telephoneNo,
      email: gState.email,
      postalCode: gState.postcode,
      coverStart:
        gState.coverStartDate == null ? null : new Date(gState.coverStartDate),
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
      marketingOptIn:
        gState?.adminPhone || gState?.adminEmail || gState?.adminOptOut,
      marketingPreferences:
        gState?.adminPhone || gState?.adminEmail || gState?.adminOptOut,
      preferredMethodOfContact: gState.preferredMethodOfContact,
      iConfirm: gState.iConfirm ?? false,
    },
    validationSchema: schema,

    onSubmit: (values: AboutYouFormValues) => {
      // set State
      formik.setFieldValue("showManualAddress", false);
      formik.setFieldValue("hideAddressForm", true);

      setGState({
        ...gState,
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
        houseSubName: showManualAddress ? "" : gState.houseSubName,
        houseName: showManualAddress ? "" : gState.houseName,
        houseNo: showManualAddress
          ? values.houseNo
          : isEmpty(gState.houseNo)
            ? values.houseNo
            : gState.houseNo,
        addressLine1: showManualAddress
          ? values.addressLine1
          : isEmpty(gState.addressLine1)
            ? values.addressLine1
            : gState.addressLine1,
        addressLine2: showManualAddress
          ? values.addressLine2
          : isEmpty(gState.addressLine2)
            ? values.addressLine2
            : gState.addressLine2,
        addressLine3: showManualAddress
          ? values.addressLine3
          : isEmpty(gState.addressLine3)
            ? (values.addressLine3 ?? "")
            : gState.addressLine3,
        addressLine4: showManualAddress
          ? values.addressLine4
          : isEmpty(gState.addressLine4)
            ? (values.addressLine4 ?? "")
            : gState.addressLine4,
        postcode: showManualAddress
          ? values.postcode
          : isEmpty(gState.postcode)
            ? values.postcode
            : gState.postcode,
        telephoneNo: values.telephoneNo,
        email: values.email.trim(),
        coverStartDate: values.coverStart,
        hideAddressForm: true,
        marketingReference: marketingReference,
        customSource: customReference,
        optIn: values.marketingOptIn,
        preferredMethodOfContact: values.preferredMethodOfContact,
        sourceOfBusinessId: gState.disableSOB
          ? gState.sourceOfBusinessId
          : SOBId.toString(),
      });
      navigate(`/stepThree${search}`);
    },
  });

  // React Query hook for address lookup
  const {
    data: addressData,
    isLoading: isAddressLoading,
    error: addressError,
  } = useAddressLookup(formik.values.postalCode);

  const minDate = new Date();
  const maxDate = () => {
    const d = minDate;
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();

    return new Date(year, month, day + 45);
  };

  useEffect(() => {
    console.log("AboutYou useEffect on load");
    // users could reset the page, clearing the journey context - if this happens we want them to be returned to the step one. We'll use the bike count to test for a reset
    if (gState.bikes.length === 0) {
      navigate(`/get-a-quote${search}`);
    }
  }, [gState.bikes.length, navigate, search]);

  const handleStartEndDate = (date: Date | null): void => {
    formik.setFieldValue("coverStart", date, false);
    setGState({
      ...gState,
      generateQuote: true,
      yourQuoteCrumb: 0,
      coverStartDate: date,
    });
  };

  useEffect(() => {
    const updatedState =
      modelAdaptorHelper.resetAssumptionsAndDeclarations(gState);
    setGState({
      ...updatedState,
      paymentCrumb: 0,
      generateQuote: true,
      yourQuoteCrumb: gState.yourQuoteCrumb === 2 ? 1 : gState.yourQuoteCrumb,
      yourCoverCrumb: gState.yourCoverCrumb === 2 ? 1 : gState.yourCoverCrumb,
      yourDetailsCrumb: 2,
      currentlyEditingABike: false,
      currentlyAddingABike: false,
      selectedCoreScheme: null,
    });
  }, [gState, setGState]);

  const showSingleAddress = useCallback(
    (selectedAddress: AddressLookupResult): void => {
      //set the globalstate with these address details

      setGState({
        ...gState,
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

      const houseNo = (
        (selectedAddress.organisation !== null
          ? selectedAddress.organisation + ", "
          : "") +
        (selectedAddress.subHouseName && selectedAddress.subHouseName.length > 1
          ? selectedAddress.subHouseName
          : "") +
        " " +
        (selectedAddress.houseName && selectedAddress.houseName.length > 1
          ? selectedAddress.houseName
          : "")
      ).trim();

      formik.setFieldValue(
        "houseNo",
        houseNo?.length < 1 ? selectedAddress.houseNumber : houseNo,
      );
      formik.setFieldValue(
        "addressLine1",
        houseNo?.length < 1
          ? selectedAddress.street
          : selectedAddress.houseNumber + " " + selectedAddress.street,
      );
      formik.setFieldValue("addressLine2", selectedAddress.townOrCity);
      formik.setFieldValue("addressLine3", selectedAddress.locality);
      formik.setFieldValue("addressLine4", selectedAddress.county);
      formik.setFieldValue("postcode", selectedAddress.postcode);
      formik.setFieldValue("showManualAddress", false);
      formik.setFieldValue("hideAddressForm", true);
      formik.setFieldValue("addressLine1IsValid", true);
      formik.setFieldValue("houseIsValid", true);
      setAddressesFound(false);
    },
    [gState, setGState, formik, setAddressesFound],
  );

  useEffect(() => {
    if (!addressData) {
      //console.log("no address data");
      return;
    }

    const filtered = addressData.Value?.filter((hn) => {
      return (
        `${hn.houseNumber} ${hn.street}`.startsWith(
          formik.values.houseNumber,
        ) ||
        (hn.houseName &&
          `${hn.houseName} ${hn.street}`.startsWith(formik.values.houseNumber))
      );
    });

    if (filtered?.length === 1) {
      //we found one matching address so lets hide all the guff and show this address.
      showSingleAddress(filtered[0]);
    }
  }, [addressData, formik.values.houseNumber, showSingleAddress]);

  // Handle React Query response
  useEffect(() => {
    if (isAddressLoading) {
      setIsPending(true);
      return;
    }

    setIsPending(false);

    if (addressError) {
      loggingService.logWarning(
        `Address lookup failed with postcode: ${formik.values.postalCode}`,
      );
      setError(
        "Address lookup failed for that postcode. Please try again or use the following form.",
      );
      formik.setFieldValue("showManualAddress", true);
      setShowManualAddress(true);
      return;
    }

    if (addressData) {
      if (addressData.Success === false) {
        loggingService.logWarning(
          `Address lookup returned no results for postcode: ${formik.values.postalCode}`,
        );
        setError(
          "Address lookup failed for that postcode. Please try again or use the following form.",
        );
        formik.setFieldValue("showManualAddress", true);
        setShowManualAddress(true);
        return;
      }

      // Success - show addresses
      formik.setFieldValue("showManualAddress", false);
      setError(null);
      setAddressesFound(true);
    }
  }, [
    addressData,
    addressError,
    isAddressLoading,
    formik.values.postalCode,
    formik,
  ]);

  const handleAddressSelect = (index: string): void => {
    if (!addressData || !addressData.Value) return;
    const selectedAddress = addressData.Value[parseInt(index)];
    if (!selectedAddress) return;
    setGState({
      ...gState,
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
    const houseNo = (
      (selectedAddress.organisation !== null
        ? selectedAddress.organisation + ", "
        : "") +
      (selectedAddress.subHouseName && selectedAddress.subHouseName.length > 1
        ? selectedAddress.subHouseName
        : "") +
      " " +
      (selectedAddress.houseName && selectedAddress.houseName.length > 1
        ? selectedAddress.houseName
        : "")
    ).trim();

    formik.setFieldValue(
      "houseNo",
      houseNo?.length < 1 ? selectedAddress.houseNumber : houseNo,
    );
    formik.setFieldValue("addressLine1", selectedAddress.street);
    formik.setFieldValue("addressLine2", selectedAddress.townOrCity);
    formik.setFieldValue("addressLine3", selectedAddress.locality);
    formik.setFieldValue("addressLine4", selectedAddress.county);
    formik.setFieldValue("postcode", selectedAddress.postcode);
    formik.setFieldValue("showManualAddress", false);
    formik.setFieldValue("showManualAddress", true);
    formik.setFieldValue("addressIsValid", true);
    setAddressesFound(false);
  };

  const isEmpty = (str: string | null | undefined): boolean => !str?.length;
  const handleFindAddress = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowManualAddress(false);
    formik.setFieldValue("showManualAddress", false);

    // React Query will automatically trigger the address lookup when postcode changes
    // The hook is already watching formik.values.postalCode
    setGState({
      ...gState,
      generateQuote: true,
      yourQuoteCrumb: 0,
    });

    // Clear any previous error state
    setError(null);
    setAddressesFound(false);
  };

  const YearsList = () => {
    const years = [];

    for (let i = upper; i >= lower; i--) {
      years.push(i);
    }
    return years;
  };

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const days = [...Array(32).keys()].slice(1);
  const years = YearsList();

  useEffect(() => {
    if (
      formik.isValid &&
      formik.dirty &&
      gState.AboutYouFormIsValid === false
    ) {
      setGState({
        ...gState,
        AboutYouFormIsValid: true,
      });
    }
  }, [formik, gState, setGState]);

  useEffect(() => {
    if (!formik.isSubmitting) return;
    const errors = Object.keys(formik.errors).filter(
      (f) => f !== "showManualAddress",
    );
    if (errors.length > 0) {
      const element = document.getElementById(errors[0]);
      // scroll up to first error
      element?.scrollIntoView({ behavior: "auto", block: "center" });
    }
  }, [formik]);

  const handleMarketingReferenceChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setGState({ ...gState, generateQuote: true, yourQuoteCrumb: 0 });
    transactorHelper
      .fetchSourceOfBusinessByName(e.currentTarget.value)
      .then((data) => {
        setSOBId(data.value.id);
        setGState({
          ...gState,
          sourceOfBusinessId: data.value.id,
          generateQuote: true,
          yourQuoteCrumb: 0,
        });
      });
    if (e.currentTarget.value === "Other") {
      setMarketingReference("");
      formik.setFieldValue("marketingReference", "");
      setRetailerReference(false);
      setCustomReference(true);
      return;
    }
    setMarketingReference(e.currentTarget.value);
    if (e.currentTarget.value === "Retailer") {
      formik.setFieldValue("marketingReference", null);
      setRetailerReference(true);
      setCustomReference(false);
      return;
    }
    formik.setFieldValue("marketingReference", e.currentTarget.value);
    setGState({
      ...gState,
      marketingReference: e.currentTarget.value,
    });
    setCustomReference(false);
    setRetailerReference(false);
  };

  return (
    <section className="container container_narrow">
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="content_section mt-3">
          <h3 className="journey-section-titles">
            About<span className="blueFont"> you</span>.
          </h3>
          <PersonalDetails
            formik={formik}
            gState={gState}
            setGState={setGState}
            days={days}
            months={months}
            years={years}
          />
        </div>
        <div className="content_section mt-3">
          <h3 className="journey-section-titles">
            Address where the{" "}
            <span className="blueFont"> bike is usually kept</span>?
          </h3>
          <AddressSection
            formik={formik}
            gState={gState}
            setGState={setGState}
            addressData={addressData}
            error={error}
            addressesFound={addressesFound}
            showManualAddress={showManualAddress}
            setShowManualAddress={setShowManualAddress}
            isPending={isPending}
            postcodeRegex={postcodeRegex}
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
            setGState={setGState}
            minDate={minDate}
            maxDate={maxDate}
            handleStartEndDate={handleStartEndDate}
            customReference={customReference}
            retailerReference={retailerReference}
            marketingReference={marketingReference}
            handleMarketingReferenceChange={handleMarketingReferenceChange}
          />
        </div>

        <MarketingPreferences formik={formik} />
        <div className="container">
          <div className="row">
            <div className="col-6 mb-4 mt-5">
              <Link
                to="/stepOne"
                className="btn btn-wider btn-secondary float-start mb-2"
              >
                Back
              </Link>
            </div>
            <div className="col-6 mb-4 mt-5">
              <button
                className="btn btn-wider btn-green float-end mb-2"
                id="move-to-step-three"
                onClick={(e) => {
                  e.preventDefault();
                  formik.handleSubmit(e as any);
                }}
              >
                Next step
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AboutYou;
