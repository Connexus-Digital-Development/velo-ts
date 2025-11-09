import { useEffect, useState, useCallback, type ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSafeContext } from "@/context/journeyStore";
import FeatureListCore from "./FeatureList_CORE";
import FeatureListPerformance from "./FeatureList_PERFORMANCE";
import currency from "currency.js";
import { type Quote } from "@/models/JourneyComponentTypes";

interface YourQuoteProps {
  error: string | null | ReactElement;
  coreQuote: Quote;
  performanceQuote: Quote;
  setIsLoading: (loading: boolean) => void;
  showError: boolean;
  clearShowError: () => void;
  canProceedToPayment: (canProceed: boolean) => void;
  showReQuote: boolean;
  showReQuoteCore: boolean;
  setShowReQuote: (show: boolean) => void;
  setShowReQuoteCore: (show: boolean) => void;
  showReQuoteMessage: boolean;
  setShowReQuoteMessage: (show: boolean) => void;
  showCoreReQuoteMessage: boolean;
  setShowCoreReQuoteMessage: (show: boolean) => void;
  showPerformanceReQuoteMessage: boolean;
  setShowPerformanceReQuoteMessage: (show: boolean) => void;
  fromExternalLink?: boolean;
}

const YourQuote: React.FC<YourQuoteProps> = ({
  error,
  coreQuote,
  performanceQuote,
  setIsLoading,
  showError,
  clearShowError,
  canProceedToPayment,
  showReQuote,
  showReQuoteCore,
  setShowReQuote,
  setShowReQuoteCore,
  showCoreReQuoteMessage,
  setShowCoreReQuoteMessage,
  showPerformanceReQuoteMessage,
  setShowPerformanceReQuoteMessage,
  fromExternalLink = false,
}) => {
  const [gState, setGState] = useSafeContext({
    componentName: "YourQuote",
  });
  const [highlightCore, setHighlightCore] = useState(
    gState.selectedCoreScheme === true,
  );
  const [highlightPerformance, setHighlightPerformance] = useState(
    gState.selectedCoreScheme === false,
  );
  const [_handledPreSelection, setHandledPreSelection] = useState(false);
  const navigate = useNavigate();

  const unSelectAll = () => {
    setHighlightCore(false);
    setHighlightPerformance(false);
    canProceedToPayment(false);

    console.log("YOURQUOTE COMPONENT - gState:", gState.coreQuote);
  };

  const { search } = useLocation();
  const [showPerformanceQuote, setPerformanceQuote] =
    useState(performanceQuote);
  const [showCoreQuote, setCoreQuote] = useState(coreQuote);

  const handleCoreSelectedNoScroll = useCallback(() => {
    setHighlightCore(true);
    setHighlightPerformance(false);
    canProceedToPayment(true);

    setGState({
      ...gState,
      annualGrossPremium:
        showCoreQuote?.annualGrossPremium ?? coreQuote?.annualGrossPremium,
      basePremium: showCoreQuote?.basePremium ?? coreQuote?.basePremium,
      commission: showCoreQuote?.commission ?? coreQuote?.commission,
      declineReason: showCoreQuote?.declineReason ?? coreQuote?.declineReason,
      instalmentsApr: showCoreQuote?.instalmentsApr ?? coreQuote?.instalmentsApr,
      deposit: showCoreQuote?.deposit ?? coreQuote?.deposit,
      instalmentsFirstPayment:
        showCoreQuote?.instalmentsFirstPayment ??
        coreQuote?.instalmentsFirstPayment,
      instalmentsGrossPremium:
        showCoreQuote?.instalmentsGrossPremium ??
        coreQuote?.instalmentsGrossPremium,
      instalmentsInterestPc:
        showCoreQuote?.instalmentsInterestPc ?? coreQuote?.instalmentsInterestPc,
      instalmentsServiceCharge:
        showCoreQuote?.instalmentsServiceCharge ??
        coreQuote?.instalmentsServiceCharge,
      instalmentsSubsequentPayments:
        showCoreQuote?.instalmentsSubsequentPayments ??
        coreQuote?.instalmentsSubsequentPayments,
      ipt: showCoreQuote?.ipt ?? coreQuote?.ipt,
      netPremium: showCoreQuote?.netPremium ?? coreQuote?.netPremium,
      quoteReference: showCoreQuote?.quoteReference ?? coreQuote?.quoteReference,
      // policyDetailsId:
      //   showCoreQuote?.quoteReference ?? coreQuote.policyDetailsId,
      referralReason: showCoreQuote?.referralReason ?? coreQuote?.referralReason,
      schemeId: showCoreQuote?.schemeId ?? coreQuote?.schemeId,
      schemeTable: showCoreQuote?.schemeTable ?? coreQuote?.schemeTable,
      selectedCoreScheme: true,
      coreQuote: showCoreQuote ?? coreQuote,
      // personalAccident: gState.personalAccidentCore,
      // // EXPLICITLY preserve ALL checkbox values - don't break what's working!
      // personalAccidentCore: gState.personalAccidentCore,
      // sportsCover: gState.sportsCover,
      // worldwideCover: gState.worldwideCover,
      // personalAccidentPerformance: gState.personalAccidentPerformance,
    });
  }, [canProceedToPayment, coreQuote, gState, setGState, showCoreQuote]);

  const handlePerformanceSelectedNoScroll = useCallback(() => {
    setHighlightCore(false);
    canProceedToPayment(true);
    setHighlightPerformance(true);
    console.log(
      "showPerformanceQuote",
      showPerformanceQuote?.annualGrossPremium,
    );
    console.log("performanceQuote,", performanceQuote?.annualGrossPremium);
    setGState({
      ...gState,
      annualGrossPremium:
        showPerformanceQuote?.annualGrossPremium ??
        performanceQuote?.annualGrossPremium,
      basePremium:
        showPerformanceQuote?.basePremium ?? performanceQuote?.basePremium,
      commission:
        showPerformanceQuote?.commission ?? performanceQuote?.commission,
      declineReason:
        showPerformanceQuote?.declineReason ?? performanceQuote?.declineReason,
      instalmentsApr:
        showPerformanceQuote?.instalmentsApr ?? performanceQuote?.instalmentsApr,
      deposit: showPerformanceQuote?.deposit ?? performanceQuote?.deposit,
      instalmentsFirstPayment:
        showPerformanceQuote?.instalmentsFirstPayment ??
        performanceQuote?.instalmentsFirstPayment,
      instalmentsGrossPremium:
        showPerformanceQuote?.instalmentsGrossPremium ??
        performanceQuote?.instalmentsGrossPremium,
      instalmentsInterestPc:
        showPerformanceQuote?.instalmentsInterestPc ??
        performanceQuote?.instalmentsInterestPc,
      instalmentsServiceCharge:
        showPerformanceQuote?.instalmentsServiceCharge ??
        performanceQuote?.instalmentsServiceCharge,
      instalmentsSubsequentPayments:
        showPerformanceQuote?.instalmentsSubsequentPayments ??
        performanceQuote?.instalmentsSubsequentPayments,
      ipt: showPerformanceQuote?.ipt ?? performanceQuote?.ipt,
      netPremium:
        showPerformanceQuote?.netPremium ?? performanceQuote?.netPremium,
      quoteReference:
        showPerformanceQuote?.quoteReference ?? performanceQuote?.quoteReference,
      // TODO: confirm if needed, doesn't exist on JourneyState
      // policyDetailsId:
      //   showPerformanceQuote?.quoteReference ??
      //   performanceQuote.policyDetailsId,
      referralReason:
        showPerformanceQuote?.referralReason ?? performanceQuote?.referralReason,
      schemeId: showPerformanceQuote?.schemeId ?? performanceQuote?.schemeId,
      schemeTable:
        showPerformanceQuote?.schemeTable ?? performanceQuote?.schemeTable,
      selectedCoreScheme: false,
      performanceQuote: showPerformanceQuote ?? performanceQuote,
      // personalAccident: gState.personalAccidentPerformance,
      // // EXPLICITLY preserve checkbox values
      // personalAccidentCore: gState.personalAccidentCore,
      // sportsCover: gState.sportsCover,
      // worldwideCover: gState.worldwideCover,
      // personalAccidentPerformance: gState.personalAccidentPerformance,
    });
  }, [
    canProceedToPayment,
    performanceQuote,
    gState,
    setGState,
    showPerformanceQuote,
  ]);

  // users could reset the page, clearing the journey context - if this happens we want them to be returned to the step one. We'll use the bike count to test for a reset
  useEffect(() => {
    if (gState.bikes.length === 0) {
      setGState({ ...gState, yourQuoteCrumb: 0 });
      navigate(`/get-a-quote${search}`);
    }
  }, [gState.bikes.length, navigate, search, setGState]);

  useEffect(() => {
    if (fromExternalLink && performanceQuote != null) {
      setHandledPreSelection(true);
      if (gState.selectedCoreScheme === true) {
        handleCoreSelectedNoScroll();
      } else {
        handlePerformanceSelectedNoScroll();
      }
    }
  }, [
    fromExternalLink,
    performanceQuote,
    gState.selectedCoreScheme,
    handleCoreSelectedNoScroll,
    handlePerformanceSelectedNoScroll,
  ]);

  // Add this effect to sync local state with global state
  useEffect(() => {
    if (gState.coreQuote) {
      setCoreQuote(gState.coreQuote);
    }
  }, [gState.coreQuote]);
  useEffect(() => {
    if (gState.performanceQuote) {
      setPerformanceQuote(gState.performanceQuote);
    }
  }, [gState.performanceQuote]);

  const handleCoreSelected = (e: any) => {
    e.preventDefault();
    handleCoreSelectedNoScroll();

    const ele = document.getElementById("Quote-Summary");
    const y = ele?.getBoundingClientRect().top ?? 0 + window.pageYOffset - 50;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handlePerformanceSelected = (e: Event) => {
    e.preventDefault();
    handlePerformanceSelectedNoScroll();

    const ele = document.getElementById("Quote-Summary");
    const y = ele?.getBoundingClientRect().top ?? 0 + window.pageYOffset - 50;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="container container_narrow" id="yourQuote">
      {!error && (
        <div className="content_section mt-3 mb-3">
          <h4 className="mb-4">
            Your<span className="blueFont"> quotes</span>.
          </h4>

          <section id="DESKTOP_ONLY">
            <div className="row gx-10 pr">
              <div className="col-lg-6 col-12 mb-4 mb-lg-0">
                <div
                  className={`AnnualQuote card annual-quote-card ${
                    highlightCore ? "greenBorder" : "blueBorder"
                  }`}
                >
                  <div
                    className={`card-header text-center text-white p-4
                ${highlightCore ? "greenHeader" : "blueHeader"}`}
                  >
                    <div className="whiteFont policyTitle">Core cover</div>
                    <p className="policySubTitle">
                      Ideal cover for everyday cyclist, protecting the bicycle
                      and the rider.
                    </p>
                  </div>
                  <div className="payment-card-body">
                    <div className="d-flex justify-content-center ">
                      <h1 className="blueFont text-center QuoteValueLarge">
                        £
                        {currency(
                          showCoreQuote?.instalmentsSubsequentPayments ||
                            coreQuote?.instalmentsSubsequentPayments,
                          {
                            symbol: "",
                            separator: ",",
                          },
                        ).format()}
                      </h1>

                      <div className="pl-2 pt-2">
                        <p className="greyFont lufga-light font-17">
                          per <br /> month
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center ">
                      <p className="greyFont lufga-light font-17">
                        or{" "}
                        <span className="quoteBlueSubHeader">
                          {" "}
                          £
                          {currency(
                            showCoreQuote?.annualGrossPremium ||
                              coreQuote?.annualGrossPremium,
                            {
                              symbol: "",
                              separator: ",",
                            },
                          ).format()}{" "}
                        </span>{" "}
                        per year
                      </p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p className="quoteBlueSubHeader">
                        <span className="footer-darkgrey">What is</span>{" "}
                        included<span className="footer-darkgrey">.</span>
                      </p>
                    </div>
                  </div>
                  <div className="pl-2 pb-lg-4">
                    <FeatureListCore
                      isCore={true}
                      unSelectAll={unSelectAll}
                      initCoreQuote={coreQuote}
                      setIsLoading={setIsLoading}
                      showReQuoteCore={showReQuoteCore}
                      // setShowReQuote={setShowReQuote}
                      setShowReQuoteCore={setShowReQuoteCore}
                      showReQuoteMessage={showCoreReQuoteMessage}
                      setShowReQuoteMessage={setShowCoreReQuoteMessage}
                      setPerformanceQuote={setPerformanceQuote}
                      setCoreQuote={setCoreQuote}
                      fromExternalLink={fromExternalLink}
                      showReQuote={showReQuote} // Pass Performance pending state to Core
                      clearShowError={clearShowError} // Pass it down to Core
                    />{" "}
                  </div>
                  <div
                    className={
                      (!highlightCore &&
                      !highlightPerformance &&
                      showError &&
                      showError
                        ? "coreLeftError "
                        : "coreLeft ") +
                      "position-absolute bottom-0 d-lg-block d-none"
                    }
                  >
                    <div className="d-flex justify-content-center align-content-center mt-1 mb-4">
                      <button
                        className={`btn  btn-wider ${
                          highlightCore ? "btn-green" : "btn-primary"
                        }`}
                        disabled={showReQuote || showReQuoteCore} // Disable when either has pending changes
                        onClick={handleCoreSelected}
                      >
                        {highlightCore ? "Selected" : "Select"}
                      </button>
                    </div>
                    {!highlightCore &&
                      !highlightPerformance &&
                      showError &&
                      !showReQuoteCore && (
                        <div className="text-center">
                          {" "}
                          <small className="redFont my-1 ">
                            Please select a cover type to proceed
                          </small>
                        </div>
                      )}
                  </div>
                  <div className="d-lg-none d-block">
                    <div className="d-flex justify-content-center align-content-center mt-1 mb-4">
                      <button
                        className={`btn  btn-wider ${
                          highlightCore ? "btn-green" : "btn-primary"
                        }`}
                        disabled={showReQuote || showReQuoteCore}
                        onClick={handleCoreSelected}
                      >
                        {highlightCore ? "Selected" : "Select"}
                      </button>
                    </div>
                    {!highlightCore &&
                      !highlightPerformance &&
                      showError &&
                      !showReQuoteCore &&
                      !showReQuote && (
                        <div className="text-center">
                          {" "}
                          <small className="redFont my-1 ">
                            Please select a cover type to proceed
                          </small>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div className="or"></div>

              {/* ====performance===============================================================  */}
              <div className="col-lg-6 col-12">
                <div
                  className={`MonthlyQuote card monthly-quote-card ${
                    highlightPerformance ? "greenBorder" : "blueBorder"
                  }`}
                >
                  <div
                    className={`card-header text-center text-white p-4
                ${highlightPerformance ? "greenHeader" : "blueHeader"}`}
                  >
                    <div className="whiteFont policyTitle">
                      Performance cover
                    </div>
                    <p className="policySubTitle">
                      The perfect cover for the enthusiast cyclist, with added
                      elements of cover included.
                    </p>
                  </div>
                  <div className="payment-card-body">
                    <div className="d-flex justify-content-center ">
                      <h1 className="blueFont text-center QuoteValueLarge">
                        £
                        {currency(
                          showPerformanceQuote?.instalmentsSubsequentPayments !=
                            null
                            ? showPerformanceQuote?.instalmentsSubsequentPayments
                            : highlightCore
                              ? performanceQuote?.instalmentsSubsequentPayments
                              : (gState?.instalmentsSubsequentPayments ??
                                performanceQuote?.instalmentsSubsequentPayments),
                          {
                            symbol: "",
                            separator: ",",
                          },
                        ).format()}
                      </h1>
                      <div className="pl-2 pt-2">
                        <p className="greyFont lufga-light font-17">
                          per <br /> month
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center ">
                      <p className="greyFont lufga-light font-17">
                        or{" "}
                        <span className="quoteBlueSubHeader">
                          {" "}
                          £
                          {currency(
                            showPerformanceQuote?.annualGrossPremium != null
                              ? showPerformanceQuote.annualGrossPremium
                              : highlightCore
                                ? performanceQuote?.annualGrossPremium
                                : (gState?.annualGrossPremium ??
                                  performanceQuote?.annualGrossPremium),
                            {
                              symbol: "",
                              separator: ",",
                            },
                          ).format()}{" "}
                        </span>{" "}
                        per year
                      </p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p className="quoteBlueSubHeader">
                        <span className="footer-darkgrey">What is</span>{" "}
                        included<span className="footer-darkgrey">.</span>
                      </p>
                    </div>
                  </div>
                  <div className="pl-2 pb-lg-4">
                    <FeatureListPerformance
                      isCore={false}
                      unSelectAll={unSelectAll}
                      initPerformanceQuote={performanceQuote}
                      setIsLoading={setIsLoading}
                      showReQuote={showReQuote}
                      setShowReQuote={setShowReQuote}
                      // setShowReQuote={setShowReQuoteCore}
                      showReQuoteMessage={showPerformanceReQuoteMessage}
                      setShowReQuoteMessage={setShowPerformanceReQuoteMessage}
                      setPerformanceQuote={setPerformanceQuote}
                      fromExternalLink={fromExternalLink}
                      showReQuoteCore={showReQuoteCore} // Pass Core pending state to Performance
                      clearShowError={clearShowError} // Pass it down to Core
                    />{" "}
                  </div>
                  <div className="d-flex justify-content-center align-content-center mt-1 mb-4">
                    <button
                      className={`btn  btn-wider ${
                        highlightPerformance ? "btn-green" : "btn-primary"
                      }`}
                      disabled={showReQuote || showReQuoteCore} // Disable when either has pending changes
                      onClick={(e: any) => handlePerformanceSelected(e)}
                    >
                      {highlightPerformance ? "Selected" : "Select"}
                    </button>
                  </div>
                  {!highlightCore &&
                    !highlightPerformance &&
                    showError &&
                    !showReQuoteCore &&
                    !showReQuote && (
                      <div className="text-center">
                        {" "}
                        <small className="redFont my-1 ">
                          Please select a cover type to proceed
                        </small>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {error && (
        <h4 id="quote-retrieval-failed" className="content_section mt-5 mb-5">
          {error}
        </h4>
      )}
    </section>
  );
};
export default YourQuote;
