import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { JourneyContext } from "@/context/journeyStore";
import useRiskModelAdaptor from "@/hooks/useRiskModelAdaptor";
import { modelAdaptorHelper } from "@/utils/modelAdaptorHelper";
import RegularBanner from "@/components/shared/RegularBanner";
import { loggingService } from "@/services/loggingService";
import { transactorService } from "@/services/transactorService";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import TopNavBlank from "@/components/shared/TopNavBlank";
import QuoteReferral from "@/components/journey/step-three/QuoteReferral";
import SummaryOfCover from "@/components/journey/step-three/SummaryOfCover";
import YourQuote from "@/components/journey/step-three/YourQuote";

const StepThree = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [gState, setGState] = useContext(JourneyContext);

  const [error, setError] = useState<any>(null);
  const [showQuoteDetails, setShowQuoteDetails] = useState(
    !gState.generateQuote,
  );
  const [isPending, setIsPending] = useState<any>(gState.generateQuote);
  const [generateQuote, setGenerateQuote] = useState<any>(gState.generateQuote);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [clickedButton, setClickedButton] = useState<boolean>(false);
  const [showReQuoteMessage, setShowReQuoteMessage] = useState<boolean>(false);
  const [showCoreReQuoteMessage, setShowCoreReQuoteMessage] =
    useState<boolean>(false);
  const [showPerformanceReQuoteMessage, setShowPerformanceReQuoteMessage] =
    useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [sent, setSent] = useState<number>(1);
  const [canProceedToPayment, setCanProceedToPayment] = useState<boolean>(
    gState.selectedCoreScheme !== null,
  );
  const [showReferralPage, setShowReferralPage] = useState<boolean>(false);
  const riskModel = JSON.stringify(useRiskModelAdaptor(gState));
  const [loadingQuote, setIsLoadingQuote] = useState<any>(gState.generateQuote);
  const [showReQuoteCore, setShowReQuoteCore] = useState<boolean>(false);
  const [showReQuote, setShowReQuote] = useState<boolean>(false);
  // Add function to clear the error
  const clearShowError = () => {
    setClickedButton(false);
  };
  const TRANSACTOR_AUTH_KEY =
    "Velosure|0o4ymBa41mIsQCXDFzQx+c6ttkMrfmWrLdeGANwffgs=";

  const url = `${import.meta.env.VITE_TRANSACTOR_API_ENDPOINT}/PedalCycle/GetQuote`; // this method Generates the quote- poorly named!

  const options = {
    method: "POST",
    headers: {
      authKey: TRANSACTOR_AUTH_KEY,
      "Content-Type": "application/json",
    },
    body: riskModel,
    mode: "cors" as RequestMode,
  };

  useEffect(() => {
    const updatedState =
      modelAdaptorHelper.resetAssumptionsAndDeclarations(gState);
    setGState({
      ...updatedState,
      paymentCrumb: 0,
      yourDetailsCrumb:
        gState.yourDetailsCrumb === 2 ? 1 : gState.yourDetailsCrumb,
      yourCoverCrumb: gState.yourCoverCrumb === 2 ? 1 : gState.yourCoverCrumb,
      yourQuoteCrumb: 2,
      currentlyEditingABike: false,
      currentlyAddingABike: false,
    });

    //console.log("about to get a full quote", gState);
  }, []);

  useEffect(() => {
    if (generateQuote) {
      fetch(url, options)
        .then((res) => {
          if (!res.ok) {
            loggingService.logError(JSON.stringify(res));
            throw Error("No data gathered from that resource");
          }

          return res.json();
        })
        .then((r) => {
          loggingService.logInfo(
            `Called fetch for ${url} and get response ${JSON.stringify(r)}`,
          );
          setIsPending(false);
          console.log("Quote response", r);
          if (r.value) {
            const performanceQuote = r.value.find(
              (f: any) => !f.schemeName.toLowerCase().includes("core"),
            );
            // console.log("performanceQuote", performanceQuote);
            const coreQuote = r.value.find((f: any) =>
              f.schemeName.toLowerCase().includes("core"),
            );

            setIsLoadingQuote(false);
            if (
              performanceQuote.referralReason ||
              performanceQuote.declineReason
            ) {
              if (showReferralPage) {
                return;
              }
              loggingService.logWarning(
                `Quote ${performanceQuote?.quoteReference} referred or declined with reason: ${performanceQuote.referralReason} ${performanceQuote.declineReason}`,
              );
              setError(null);
              setGState({
                ...gState,
                annualGrossPremium: performanceQuote.annualGrossPremium,
                basePremium: performanceQuote.basePremium,
                commission: performanceQuote.commission,
                declineReason: performanceQuote.declineReason,
                instalmentsApr: performanceQuote.instalmentsApr,
                instalmentsFirstPayment:
                  performanceQuote.instalmentsFirstPayment,
                instalmentsGrossPremium:
                  performanceQuote.instalmentsGrossPremium,
                instalmentsInterestPc: performanceQuote.instalmentsInterestPc,
                instalmentsServiceCharge:
                  performanceQuote.instalmentsServiceCharge,
                deposit: performanceQuote.deposit,
                instalmentsSubsequentPayments:
                  performanceQuote.instalmentsSubsequentPayments,
                ipt: performanceQuote.ipt,
                netPremium: performanceQuote.netPremium,
                quoteReference: performanceQuote.quoteReference,
                referralReason: performanceQuote.referralReason,
                schemeId: performanceQuote.schemeId,
                schemeTable: performanceQuote.schemeTable,
                //store the core version too - although we might not need this?
                annualGrossPremiumCore: coreQuote.annualGrossPremium,
                basePremiumCore: coreQuote.basePremium,
                commissionCore: coreQuote.commission,
                declineReasonCore: coreQuote.declineReason,
                instalmentsAprCore: coreQuote.instalmentsApr,
                instalmentsFirstPaymentCore: coreQuote.instalmentsFirstPayment,
                instalmentsGrossPremiumCore: coreQuote.instalmentsGrossPremium,
                instalmentsInterestPcCore: coreQuote.instalmentsInterestPc,
                instalmentsServiceChargeCore:
                  coreQuote.instalmentsServiceCharge,
                depositCore: coreQuote.deposit,
                instalmentsSubsequentPaymentsCore:
                  coreQuote.instalmentsSubsequentPayments,
                iptCore: coreQuote.ipt,
                netPremiumCore: coreQuote.netPremium,
                coreQuote: coreQuote,
                paymentCrumb: 0,
                yourDetailsCrumb:
                  gState.yourDetailsCrumb === 2 ? 1 : gState.yourDetailsCrumb,
                yourCoverCrumb:
                  gState.yourCoverCrumb === 2 ? 1 : gState.yourCoverCrumb,
                yourQuoteCrumb: 2,
                currentlyEditingABike: false,
                currentlyAddingABike: false,
              });
              //console.log(performanceQuote);
              // //console.log(coreQuote);

              // //console.log("CoreQuote",gState.coreQuote);
              setShowReferralPage(true);
              setIsLoadingQuote(false);
              return;
            }

            if (performanceQuote.annualGrossPremium > 0) {
              setGState({
                ...gState,
                coreQuote: coreQuote,
                performanceQuote: performanceQuote,
                initQuote: performanceQuote,
                annualGrossPremium: performanceQuote.annualGrossPremium,
                instalmentsSubsequentPayments:
                  performanceQuote.instalmentsSubsequentPayments,
                generateQuote: false,
                paymentCrumb: 0,
                yourDetailsCrumb:
                  gState.yourDetailsCrumb === 2 ? 1 : gState.yourDetailsCrumb,
                yourCoverCrumb:
                  gState.yourCoverCrumb === 2 ? 1 : gState.yourCoverCrumb,
                yourQuoteCrumb: 2,
                currentlyEditingABike: false,
                currentlyAddingABike: false,
              });
              // Force local state updates by also updating the local variables
              setError(null);
              setShowQuoteDetails(true);
              setIsLoadingQuote(false);
              //send a quote email - only ONCE!!
              if (!emailSent) {
                loggingService.logInfo(
                  `Email sent ${sent} time(s) for Quotes: ${coreQuote.quoteReference} & ${performanceQuote.quoteReference}`,
                );
                setSent(sent + 1);
                setEmailSent(true);
                transactorService.sendQuoteEmails({
                  quoteReferences: [
                    performanceQuote.quoteReference,
                    coreQuote.quoteReference,
                  ],
                });
              }
              return;
            }
          }
          setGenerateQuote(false);
          setError(null);
          setIsPending(false);
        })
        .catch((err) => {
          loggingService.logInfo(`Called fetch for ${url} errored :${err}`);
          setGenerateQuote(false);
          setError(err.message);
          setIsPending(false);
        });

      //store response in state
    }
  }, [generateQuote]);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // next button
    e.preventDefault();

    // FIRST: Check if Core has pending updates
    if (showReQuoteCore) {
      setShowCoreReQuoteMessage(true);
      const buttonCore = document.getElementById("yourQuote");
      if (buttonCore) {
        buttonCore.scrollIntoView({ behavior: "smooth", block: "end" });
      }
      return;
    }

    // FIRST: Check if Performance has pending updates
    if (showReQuote) {
      setShowPerformanceReQuoteMessage(true);
      const button = document.getElementById("yourQuote");
      if (button) {
        button.scrollIntoView({ behavior: "smooth", block: "end" });
      }
      return;
    }

    // SECOND: Check if no cover selected (only runs if no pending updates)
    if (!canProceedToPayment) {
      setClickedButton(true);
      const ele = document.getElementById("yourQuote");
      if (ele) {
        ele.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // All validations passed - proceed to step 4
    window.scrollTo(0, 0);
    navigate(`/stepFour${search}`);
  };
  return (
    <>
      <div className="container-fluid mb-5 blueBorderBott oh">
        <TopNavBlank theme={"white"} />
        <RegularBanner
          headlineLine1={"Your bike "}
          headlineLine2={"insurance quote"}
          subheadlineLine1={"Tell us about you, your bike and cover you need."}
          subheadlineLine2={""}
          hasCTA={"false"}
          CTAText={"Get a quote"}
          rotate={isPending || loading || loadingQuote === true}
        />
        <div
          className={
            isPending || loading || loadingQuote === true
              ? "overlay"
              : "overlay_hidden"
          }
        >
          <h1 className="GettingQuoteOverlayH1">
            {loading
              ? "Getting your updated quote..."
              : "Getting your quote..."}
          </h1>
        </div>

        <Breadcrumbs />

        {!isPending && !showReferralPage && (
          <YourQuote
            error={error}
            coreQuote={gState.coreQuote}
            performanceQuote={gState.performanceQuote}
            setIsLoading={setIsLoading}
            showError={clickedButton}
            clearShowError={clearShowError} // Pass the function down
            canProceedToPayment={setCanProceedToPayment}
            showReQuote={showReQuote}
            showReQuoteCore={showReQuoteCore}
            setShowReQuote={setShowReQuote}
            setShowReQuoteCore={setShowReQuoteCore}
            showReQuoteMessage={showReQuoteMessage}
            setShowReQuoteMessage={setShowReQuoteMessage}
            showCoreReQuoteMessage={showCoreReQuoteMessage}
            setShowCoreReQuoteMessage={setShowCoreReQuoteMessage}
            showPerformanceReQuoteMessage={showPerformanceReQuoteMessage}
            setShowPerformanceReQuoteMessage={setShowPerformanceReQuoteMessage}
          />
        )}
        {showQuoteDetails && (
          <>
            <SummaryOfCover />

            <div className="container container_narrow">
              <div className="row">
                <div className="col-6 mb-4 mt-5">
                  <Link
                    className="btn btn-wider btn-secondary float-start"
                    to={`/stepTwo${search}`}
                  >
                    Back
                  </Link>
                </div>
                <div className="col-6 mb-4 mt-5 ">
                  <button
                    id={`move-to-step-four#${
                      gState.selectedCoreScheme ? "core" : "performance"
                    }`}
                    className="btn btn-wider btn-green float-end"
                    onClick={onClick}
                  >
                    Next step
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {showReferralPage && (
          <QuoteReferral quoteReference={gState.quoteReference} />
        )}
      </div>
    </>
  );
};

export default StepThree;
