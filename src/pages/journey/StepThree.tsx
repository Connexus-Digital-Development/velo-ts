import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSafeContext } from "@/context/journeyStore";
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
import { useGenerateQuote } from "@/hooks/queries/useQuotes";
import type { RiskModel } from "@/models";

const StepThree = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [gState, setGState] = useSafeContext({
    componentName: "StepThree",
  });

  // React Query mutation for quote generation
  const generateQuoteMutation = useGenerateQuote();

  const [error, setError] = useState<any>(null);
  const [showQuoteDetails, setShowQuoteDetails] = useState(
    !gState.generateQuote,
  );
  const [_isPending, setIsPending] = useState<any>(gState.generateQuote);
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
  // const riskModel = JSON.stringify(useRiskModelAdaptor(gState));
  const [_loadingQuote, setIsLoadingQuote] = useState<any>(gState.generateQuote);
  const [isInitialQuoteLoading, setIsInitialQuoteLoading] = useState<boolean>(
    Boolean(gState.generateQuote),
  );
  const [showReQuoteCore, setShowReQuoteCore] = useState<boolean>(false);
  const [showReQuote, setShowReQuote] = useState<boolean>(false);
  const hasRequestedInitialQuote = useRef(false);
  const hasQuoteResults = Boolean(gState.performanceQuote || gState.coreQuote);
  const shouldShowQuoteDetails = showQuoteDetails || hasQuoteResults;
  const hasTerminalQuoteState =
    shouldShowQuoteDetails || showReferralPage || Boolean(error);
  const isOverlayVisible = !hasTerminalQuoteState && (isInitialQuoteLoading || loading);
  // Add function to clear the error
  const clearShowError = () => {
    setClickedButton(false);
  };
  const riskModel = useRiskModelAdaptor(gState);

  const handleQuoteSuccess = useCallback(
    (response: any) => {
      const quotes = Array.isArray(response)
        ? response
        : ((response as any)?.Value ?? (response as any)?.value ?? []);

      setGenerateQuote(false);
      setIsInitialQuoteLoading(false);
      setIsLoadingQuote(false);
      setIsPending(false);

      loggingService.logInfo(
        `Quote generation successful: ${JSON.stringify(response)}`,
      );

      if (Array.isArray(quotes) && quotes.length > 0) {
        const performanceQuote = quotes.find(
          (f: any) => !f.schemeName?.toLowerCase().includes("core"),
        );
        const coreQuote = quotes.find((f: any) =>
          f.schemeName?.toLowerCase().includes("core"),
        );
        const primaryQuote = performanceQuote ?? coreQuote;

        if (
          performanceQuote?.referralReason ||
          performanceQuote?.declineReason
        ) {
          setError(null);
          setGState((previousState) => ({
            ...previousState,
            annualGrossPremium: performanceQuote?.annualGrossPremium,
            basePremium: performanceQuote?.basePremium,
            commission: performanceQuote?.commission,
            declineReason: performanceQuote?.declineReason,
            instalmentsApr: performanceQuote?.instalmentsApr,
            instalmentsFirstPayment: performanceQuote?.instalmentsFirstPayment,
            instalmentsGrossPremium: performanceQuote?.instalmentsGrossPremium,
            instalmentsInterestPc: performanceQuote?.instalmentsInterestPc,
            instalmentsServiceCharge:
              performanceQuote?.instalmentsServiceCharge,
            deposit: performanceQuote?.deposit,
            instalmentsSubsequentPayments:
              performanceQuote?.instalmentsSubsequentPayments,
            ipt: performanceQuote?.ipt,
            netPremium: performanceQuote?.netPremium,
            quoteReference: performanceQuote?.quoteReference,
            referralReason: performanceQuote?.referralReason,
            schemeId: performanceQuote?.schemeId,
            schemeTable: performanceQuote?.schemeTable,
            annualGrossPremiumCore: coreQuote?.annualGrossPremium,
            basePremiumCore: coreQuote?.basePremium,
            commissionCore: coreQuote?.commission,
            instalmentsAprCore: coreQuote?.instalmentsApr,
            instalmentsFirstPaymentCore: coreQuote?.instalmentsFirstPayment,
            instalmentsGrossPremiumCore: coreQuote?.instalmentsGrossPremium,
            instalmentsInterestPcCore: coreQuote?.instalmentsInterestPc,
            instalmentsServiceChargeCore: coreQuote?.instalmentsServiceCharge,
            instalmentsSubsequentPaymentsCore:
              coreQuote?.instalmentsSubsequentPayments,
            iptCore: coreQuote?.ipt,
            netPremiumCore: coreQuote?.netPremium,
            coreQuote: coreQuote,
            paymentCrumb: 0,
            yourDetailsCrumb:
              previousState.yourDetailsCrumb === 2
                ? 1
                : previousState.yourDetailsCrumb,
            yourCoverCrumb:
              previousState.yourCoverCrumb === 2
                ? 1
                : previousState.yourCoverCrumb,
            yourQuoteCrumb: 2,
            currentlyEditingABike: false,
            currentlyAddingABike: false,
          }));
          setShowReferralPage(true);
          return;
        }

        if (Number(primaryQuote?.annualGrossPremium ?? 0) > 0) {
          setGState((previousState) => ({
            ...previousState,
            coreQuote: coreQuote,
            performanceQuote: performanceQuote,
            initQuote: primaryQuote,
            annualGrossPremium: primaryQuote?.annualGrossPremium,
            instalmentsSubsequentPayments:
              primaryQuote?.instalmentsSubsequentPayments,
            generateQuote: false,
            paymentCrumb: 0,
            yourDetailsCrumb:
              previousState.yourDetailsCrumb === 2
                ? 1
                : previousState.yourDetailsCrumb,
            yourCoverCrumb:
              previousState.yourCoverCrumb === 2
                ? 1
                : previousState.yourCoverCrumb,
            yourQuoteCrumb: 2,
            currentlyEditingABike: false,
            currentlyAddingABike: false,
          }));
          setError(null);
          setShowQuoteDetails(true);

          if (!emailSent) {
            loggingService.logInfo(
              `Email sent ${sent} time(s) for Quotes: ${coreQuote?.quoteReference} & ${performanceQuote?.quoteReference}`,
            );
            setSent(sent + 1);
            setEmailSent(true);
            transactorService.sendQuoteEmails({
              quoteReferences: [
                performanceQuote?.quoteReference,
                coreQuote?.quoteReference,
              ],
            });
          }
          return;
        }
      }

      loggingService.logWarning(
        "Quote generation succeeded but returned no usable quotes",
      );
      setShowQuoteDetails(false);
      setError(
        "Your request for a quote could not be completed at this time. Please try again.",
      );
    },
    [emailSent, sent, setGState],
  );

  const handleQuoteError = useCallback((mutationError: unknown) => {
    const error = mutationError as Error;
    const rawMessage = error?.message ?? "Unknown error";
    const isCancelledOrAborted = /cancel|abort|timeout/i.test(rawMessage);
    const userMessage = isCancelledOrAborted
      ? "Your request for a quote could not be completed at this time. Please try again."
      : rawMessage;

    loggingService.logInfo(`Quote generation failed: ${rawMessage}`);
    setGenerateQuote(false);
    setIsInitialQuoteLoading(false);
    setError(userMessage);
    setIsPending(false);
    setIsLoading(false);
    setIsLoadingQuote(false);
    setShowQuoteDetails(false);
  }, []);

  useEffect(() => {
    const updatedState =
      modelAdaptorHelper.resetAssumptionsAndDeclarations(gState);
    setGState((previousState) => ({
      ...updatedState,
      paymentCrumb: 0,
      yourDetailsCrumb:
        previousState.yourDetailsCrumb === 2 ? 1 : previousState.yourDetailsCrumb,
      yourCoverCrumb:
        previousState.yourCoverCrumb === 2 ? 1 : previousState.yourCoverCrumb,
      yourQuoteCrumb: 2,
      currentlyEditingABike: false,
      currentlyAddingABike: false,
    }));

  }, []);

  useEffect(() => {
    if (generateQuote) {
      if (hasRequestedInitialQuote.current) {
        return;
      }

      hasRequestedInitialQuote.current = true;
      setError(null);
      setShowReferralPage(false);
      setIsInitialQuoteLoading(true);
      setIsLoadingQuote(true);
      void generateQuoteMutation
        .mutateAsync(riskModel as RiskModel)
        .then(handleQuoteSuccess)
        .catch(handleQuoteError);
    }
  }, [generateQuote, generateQuoteMutation, handleQuoteError, handleQuoteSuccess, riskModel]);

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
        <TopNavBlank />
        <RegularBanner
          headlineLine1={"Your bike "}
          headlineLine2={"insurance quote"}
          subheadlineLine1={"Tell us about you, your bike and cover you need."}
          subheadlineLine2={""}
          hasCTA={"false"}
          CTAText={"Get a quote"}
          rotate={isOverlayVisible}
        />
        {isOverlayVisible && (
          <div className="overlay">
            <h1 className="GettingQuoteOverlayH1">
              {loading
                ? "Getting your updated quote..."
                : "Getting your quote..."}
            </h1>
          </div>
        )}

        <Breadcrumbs />

        {shouldShowQuoteDetails && !showReferralPage && !error && (
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
        {!showReferralPage && error && (
          <section
            className="container container_narrow pb-3"
            id="quote-referral-section"
          >
            <div className="content_section">
              <h4 className="">
                Your request for a quote could not be completed at this time.
              </h4>
              <p>
                Please try again or call our customer service team on{" "}
                <a href="tel:08000833035" target="_blank" rel="noreferrer">
                  <strong>0800 083 3035 </strong>
                </a>
                and they can help with getting you a full and accurate quote.
              </p>
            </div>
          </section>
        )}
        {shouldShowQuoteDetails && (
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
