import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import { useNavigate, useLocation } from "react-router-dom";
import { transactorService } from "@/services/transactorService";
import useRiskModelAdaptor from "@/hooks/useRiskModelAdaptor";
import DDForm from "./DDForm";
import DDGuarantee from "./DDGuarantee";
import { type Bike } from "@/models/bike";
import { type RiskModel } from "@/models/QuoteTypes";
import SinglePayment from "./paymentHelpers/SinglePayment";
import { sanctionsSearchService } from "@/services";
import { loggingService } from "@/services/loggingService";
import type { JourneyState } from "@/models";

interface PaymentsProps {
  fromExternalLink?: boolean;
  fromAggregator?: boolean;
  setRotate?: (rotate: boolean) => void;
  showPaymentWindow?: boolean;
  setShowPaymentWindow?: (show: boolean) => void;
  setPending?: (pending: boolean) => void;
}

const Payments: React.FC<PaymentsProps> = ({
  fromExternalLink = false,
  setRotate = () => {},
  showPaymentWindow,
  setShowPaymentWindow,
  setPending = () => {},
}) => {
  const { search } = useLocation();
  const [gState, setGState] = useSafeContext({
    componentName: "Payments",
  });
  const navigate = useNavigate();
  const riskModel = useRiskModelAdaptor(gState) as RiskModel;
  const [paymentDiv, setPaymentDiv] = useState(<></>);
  const [error, setError] = useState("");
  const [show3DSWindow, setShow3DSWindow] = useState(false);
  let globalPayAttemptCount = gState.paymentAttempts;
  /*set a popup to lock the UI when the new payments options selected*/
  const [processing, setProcessing] = useState(false);
  const [submittedDDDetails, setSubmittedDDDetails] = useState(false);
  const [
    assumptionsAndDeclarationsAllChecked,
    setAssumptionsAndDeclarationsAllChecked,
  ] = useState(false);

  const amendDetails = (
    <Link
      className="btn btn-wider btn-red float-start"
      to={`/get-a-quote`}
      id="amend-details"
      onClick={() => {
        setGState((prev) => ({
          ...prev,
          yourCoverCrumb: 1,
          yourDetailsCrumb: 1,
          yourQuoteCrumb: 1,
          paymentCrumb: 0,
        }));
      }}
    >
      Amend details
    </Link>
  );

  useEffect(() => {
    // users could reset the page, clearing the journey context - if this happens we want them to be returned to the step one. We'll use the bike count to test for a reset
    if (gState.bikes.length === 0) {
      setGState((prev) => ({ ...prev, yourQuoteCrumb: 0 }));
      navigate(`/get-a-quote${search}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const allTicked =
      gState.bikes.every((e: Bike) => e.lockChecked) &&
      (!gState.bikes.some((s: Bike) => s.isElectric) || gState.eBikeTicked) &&
      gState.assumptionsTicked &&
      gState.storageLocationTicked &&
      gState.readDocumentsTicked &&
      gState.paymentTypeIsAnnual !== null;
    setAssumptionsAndDeclarationsAllChecked(allTicked);
    if (allTicked) {
      setGState((prev) => ({ ...prev, clickedPayNow: false }));
    } else {
      setShowPaymentWindow?.(false);
    }
  }, [
    gState.bikes,
    gState.assumptionsTicked,
    gState.storageLocationTicked,
    gState.readDocumentsTicked,
    gState.paymentTypeIsAnnual,
    gState.eBikeTicked,
    setGState,
    setShowPaymentWindow,
  ]);

  const formik = useFormik({
    initialValues: {
      accountName: "",
      accountNumber: "",
      accountSortCode: "",
      accountBankName: gState.accountBankName,
    },
    validationSchema: Yup.object({
      accountName: Yup.string()
        .required("Account name is required")
        .min(2, "Account name is too short")
        .max(40, "Account name is too long"),
      accountNumber: Yup.string()
        .required("Account number is required")
        .matches(/^\d+$/, "Account number must only contain numbers")
        .min(8, "Account number is too short")
        .max(8, "Account number is too long"),
      accountSortCode: Yup.string()
        .required("Sort code is required")
        .matches(/^\d+$/, "Sort code must only contain numbers")
        .min(6, "Sort code is too short")
        .max(6, "Sort code is too long"),
      accountBankName: Yup.string().required(
        "We cannot find a bank account using these details",
      ),
    }),
    onSubmit: (values) => {
      // set State
      setGState((prev) => ({
        ...prev,
        accountName: values.accountName,
        accountNumber: values.accountNumber,
        accountSortCode: values.accountSortCode,
        // accountBankName: values.accountBankName,
      }));
      // resetForm({ values: "" });
    },
  });

  const handleClickPayNow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setGState((prev) => ({ ...prev, clickedPayNow: true }));

    if (gState.paymentTypeIsAnnual == null) {
      setShowPaymentWindow?.(false);
      const element = document.getElementById("paymentButtons");
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const allTicked =
      gState.bikes.every((e) => e.lockChecked) &&
      (!gState.bikes.some((s) => s.isElectric) || gState.eBikeTicked) &&
      gState.assumptionsTicked &&
      gState.storageLocationTicked &&
      gState.readDocumentsTicked &&
      gState.paymentTypeIsAnnual !== null;

    if (!allTicked) {
      setShowPaymentWindow?.(false);
      if (!gState.assumptionsTicked) {
        const element = document.getElementById("assumptionsTicked");
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if (gState.bikes.some((s) => s.isElectric) && !gState.eBikeTicked) {
        const element = document.getElementById("eBikeTicked");
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if (!gState.readDocumentsTicked) {
        const element = document.getElementById("readDocumentsTicked");
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if (!gState.storageLocationTicked) {
        const element = document.getElementById("storageLocationTicked");
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if (!gState.bikes.every((e) => e.lockChecked)) {
        const element = document.getElementById("lockChecked");
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }
    if (import.meta.env.VITE_SanctionsSearchDisabled === "false") {
      sanctionsSearchService
        .SanctionSearch(gState)
        .then((data) => {
          if (data.Error) {
            navigate("/QuoteReferred?quoteReference=" + gState.quoteReference);
            return;
          }
          if (data.Failure) {
            navigate(
              "/QuoteReferred?quoteReference=" +
                gState.quoteReference.replace("WEB", "REF"),
            );
            return;
          }

          setShowPaymentWindow?.(allTicked);
          if (gState.paymentTypeIsAnnual === true) {
            setPaymentDiv(
              <div>
                <SinglePayment
                  successMethod={handleCompletedPayment}
                  failureMethod={handlePaymentError}
                  gState={gState}
                  uiLock={displayPaymentBlock}
                  threeDS={displayThreeDS}
                />
              </div>,
            );
          }
        })
        .catch(() => {
          navigate("/QuoteReferred?quoteReference=" + gState.quoteReference);
          return;
        });
    } else {
      setShowPaymentWindow?.(allTicked);
      if (gState.paymentTypeIsAnnual === true) {
        setPaymentDiv(
          <div>
            <SinglePayment
              successMethod={handleCompletedPayment}
              failureMethod={handlePaymentError}
              gState={gState}
              uiLock={displayPaymentBlock}
              threeDS={displayThreeDS}
            />
          </div>,
        );
      }
    }
  };

  const handleBuyNowClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formik.isValid && formik.dirty) {
      // setPending(true);
      // setRotate(true);
      setGState((prev) => ({ ...prev, DDFormIsValid: true }));
    } else {
      setGState((prev) => ({ ...prev, DDFormIsValid: false }));
      setPending?.(false);
      setRotate?.(false);
      const element = document.getElementById("ddForm");
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      formik.handleSubmit();
      return;
    }
    riskModel.paymentDetails.paymentTypeId =
      import.meta.env.VITE_DIRECT_DEBIT_PAYMENT_TYPE_ID || "";
    riskModel.paymentDetails.bankDetails = {
      accountNumber: formik.values.accountNumber,
      sortCode: formik.values.accountSortCode,
      AccountHolderName: formik.values.accountName,
    };
    setSubmittedDDDetails(true);
  };

  function displayPaymentBlock(flag: boolean) {
    setProcessing(flag);
  }

  function displayThreeDS(flag: boolean) {
    setShow3DSWindow(flag);
  }

  function handleCompletedPayment(paymentResult: any) {
    riskModel.globalPayTransactionId = paymentResult.transactionId;
    riskModel.paymentDetails.paymentTypeId =
      import.meta.env.VITE_CARD_PAYMENT_TYPE_ID || "";
    loggingService.logInfo("payment taken- attempting to incept the policy");
    if (gState.paymentTypeIsAnnual === false) {
      riskModel.paymentDetails.paymentTypeId =
        import.meta.env.VITE_DIRECT_DEBIT_PAYMENT_TYPE_ID || "";
      riskModel.paymentDetails.bankDetails = {
        accountNumber: formik.values.accountNumber,
        sortCode: formik.values.accountSortCode,
        AccountHolderName: formik.values.accountName,
      };
    }
    riskModel.newDD = true;
    // now attempt to incept the policy now that payment has been taken
    const riskModelString = JSON.stringify(riskModel);
    displayPaymentBlock(false);
    displayThreeDS(false);
    setProcessing(false);
    setPending(true);
    setRotate(true);
    tryInceptPolicy(
      riskModelString,
      setPending,
      setRotate,
      navigate,
      setGState,
      gState,
    );
  }

  function handlePaymentError(errorData: any) {
    setError("Something went wrong with your payment, please try again");
    if (errorData?.length < 1) {
      return;
    }
    console.warn(globalPayAttemptCount);
    if (
      globalPayAttemptCount <
      Number(import.meta.env.VITE_GLOBAL_PAY_RETRY_COUNT)
    ) {
      globalPayAttemptCount++;
      setGState((prev) => ({
        ...prev,
        paymentAttempts: globalPayAttemptCount,
      }));
      loggingService.logWarning(errorData);
    } else {
      loggingService.logError(
        `latest error: ${errorData} - user exceeded retry attempts of ${import.meta.env.VITE_GLOBAL_PAY_RETRY_COUNT} and redirected to error page`,
      );
      navigate("/PaymentError?quoteReference=" + gState.quoteReference);
    }
  }

  useEffect(() => {
    // add the bike values in the bikes array
    let runningTotal = 0;
    gState.bikes.forEach((bike) => {
      runningTotal = runningTotal + +bike.value;
    });

    setGState((prev) => ({
      ...prev,
      combinedHomeValue: runningTotal,
      generateQuote: false,
      yourDetailsCrumb: prev.yourDetailsCrumb === 2 ? 1 : prev.yourDetailsCrumb,
      yourQuoteCrumb: prev.yourQuoteCrumb === 2 ? 1 : prev.yourQuoteCrumb,
      yourCoverCrumb: prev.yourCoverCrumb === 2 ? 1 : prev.yourCoverCrumb,
      paymentCrumb: 2,
    }));
  }, [gState.bikes, setGState]);

  return (
    <>
      {gState.paymentSuccessful === false && !gState.paymentTypeIsAnnual && (
        <DDGuarantee readyToRead={assumptionsAndDeclarationsAllChecked} />
      )}
      <div hidden={!processing}>
        <div
          id="payments-overlay"
          className={processing ? "overlay" : "overlay_hidden"}
        >
          <iframe
            hidden={!show3DSWindow}
            id={`payment-iframe-payments`}
            name={`payment-iframe-payments`}
            className={`popup-challenge-payments`}
          ></iframe>
          <h1 hidden={show3DSWindow}>Processing your payment...</h1>
        </div>
      </div>
      <section
        className="container container_narrow "
        hidden={!showPaymentWindow}
      >
        <div className="content_section mt-3  coverSummary">
          {gState.paymentTypeIsAnnual === true && (
            // Full payment
            <div id="card-payment-form" hidden={!showPaymentWindow}>
              <div className="col-12">{paymentDiv}</div>
            </div>
          )}

          {gState.paymentTypeIsAnnual === false && (
            <>
              <section
                className="container container_narrow "
                hidden={!showPaymentWindow}
              >
                <div className=" mt-3 mb-4 ">
                  <div id="dd-payment-form">
                    <div className="col-12">
                      {submittedDDDetails === false && (
                        <DDForm formik={formik} />
                      )}
                      {submittedDDDetails === true && (
                        <div className="row">
                          <h4>
                            Bank details{" "}
                            <span className="blueFont"> Direct Debit</span>
                          </h4>
                          <div className="col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                <span className="textBold">
                                  Name on account:
                                </span>{" "}
                                {formik.values.accountName}
                              </label>
                            </div>

                            <div className="mb-3">
                              <label className="form-label">
                                <span className="textBold">
                                  {" "}
                                  Account number:
                                </span>{" "}
                                {formik.values.accountNumber}
                              </label>
                            </div>

                            <div className="mb-3">
                              <label className="form-label">
                                <span className="textBold">Sort code:</span>{" "}
                                {formik.values.accountSortCode}
                              </label>
                            </div>

                            <div className="mb-3">
                              <label className="form-label">
                                <span className="textBold">Bank name:</span>{" "}
                                {formik.values.accountBankName}
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <button
                              className="btn  btn-primary "
                              onClick={() => setSubmittedDDDetails(false)}
                            >
                              Amend your Direct Debit details
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {error && <small className="redFont mt-1 ">{error}</small>}
                </div>
              </section>
            </>
          )}
        </div>
      </section>

      <section
        className="container container_narrow "
        hidden={submittedDDDetails === false}
      >
        <div className="content_section mt-3  coverSummary">
          {gState.paymentTypeIsAnnual === false && (
            <>
              <section
                className="container container_narrow "
                hidden={submittedDDDetails === false}
              >
                <div hidden={submittedDDDetails === false}>
                  <SinglePayment
                    successMethod={handleCompletedPayment}
                    failureMethod={handlePaymentError}
                    gState={gState}
                    uiLock={displayPaymentBlock}
                    threeDS={displayThreeDS}
                    ddPayment={true}
                  />
                </div>
              </section>
            </>
          )}
        </div>
      </section>

      <section className="container container_narrow ">
        <div className="row">
          <div className="col-12 my-5">
            <div className="" hidden={!fromExternalLink}>
              <div>{amendDetails}</div>
            </div>
            <div className="" hidden={fromExternalLink}>
              <Link
                className="btn btn-wider btn-secondary  float-start mb-2"
                to={`/stepThree${search}`}
              >
                Back
              </Link>
            </div>
            <div className="">
              <button
                className="btn  btn-primary btn-wider float-end"
                hidden={
                  !showPaymentWindow ||
                  gState.paymentTypeIsAnnual === true ||
                  submittedDDDetails
                }
                onClick={async (e) => await handleBuyNowClick(e)}
              >
                Buy now
              </button>
              <button
                className="btn btn-primary btn-wider float-end"
                hidden={showPaymentWindow}
                onClick={async (e) => await handleClickPayNow(e)}
              >
                Pay now
              </button>
              <button
                hidden={
                  !showPaymentWindow ||
                  (gState.paymentTypeIsAnnual === false && !submittedDDDetails)
                }
                className="btn btn-primary btn-wider float-end "
                id="rxp-primary-btn"
                type="submit"
                value="Pay Now"
                form="card-payment"
              >
                <span className="hpp-pay"></span> Buy now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payments;

async function tryInceptPolicy(
  riskModelString: string,
  setPending: (pending: boolean) => void,
  setRotate: (rotate: boolean) => void,
  navigate: (path: string) => void,
  setGState: any,
  gState: any,
  fromAggregator?: boolean,
) {
  window.scrollTo(0, 0);

  try {
    const result = await transactorService.inceptPolicy(
      riskModelString,
      fromAggregator ?? false,
    );

    if (!result.success) {
      loggingService.logError(
        `Inception failed : ${JSON.stringify(result)}, quote reference: ${
          gState.quoteReference
        } `,
      );
      navigate("/InceptFailed");
      setPending(false);
      setRotate(false);
      return;
    }

    setRotate(false);
    setPending(false);

    setGState((prev: JourneyState) => ({
      ...prev,
      policyReference: result.value.policyReference,
      paymentSuccessful: true,
      paymentCrumb: 3,
      yourCoverCrumb: 0,
      yourDetailsCrumb: 0,
      yourQuoteCrumb: 0,
    }));
    loggingService.logInfo(
      `Inception succeeded for quote reference: ${gState.quoteReference}, converted to policy: ${result.value.policyReference} `,
    );
    navigate(
      `/PolicyConfirmation?policyReference=${result.value.policyReference}`,
    );
  } catch (error) {
    loggingService.logError(
      `Inception failed : ${error}, quote reference: ${gState.quoteReference} `,
    );
    navigate("/InceptFailed");
    setPending(false);
    setRotate(false);
    return;
  }
}
