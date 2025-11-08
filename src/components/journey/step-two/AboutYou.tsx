import { useFormik } from "formik";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
// import { JourneyContext } from "@/context/journeyStore";
// import { modelAdaptorHelper } from "@/utils/modelAdaptorHelper";
import { loggingService } from "@/services/loggingService";
import transactorHelper from "@/services/transactorService";
import Spinner from "@/components/shared/Spinner";
import AddressPreview from "./AddressPreview";
import ManualAddressEntry from "./ManualAddressEntry";
import MarketingPreferences from "./MarketingPreferences";
import {
    type AboutYouFormValues,
    type AddressLookupResponse,
    type AddressItem,
} from "@/models/JourneyComponentTypes";
import { modelAdaptorHelper } from "@/utils/modelAdaptorHelper";

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
    const [data, setData] = useState<AddressLookupResponse | null>(null);
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
    }, []);

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
            yourQuoteCrumb:
                gState.yourQuoteCrumb === 2 ? 1 : gState.yourQuoteCrumb,
            yourCoverCrumb:
                gState.yourCoverCrumb === 2 ? 1 : gState.yourCoverCrumb,
            yourDetailsCrumb: 2,
            currentlyEditingABike: false,
            currentlyAddingABike: false,
            selectedCoreScheme: null,
        });
    }, []);

    useEffect(() => {
        if (!data) {
            //console.log("no address data");
            return;
        }

        const filtered = data.value.filter((hn) => {
            return (
                `${hn.houseNumber} ${hn.street}`.startsWith(
                    formik.values.houseNumber,
                ) ||
                (hn.houseName &&
                    `${hn.houseName} ${hn.street}`.startsWith(
                        formik.values.houseNumber,
                    ))
            );
        });

        if (filtered.length === 1) {
            //we found one matching address so lets hide all the guff and show this address.
            showSingleAddress(filtered[0]);
        }
    }, [data]);

    const handleAddressSelect = (index: string): void => {
        if (!data || !data.value) return;
        const selectedAddress = data.value[parseInt(index)];
        if (!selectedAddress) return;
        setGState({
            ...gState,
            organisation:
                selectedAddress.organisation !== null
                    ? selectedAddress.organisation
                    : "",
            houseNo:
                selectedAddress.houseNumber !== null
                    ? selectedAddress.houseNumber
                    : "",
            houseName:
                selectedAddress.houseName !== null
                    ? selectedAddress.houseName
                    : "",
            houseSubName:
                selectedAddress.subHouseName !== null
                    ? selectedAddress.subHouseName
                    : "",
            addressLine1: selectedAddress.street ?? "",
            addressLine2: selectedAddress.townOrCity ?? "",
            addressLine3: selectedAddress.locality ?? "",
            addressLine4: selectedAddress.county ?? "",
            postcode: selectedAddress.postcode ?? "",
            hideAddressForm: true,
        });
        const houseNo = (
            (selectedAddress!.organisation !== null
                ? selectedAddress!.organisation + ", "
                : "") + selectedAddress!.subHouseName &&
            selectedAddress!.subHouseName.length > 1
                ? selectedAddress!.subHouseName
                : "" + " " + selectedAddress!.houseName &&
                    selectedAddress!.houseName.length > 1
                  ? selectedAddress!.houseName
                  : ""
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

    const showSingleAddress = (selectedAddress: AddressItem): void => {
        //set the globalstate with these address details

        setGState({
            ...gState,
            organisation:
                selectedAddress.organisation !== null
                    ? selectedAddress.organisation
                    : "",
            houseNo:
                selectedAddress.houseNumber !== null
                    ? selectedAddress.houseNumber
                    : "",
            houseName:
                selectedAddress.houseName !== null
                    ? selectedAddress.houseName
                    : "",
            houseSubName:
                selectedAddress.subHouseName !== null
                    ? selectedAddress.subHouseName
                    : "",
            addressLine1: selectedAddress.street ?? "",
            addressLine2: selectedAddress.townOrCity ?? "",
            addressLine3: selectedAddress.locality ?? "",
            addressLine4: selectedAddress.county ?? "",
            postcode: selectedAddress.postcode ?? "",
            hideAddressForm: true,
        });

        const houseNo = (
            (selectedAddress!.organisation !== null
                ? selectedAddress!.organisation + ", "
                : "") + selectedAddress!.subHouseName &&
            selectedAddress!.subHouseName.length > 1
                ? selectedAddress!.subHouseName
                : "" + " " + selectedAddress!.houseName &&
                    selectedAddress!.houseName.length > 1
                  ? selectedAddress!.houseName
                  : ""
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
    };

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
            (showManualAddress, schema) =>
                showManualAddress === false
                    ? schema
                          .min(5, "This postcode is too short")
                          .required(
                              "Please enter your post code to complete your address",
                          )
                          .matches(postcodeRegex, "This postcode is not valid")
                    : schema,
        ),
        addressLine1: Yup.string()
            .nullable()
            .required("Address line 1 is required")
            .matches(
                new RegExp("^[A-Za-z0-9 ./-]*$"),
                "Address line 1 can only contain letters, numbers, spaces, full stops, hyphens and forward slashes",
            ),
        addressLine2: Yup.string().when("showManualAddress", {
            is: true,
            then: Yup.string()
                .required("Address line 2 is required")
                .matches(
                    new RegExp("^[A-Za-z ./-]+$"),
                    "Address line 2 can only contain letters, spaces, full stops, hyphens and forward slashes",
                ),
        }),
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
        postcode: Yup.string().when("showManualAddress", {
            is: true,
            then: Yup.string()
                .required("Postcode is required")
                .min(5, "This postcode is too short")
                .matches(postcodeRegex, "This postcode is not valid")

                .max(10, "This postcode is too long"),
        }),
        coverStart: Yup.date()
            .nullable()
            .required(
                "Please select the date that you would like cover to start.",
            ),
        hideAddressForm: Yup.boolean().when("showManualAddress", {
            is: false,
            then: Yup.boolean().oneOf(
                [true],
                "Please select / enter your Address.",
            ),
        }),
        marketingReference: Yup.string().when("disableSOB", {
            is: false,
            then: Yup.string()
                .nullable()
                .required("Marketing Reference is required")
                .min(1, "Marketing Reference you've entered is too short"),
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

    const formik = useFormik<AboutYouFormValues>({
        initialValues: {
            title: gState.title,
            forename: gState.forename,
            surname: gState.surname,
            dob_d: gState.dob_d,
            dob_m: gState.dob_m,
            dob_y: gState.dob_y,
            telephoneNo: gState.telephoneNo,
            email: gState.email,
            postalCode: gState.postcode,
            coverStart:
                gState.coverStartDate == null
                    ? null
                    : new Date(gState.coverStartDate),
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
            marketingOptIn: gState.marketingOptIn,
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
                dob_d: values.dob_d !== null ? values.dob_d : null,
                dob_m: values.dob_m ? Number(values.dob_m) : null,
                dob_y: values.dob_y ? values.dob_y : null,

                dob: modelAdaptorHelper.getFormattedDOBFromDateParts(
                    values.dob_d,
                    Number(values.dob_m),
                    values.dob_y,
                ),
                houseSubName: showManualAddress ? null : gState.houseSubName,
                houseName: showManualAddress ? null : gState.houseName,
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
                    : SOBId,
            });
            navigate(`/stepThree${search}`);
        },
    });

    const isEmpty = (str: string | null | undefined): boolean => !str?.length;
    const handleFindAddress = (e: React.FormEvent): void => {
        setGState({
            ...gState,
            generateQuote: true,
            yourQuoteCrumb: 0,
        });
        if (
            formik.values.postalCode.length < 5 ||
            !postcodeRegex.test(formik.values.postalCode)
        ) {
            formik.validateField("postalCode");
        }

        if (
            formik.values.postalCode.length < 5 ||
            !postcodeRegex.test(formik.values.postalCode)
        ) {
            formik.validateField("postalCode");
            return;
        }
        e.preventDefault();
        setShowManualAddress(false);
        formik.setFieldValue("showManualAddress", false);
        const url = `${import.meta.env.VITE_VELOSURE_API_URL}/api/AddressLookup/AddressLookup?postcode=${formik.values.postalCode}`;

        const options = {
            method: "GET",
            headers: {
                "X-API-KEY": import.meta.env.VITE_VELOSURE_API_KEY,
                "content-type": "application/json",
            },
        };

        fetch(url, options)
            .then((res) => {
                if (!res.ok) {
                    loggingService.logError(res.json());
                    throw Error("No address data could be found.");
                }
                return res.json();
            })
            .then((data: AddressLookupResponse) => {
                if (data.success === false) {
                    loggingService.logWarning(
                        `Address lookup failed with postcode: ${formik.values.postalCode}`,
                    );
                    setError(
                        "Address lookup failed for that postcode. Please try again or use the following form.",
                    );
                    formik.setFieldValue("showManualAddress", true);
                    setShowManualAddress(true);
                    setIsPending(false);
                    return;
                }
                formik.setFieldValue("showManualAddress", false);
                setData(data);
                setIsPending(false);
                setError(null);
                setAddressesFound(true);
            })
            .catch((err: Error) => {
                setIsPending(false);
                formik.setFieldValue("showManualAddress", true);
                setShowManualAddress(true);
                setError(
                    err.message + "Please try again or use the following form.",
                );
            });
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
    }, [formik]);

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
                    <div className="row">
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label className="form-label">Title*</label>
                                <div className="row" id="title">
                                    <div className="col-6 col-sm-2">
                                        <label
                                            id="title1"
                                            className={`btn mr-small btn-100 mb-1 ${
                                                gState.title === "Mr"
                                                    ? "btn-primary"
                                                    : "btn-secondary"
                                            } ${
                                                formik.errors.title
                                                    ? formik.touched.title &&
                                                      "is-invalid"
                                                    : formik.touched.title &&
                                                      "is-valid"
                                            }`}
                                            onClick={() => {
                                                formik.setFieldValue(
                                                    "title",
                                                    "Mr",
                                                );
                                                setGState({
                                                    ...gState,
                                                    title: "Mr",
                                                    titleId: 106,
                                                    generateQuote: true,
                                                    yourQuoteCrumb: 0,
                                                });
                                            }}
                                        >
                                            Mr
                                        </label>
                                    </div>
                                    <div className="col-6 col-sm-2">
                                        <label
                                            id="title2"
                                            className={`btn mr-small btn-100 mb-1 ${
                                                gState.title === "Mrs"
                                                    ? "btn-primary"
                                                    : "btn-secondary"
                                            }  ${
                                                formik.errors.title
                                                    ? formik.touched.title &&
                                                      "is-invalid"
                                                    : formik.touched.title &&
                                                      "is-valid"
                                            }`}
                                            onClick={() => {
                                                formik.setFieldValue(
                                                    "title",
                                                    "Mrs",
                                                );
                                                setGState({
                                                    ...gState,
                                                    title: "Mrs",
                                                    titleId: 107,
                                                    generateQuote: true,
                                                    yourQuoteCrumb: 0,
                                                });
                                            }}
                                        >
                                            Mrs
                                        </label>
                                    </div>
                                    <div className="col-6 col-sm-2">
                                        <label
                                            id="title3"
                                            className={`btn mr-small btn-100 mb-1 ${
                                                gState.title === "Ms"
                                                    ? "btn-primary"
                                                    : "btn-secondary"
                                            }  ${
                                                formik.errors.title
                                                    ? formik.touched.title &&
                                                      "is-invalid"
                                                    : formik.touched.title &&
                                                      "is-valid"
                                            }`}
                                            onClick={() => {
                                                formik.setFieldValue(
                                                    "title",
                                                    "Ms",
                                                );
                                                setGState({
                                                    ...gState,
                                                    title: "Ms",
                                                    titleId: 107,
                                                    generateQuote: true,
                                                    yourQuoteCrumb: 0,
                                                });
                                            }}
                                        >
                                            Ms
                                        </label>
                                    </div>
                                    <div className="col-6 col-sm-2">
                                        <label
                                            id="title4"
                                            className={`btn mr-small btn-100 mb-1 ${
                                                gState.title === "Miss"
                                                    ? "btn-primary"
                                                    : "btn-secondary"
                                            } ${
                                                formik.errors.title
                                                    ? formik.touched.title &&
                                                      "is-invalid"
                                                    : formik.touched.title &&
                                                      "is-valid"
                                            }`}
                                            onClick={() => {
                                                formik.setFieldValue(
                                                    "title",
                                                    "Miss",
                                                );
                                                setGState({
                                                    ...gState,
                                                    title: "Miss",
                                                    titleId: 107,
                                                    generateQuote: true,
                                                    yourQuoteCrumb: 0,
                                                });
                                            }}
                                        >
                                            Miss
                                        </label>
                                    </div>
                                    <div className="col-6 col-sm-2">
                                        <label
                                            id="title5"
                                            className={`btn mr-small btn-100 mb-1 ${
                                                gState.title === "Dr"
                                                    ? "btn-primary"
                                                    : "btn-secondary"
                                            } ${
                                                formik.errors.title
                                                    ? formik.touched.title &&
                                                      "is-invalid"
                                                    : formik.touched.title &&
                                                      "is-valid"
                                            }`}
                                            onClick={() => {
                                                formik.setFieldValue(
                                                    "title",
                                                    "Dr",
                                                );
                                                setGState({
                                                    ...gState,
                                                    title: "Dr",
                                                    titleId: 107,
                                                    generateQuote: true,
                                                    yourQuoteCrumb: 0,
                                                });
                                            }}
                                        >
                                            Dr
                                        </label>
                                    </div>
                                    <div className="col-6 col-sm-2">
                                        <label
                                            id="title6"
                                            className={`btn mr-small btn-100 mb-1 ${
                                                gState.title === "Mx"
                                                    ? "btn-primary"
                                                    : "btn-secondary"
                                            }  ${
                                                formik.errors.title
                                                    ? formik.touched.title &&
                                                      "is-invalid"
                                                    : formik.touched.title &&
                                                      "is-valid"
                                            }`}
                                            onClick={() => {
                                                formik.setFieldValue(
                                                    "title",
                                                    "Mx",
                                                );

                                                setGState({
                                                    ...gState,
                                                    title: "Mx",
                                                    titleId: 107,
                                                    generateQuote: true,
                                                    yourQuoteCrumb: 0,
                                                });
                                            }}
                                        >
                                            Mx
                                        </label>
                                    </div>
                                </div>
                                {formik.touched.title && formik.errors.title ? (
                                    <small className="redFont mt-1">
                                        {formik.errors.title}
                                    </small>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    First name*
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        formik.errors.forename
                                            ? formik.touched.forename &&
                                              "is-invalid"
                                            : formik.touched.forename &&
                                              "is-valid"
                                    }`}
                                    id="forename"
                                    required
                                    value={formik.values.forename}
                                    maxLength={40}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setGState({
                                            ...gState,
                                            forename: e.currentTarget.value,
                                            generateQuote: true,
                                            yourQuoteCrumb: 0,
                                        });
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.forename &&
                                formik.errors.forename ? (
                                    <small className="redFont mt-1">
                                        {formik.errors.forename}
                                    </small>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Last name*</label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        formik.errors.surname
                                            ? formik.touched.surname &&
                                              "is-invalid"
                                            : formik.touched.surname &&
                                              "is-valid"
                                    }`}
                                    id="surname"
                                    required
                                    value={formik.values.surname}
                                    maxLength={40}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setGState({
                                            ...gState,
                                            surname: e.currentTarget.value,
                                            generateQuote: true,
                                            yourQuoteCrumb: 0,
                                        });
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.surname &&
                                formik.errors.surname ? (
                                    <small className="redFont mt-1">
                                        {formik.errors.surname}
                                    </small>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Date of Birth*
                                </label>
                                <br />
                                <select
                                    type="number"
                                    id="dob_d"
                                    placeholder="DD"
                                    min="1"
                                    max="31"
                                    className={`form-control Individual_Dateparts Individual_Dateparts_Day ${
                                        formik.errors.dob_d
                                            ? formik.touched.dob_d &&
                                              "is-invalid"
                                            : formik.touched.dob_d && "is-valid"
                                    }`}
                                    value={formik.values.dob_d}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setGState({
                                            ...gState,
                                            dob_d: e.currentTarget.value,
                                            generateQuote: true,
                                            yourQuoteCrumb: 0,
                                        });
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    <option>DD</option>
                                    {days.map((d, key) => {
                                        return <option key={key}>{d}</option>;
                                    })}
                                </select>

                                <select
                                    type="number"
                                    id="dob_m"
                                    placeholder="MM"
                                    min="1"
                                    max="12"
                                    className={`form-control Individual_Dateparts Individual_Dateparts_Month ${
                                        formik.errors.dob_m
                                            ? formik.touched.dob_m &&
                                              "is-invalid"
                                            : formik.touched.dob_m && "is-valid"
                                    }`}
                                    value={formik.values.dob_m}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setGState({
                                            ...gState,
                                            dob_m: Number(
                                                e.currentTarget.value,
                                            ),
                                            generateQuote: true,
                                            yourQuoteCrumb: 0,
                                        });
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    <option>MM</option>
                                    {months.map((month, mkey) => {
                                        return (
                                            <option key={mkey}>{month}</option>
                                        );
                                    })}
                                </select>
                                <select
                                    type="number"
                                    id="dob_y"
                                    placeholder="YYYY"
                                    min="1"
                                    max="31"
                                    className={`form-control Individual_Dateparts_Year Individual_Dateparts  ${
                                        formik.errors.dob_y
                                            ? formik.touched.dob_y &&
                                              "is-invalid"
                                            : formik.touched.dob_y && "is-valid"
                                    }`}
                                    value={formik.values.dob_y}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setGState({
                                            ...gState,
                                            dob_y: e.currentTarget.value,
                                            generateQuote: true,
                                            yourQuoteCrumb: 0,
                                        });
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    <option>YYYY</option>
                                    {years.map((year, ykey) => {
                                        return (
                                            <option key={ykey}>{year}</option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email address*
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        formik.errors.email
                                            ? formik.touched.email &&
                                              "is-invalid"
                                            : formik.touched.email && "is-valid"
                                    }`}
                                    id="email"
                                    required
                                    value={formik.values.email}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setGState({
                                            ...gState,
                                            email: e.currentTarget.value.trim(),
                                            generateQuote: true,
                                            yourQuoteCrumb: 0,
                                        });
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <small className="redFont mt-1">
                                        {formik.errors.email}
                                    </small>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Telephone number*
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        formik.errors.telephoneNo
                                            ? formik.touched.telephoneNo &&
                                              "is-invalid"
                                            : formik.touched.telephoneNo &&
                                              "is-valid"
                                    }`}
                                    id="telephoneNo"
                                    required
                                    value={formik.values.telephoneNo}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setGState({
                                            ...gState,
                                            telephoneNo:
                                                e.currentTarget.value.trim(),
                                            generateQuote: true,
                                            yourQuoteCrumb: 0,
                                        });
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.telephoneNo &&
                                formik.errors.telephoneNo ? (
                                    <small className="redFont mt-1">
                                        {formik.errors.telephoneNo}
                                    </small>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content_section mt-3">
                    <h3 className="journey-section-titles">
                        Address where the{" "}
                        <span className="blueFont"> bike is usually kept</span>?
                    </h3>
                    {gState.hideAddressForm === false && (
                        <div className="row">
                            {formik.touched.hideAddressForm &&
                            formik.errors.hideAddressForm ? (
                                <small
                                    id="hideAddressForm"
                                    className="redFont mt-1"
                                >
                                    {formik.errors.hideAddressForm}
                                </small>
                            ) : null}
                            <div id="left" className="col-12 col-sm-6">
                                <div className="col-12 col-sm-12 mb-3">
                                    <label className="form-label">
                                        House number or name
                                    </label>
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

                                    <label className="form-label mt-3">
                                        Postcode*
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            formik.errors.postalCode
                                                ? formik.touched.postalCode &&
                                                  "is-invalid"
                                                : formik.touched.postalCode &&
                                                  "is-valid"
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
                                    {formik.touched.postalCode &&
                                    formik.errors.postalCode ? (
                                        <small className="redFont mt-1">
                                            {formik.errors.postalCode}
                                        </small>
                                    ) : null}
                                </div>
                                <div className="col-12 col-sm-12 ">
                                    <button
                                        className="btn btn-primary btn-wider col-12 col-md-5 mb-1"
                                        disabled={
                                            formik.values.postalCode.length <
                                                5 ||
                                            !postcodeRegex.test(
                                                formik.values.postalCode,
                                            )
                                        }
                                        onClick={handleFindAddress}
                                    >
                                        Find Address
                                    </button>

                                    <a
                                        className="btn btn-green btn-wider col-12 col-md-5 offset-md-2"
                                        onClick={() => {
                                            formik.setFieldValue(
                                                "showManualAddress",
                                                true,
                                            );
                                            formik.setFieldValue(
                                                "addressIsValid",
                                                formik.values.houseNo?.length >
                                                    1 ||
                                                    formik.values.addressLine1
                                                        ?.length > 1,
                                            );
                                            setShowManualAddress(true);
                                            setAddressesFound(false);
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
                                        {data?.value.map((address, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    id={`opt-${index}`}
                                                    value={index}
                                                >
                                                    {address.organisation !==
                                                        null &&
                                                        address.organisation}
                                                    {address.subHouseName !==
                                                        null &&
                                                        address.subHouseName +
                                                            ", "}
                                                    {address.houseName !==
                                                        null &&
                                                        address.houseName +
                                                            ", "}
                                                    {address.houseNumber}{" "}
                                                    {address.street},{" "}
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
                </div>

                <div className="content_section mt-3">
                    <h3 className="journey-section-titles">
                        About<span className="blueFont"> your cover</span>.
                    </h3>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label className="form-label">
                                    When would you like your cover to begin,
                                    within the next 45 days? *
                                </label>

                                <DatePicker
                                    onChange={(date) =>
                                        handleStartEndDate(date)
                                    }
                                    onBlur={formik.handleBlur}
                                    selected={formik.values.coverStart}
                                    minDate={minDate}
                                    id="coverStart"
                                    maxDate={maxDate()}
                                    showDisabledMonthNavigation
                                    // type="date"
                                    autoComplete="new-password"
                                    placeholderText={"Click to select"}
                                    dateFormat="d MMM yyyy"
                                    className={`form-control ${
                                        formik.errors.coverStart
                                            ? formik.touched.coverStart &&
                                              "is-invalid"
                                            : formik.touched.coverStart &&
                                              "is-valid"
                                    }`}
                                />
                                {formik.touched.coverStart &&
                                formik.errors.coverStart ? (
                                    <small className="redFont mt-1">
                                        {formik.errors.coverStart}
                                    </small>
                                ) : null}
                            </div>

                            <div
                                className=""
                                hidden={gState.disableSOB ?? false}
                            >
                                <label className="form-label">
                                    Where did you hear about us?
                                </label>
                                <select
                                    type="text"
                                    className="form-control form-select"
                                    id="marketingReference"
                                    placeholder="select "
                                    onChange={handleMarketingReferenceChange}
                                    value={
                                        customReference
                                            ? "Other"
                                            : marketingReference?.startsWith(
                                                    "Retailer",
                                                )
                                              ? "Retailer"
                                              : (marketingReference ?? 1)
                                    }
                                >
                                    <option value={1} disabled>
                                        Select...
                                    </option>
                                    <option value="Search engine">
                                        Search engine
                                    </option>
                                    <option value="Social media">
                                        Social media
                                    </option>
                                    <option value="Recommended">
                                        Recommended
                                    </option>
                                    <option value="Retailer">Retailer</option>
                                    <option value="Cycle club">
                                        Cycle club
                                    </option>
                                    <option value="Event">Event</option>
                                    <option value="Previous policyholder">
                                        Previous policy holder
                                    </option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            {customReference && (
                                <div className="mt-3">
                                    <label className="form-label">
                                        Please specify Other*
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="customSource"
                                        defaultValue={marketingReference}
                                        onBlur={(e) => {
                                            if (
                                                e.currentTarget.value.length > 0
                                            ) {
                                                formik.setFieldValue(
                                                    "marketingReference",
                                                    e.currentTarget.value,
                                                );
                                                setMarketingReference(
                                                    e.currentTarget.value,
                                                );
                                                setGState({
                                                    ...gState,
                                                    marketingReference:
                                                        e.currentTarget.value,
                                                    generateQuote: true,
                                                    yourQuoteCrumb: 0,
                                                });
                                            } else {
                                                formik.setFieldValue(
                                                    "marketingReference",
                                                    null,
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            )}
                            {retailerReference &&
                                !(gState.disableSOB ?? false) && (
                                    <div className="mt-3">
                                        <label className="form-label">
                                            Retailer Name / Number*
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="retailerReference"
                                            defaultValue={marketingReference
                                                ?.replace("Retailer -", "")
                                                ?.replace("Retailer", "")
                                                ?.trim()}
                                            onBlur={(e) => {
                                                if (
                                                    e.currentTarget.value
                                                        .length > 0
                                                ) {
                                                    const ref = `Retailer - ${e.currentTarget.value}`;
                                                    formik.setFieldValue(
                                                        "marketingReference",
                                                        ref,
                                                    );
                                                    setMarketingReference(ref);
                                                    setGState({
                                                        ...gState,
                                                        marketingReference: ref,
                                                        generateQuote: true,
                                                        yourQuoteCrumb: 0,
                                                    });
                                                } else {
                                                    formik.setFieldValue(
                                                        "marketingReference",
                                                        null,
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            {formik.touched.marketingReference &&
                            formik.errors.marketingReference ? (
                                <small className="redFont mt-1">
                                    {formik.errors.marketingReference}
                                </small>
                            ) : null}
                        </div>
                    </div>
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
                                    formik.handleSubmit(e);
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
