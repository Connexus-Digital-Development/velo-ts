import { Checkbox } from "@mantine/core";
import currency from "currency.js";
import { useEffect, useState } from "react";
import { useSafeContext } from "@/context/journeyStore";
import useRiskModelAdaptor from "@/hooks/useRiskModelAdaptor";
import { loggingService } from "@/services/loggingService";
import TransactorService from "@/services/transactorService";
import { type Quote } from "@/models/JourneyComponentTypes";
import CrossIcon from "@/assets/svgs/cross-icon.svg?url";
import TickIcon from "@/assets/svgs/tick-icon.svg?url";
import ChevronDownIcon from "@/assets/svgs/chevron-down-icon.svg?url";
import ChevronUpIcon from "@/assets/svgs/chevron-up-icon.svg?url";

interface FeatureListCoreProps {
  isCore: boolean;
  initCoreQuote: Quote;
  setIsLoading: (loading: boolean) => void;
  setPerformanceQuote: (quote: Quote) => void;
  setCoreQuote: (quote: Quote) => void;
  unSelectAll: () => void;
  showReQuoteCore: boolean;
  setShowReQuoteCore: (show: boolean) => void;
  showReQuoteMessage: boolean;
  setShowReQuoteMessage: (show: boolean) => void;
  fromExternalLink: boolean;
  showReQuote: boolean;
  clearShowError: () => void;
}

const FeatureListCore: React.FC<FeatureListCoreProps> = ({
  isCore,
  initCoreQuote,
  setIsLoading,
  setPerformanceQuote,
  setCoreQuote,
  unSelectAll,
  showReQuoteCore,
  setShowReQuoteCore,
  showReQuoteMessage: showCoreReQuoteMessage,
  setShowReQuoteMessage: setShowCoreReQuoteMessage,
  fromExternalLink,
  showReQuote, // Add this new prop
  clearShowError,
}) => {
  const [show, setShow] = useState(false); // used for mobile view where content is hidden until clicking a chevron

  const handleClickCore = (e: any, show: boolean) => {
    e.preventDefault();
    setShow(show);
  };

  return (
    <div>
      <div className="d-block d-lg-none">
        <div hidden={show}>
          <a
            className="d-flex justify-content-center"
            hidden={show}
            onClick={(e) => handleClickCore(e, true)}
          >
            {chevronDown}
          </a>
        </div>
        <div hidden={!show}>
          <FeaturesCore
            isCore={isCore}
            initCoreQuote={initCoreQuote}
            setIsLoading={setIsLoading}
            setCoreQuote={setCoreQuote}
            unSelectAll={unSelectAll}
            showReQuoteCore={showReQuoteCore}
            setShowReQuoteCore={setShowReQuoteCore}
            showReQuoteMessage={showCoreReQuoteMessage}
            setShowReQuoteMessage={setShowCoreReQuoteMessage}
            fromExternalLink={fromExternalLink}
            showReQuote={showReQuote} // Pass it to the inner component
            clearShowError={clearShowError} // Pass it to FeaturesCore
          />
        </div>
        <div hidden={!show}>
          <a
            className="d-flex justify-content-center mt-3"
            hidden={show}
            onClick={(e) => handleClickCore(e, false)}
          >
            {chevronUp}
          </a>
        </div>
      </div>
      <div className="d-none d-lg-block pl-2 pb-lg-4">
        <FeaturesCore
          isCore={isCore}
          initCoreQuote={initCoreQuote}
          setIsLoading={setIsLoading}
          setPerformanceQuote={setPerformanceQuote}
          setCoreQuote={setCoreQuote}
          unSelectAll={unSelectAll}
          showReQuoteCore={showReQuoteCore}
          setShowReQuoteCore={setShowReQuoteCore}
          showReQuoteMessage={showCoreReQuoteMessage}
          setShowReQuoteMessage={setShowCoreReQuoteMessage}
          fromExternalLink={fromExternalLink}
          showReQuote={showReQuote} // Pass it to the inner component
          clearShowError={clearShowError} // Add this line - it was missing!
        />
      </div>
    </div>
  );
};

export default FeatureListCore;

interface FeaturesCoreProps {
  isCore: boolean;
  initCoreQuote?: Quote;
  setIsLoading: (loading: boolean) => void;
  setPerformanceQuote?: (quote: Quote) => void;
  setCoreQuote: (quote: Quote) => void;
  unSelectAll: () => void;
  showReQuoteCore: boolean;
  setShowReQuoteCore: (show: boolean) => void;
  showReQuoteMessage: boolean;
  setShowReQuoteMessage: (show: boolean) => void;
  fromExternalLink: boolean;
  showReQuote: boolean;
  clearShowError: () => void;
}

const FeaturesCore: React.FC<FeaturesCoreProps> = ({
  isCore,
  initCoreQuote,
  setIsLoading,
  setPerformanceQuote: _setPerformanceQuote,
  setCoreQuote,
  unSelectAll,
  showReQuoteCore,
  setShowReQuoteCore,
  showReQuoteMessage: showCoreReQuoteMessage,
  setShowReQuoteMessage: setShowCoreReQuoteMessage,
  fromExternalLink,
  showReQuote,
  clearShowError, // Add this prop
}) => {
  const [gState, setGState] = useSafeContext({
    componentName: "FeatureListCore",
  });
  const riskModel = useRiskModelAdaptor(gState);

  const [showExtras, _setShowExtras] = useState(
    gState.bikes.length === 1 && gState.bikes[0].isElectric,
  );
  const [monthlyPriceDifferenceCore, setMonthlyPriceDifferenceCore] =
    useState(0);
  const [annualPriceDifferenceCore, setAnnualPriceDifferenceCore] = useState(0);
  const [_showPriceDifference, setShowPriceDifference] = useState(false);
  const [PCCheckboxCore, setPCCheckboxCore] = useState(
    gState.personalAccidentCore,
  );
  // Add this useEffect to debug when gState.personalAccidentCore changes
  useEffect(() => {
    // Optionally sync local state if global state changes externally
    setPCCheckboxCore(gState.personalAccidentCore || false);
  }, [gState.personalAccidentCore]);
  const handlePCCheckboxCore = (flag: boolean) => {
    // Only update local state - don't update global state until Update Quote is clicked
    setPCCheckboxCore(flag);
    setShowReQuoteCore(true);
  };

  // Cancel handler - revert to global state
  const handleCancelClickCore = (e: any) => {
    e.preventDefault();
    // Revert to global state value
    setPCCheckboxCore(gState.personalAccidentCore || false);
    setShowReQuoteCore(false);
    setShowCoreReQuoteMessage(false);
    clearShowError(); // Clear the error message
  };

  const handleUpdateClickCore = (e: any) => {
    setShowCoreReQuoteMessage(false);
    e.preventDefault();
    setIsLoading(true);
    clearShowError(); // Clear the error message
    // SET GLOBAL STATE IMMEDIATELY - don't wait for API response
    setGState({
      ...gState,
      personalAccidentCore: PCCheckboxCore,
    });

    if (!riskModel) {
      loggingService.logError("Risk model is undefined in FeatureListCore");
      setIsLoading(false);
      return;
    }

    //adjust the risk model here for core
    riskModel.policy.schemeTable = parseInt(
      import.meta.env.VITE_CORE_SCHEME_TABLE,
    );
    riskModel.newDD = true;
    riskModel.includePersonalAccidentCoverCore = PCCheckboxCore;
    gState.personalAccidentCore = PCCheckboxCore;
    TransactorService.fetchQuoteForScheme(riskModel, gState).then((data) => {
      const coreQuote = data.value;
      setCoreQuote(coreQuote);

      // Ensure local state stays in sync after quote update
      setGState({
        ...gState,

        coreQuote: coreQuote,
        // Update the Core-specific pricing fields
        annualGrossPremiumCore: coreQuote.annualGrossPremium,
        instalmentsSubsequentPaymentsCore:
          coreQuote.instalmentsSubsequentPayments,
        basePremiumCore: coreQuote.basePremium,
        commissionCore: coreQuote.commission,
        // declineReasonCore: coreQuote.declineReason, // TODO: Check if needed
        instalmentsAprCore: coreQuote.instalmentsApr,
        instalmentsFirstPaymentCore: coreQuote.instalmentsFirstPayment,
        instalmentsGrossPremiumCore: coreQuote.instalmentsGrossPremium,
        instalmentsInterestPcCore: coreQuote.instalmentsInterestPc,
        instalmentsServiceChargeCore: coreQuote.instalmentsServiceCharge,
        // depositCore: coreQuote.deposit, // TODO: Check if needed
        iptCore: coreQuote.ipt,
        netPremiumCore: coreQuote.netPremium,
        schemeTable: 0,
        selectedCoreScheme: null,
        personalAccidentCore: PCCheckboxCore,
      });

      // Update local checkbox to match what we just saved to global state
      // setPCCheckboxCore(currentPCCheckboxCore);

      console.log(
        "Core: after requote - check the checkbox. Global state:",
        PCCheckboxCore,
        gState.personalAccidentCore,
      );

      if (!initCoreQuote) {
        loggingService.logError(
          "Initial Core Quote is undefined in FeatureListCore",
        );
        setIsLoading(false);
        return;
      }

      unSelectAll();
      setMonthlyPriceDifferenceCore(
        coreQuote.instalmentsSubsequentPayments -
          initCoreQuote.instalmentsSubsequentPayments,
      );
      setAnnualPriceDifferenceCore(
        coreQuote.annualGrossPremium - initCoreQuote.annualGrossPremium,
      );
      setShowPriceDifference(
        coreQuote.instalmentsSubsequentPayments -
          initCoreQuote.instalmentsSubsequentPayments >
          0,
      );
      setIsLoading(false);
      setShowReQuoteCore(false);

      loggingService.logInfo(
        `Email sent for requote for Quotes:& ${coreQuote.quoteReference}`,
      );
      TransactorService.sendQuoteEmails({
        quoteReferences: [coreQuote.quoteReference],
      });
    });
  };

  return (
    <div className="row">
      <p className="col-6 pb-1">
        {tickSvg}{" "}
        <span className="darkGreyFont  featureListFont ">Accident damage</span>
      </p>
      <p className="col-6 pb-1">
        {tickSvg} <span className="darkGreyFont  featureListFont ">Theft</span>
      </p>
      <p className="col-6 pb-1">
        {tickSvg}{" "}
        <span className="darkGreyFont  featureListFont ">Public liability</span>
      </p>
      <p className="col-6 pb-1">
        {tickSvg}{" "}
        <span className="darkGreyFont  featureListFont ">Accessory cover</span>
      </p>
      <p className="col-6 pb-1">
        {tickSvg}{" "}
        <span className="darkGreyFont  featureListFont ">Family cover</span>
      </p>
      <p className="col-6 pb-1">
        {tickSvg}{" "}
        <span className="darkGreyFont  featureListFont ">New for old</span>
      </p>
      <p className="col-6 pb-1">
        {tickSvg}{" "}
        <span className="darkGreyFont  featureListFont ">Legal advice</span>
        <span className="blueFont">*</span>
      </p>
      <p className="col-6 pb-1">
        {tickSvg} <span className="darkGreyFont  featureListFont ">Physio</span>
      </p>
      <p className="col-6 pb-1">
        {tickSvg} <span className="darkGreyFont  featureListFont ">Triage</span>
      </p>
      <p className="col-6 pb-1">
        {tickSvg}{" "}
        <span className="darkGreyFont  featureListFont ">
          Replacement cycle hire
        </span>
      </p>
      {/* For Personal accident - for performance - no electric we just show this ( using showExtra logic) */}

      {!showExtras && (
        <p className="col-6 pb-1">
          {tickSvg}{" "}
          <span className={"darkGreyFont " + "  featureListFont "}>
            Personal accident
          </span>
        </p>
      )}

      <p className="col-6 pb-1">
        {isCore ? crossSvg : tickSvg}{" "}
        <span
          className={
            (isCore ? "lightgreyFont " : "darkGreyFont ") + "  featureListFont "
          }
        >
          European cover
        </span>
      </p>
      <p className="col-6 pb-1">
        {isCore ? crossSvg : tickSvg}{" "}
        <span
          className={
            (isCore ? "lightgreyFont " : "darkGreyFont ") + "  featureListFont "
          }
        >
          Cycle rescue
        </span>
        {isCore ? "" : <span className="blueFont">**</span>}
      </p>
      {(isCore || !showExtras) && (
        <>
          <p className="col-6 pb-1">
            {isCore ? crossSvg : tickSvg}{" "}
            <span
              className={
                (isCore ? "lightgreyFont " : "darkGreyFont ") +
                "  featureListFont "
              }
            >
              Sports & events
            </span>
          </p>

          <p className="col-6 pb-1">
            {isCore ? crossSvg : tickSvg}{" "}
            <span
              className={
                (isCore ? "lightgreyFont " : "darkGreyFont ") +
                "  featureListFont "
              }
            >
              Road rage assault
            </span>
          </p>
          <p className="col-6 pb-1">
            {isCore ? crossSvg : tickSvg}{" "}
            <span
              className={
                (isCore ? "lightgreyFont " : "darkGreyFont ") +
                "  featureListFont "
              }
            >
              Worldwide cover
            </span>
          </p>
        </>
      )}

      <p className="legalFooter mt-3">
        <span>
          <span className="blueFont">*</span> Free Legal advice is given with
          this policy, however this does not include a full Legal Expenses
          Insurance Policy.
        </span>
      </p>

      {showExtras && (
        <>
          <div className="d-flex justify-content-center pt-3">
            <p className="quoteBlueSubHeader">
              <span className="footer-darkgrey">Optional</span> extras
              <span className="footer-darkgrey">.</span>
            </p>
          </div>
          {_showPriceDifference && monthlyPriceDifferenceCore !== 0 && (
            <div className="d-flex justify-content-center px-2">
              <p className="greyFont lufga-light ">
                (£
                {currency(monthlyPriceDifferenceCore, {
                  symbol: "",
                  separator: ",",
                }).format()}{" "}
                extra per month or £
                {currency(annualPriceDifferenceCore, {
                  symbol: "",
                  separator: ",",
                }).format()}{" "}
                extra per year)
              </p>
            </div>
          )}

          <div className="d-flex justify-content-between mb-2">
            <p className="darkGreyFont featureListFont">
              Personal accident <br />
            </p>
            <div
              className={`m-right-5 ${
                fromExternalLink ? "pointer-events-none" : ""
              }`}
            >
              <Checkbox
                radius="md"
                size="lg"
                color="velo-blue"
                className="m-right-5"
                checked={PCCheckboxCore}
                readOnly={fromExternalLink}
                disabled={showReQuote} // Disable when Performance has pending changes
                onChange={(e) => {
                  // Only allow changes if not from external link and no Performance pending changes
                  if (!fromExternalLink && !showReQuote) {
                    handlePCCheckboxCore(e.target.checked);
                    unSelectAll();
                  }
                }}
              />
            </div>
          </div>

          {showReQuoteCore && !fromExternalLink && (
            <div className="d-flex justify-content-end gap-2 m-right-5">
              <button
                id="cancelQuoteCore"
                className="btn btn-outline-secondary"
                disabled={showReQuote}
                onClick={(e) => handleCancelClickCore(e)}
              >
                Cancel
              </button>
              <button
                id="updateQuoteCore"
                className="btn btn-green"
                style={{ marginRight: "15px" }}
                disabled={showReQuote}
                onClick={(e) => handleUpdateClickCore(e)}
              >
                Update quote
              </button>
            </div>
          )}
          {showCoreReQuoteMessage && (
            <div className="text-center">
              {" "}
              <small className="redFont my-1 ">
                Please update your quote to proceed
              </small>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const crossSvg = <img src={CrossIcon} alt="Cross icon" />;

const tickSvg = <img src={TickIcon} alt="Tick icon" />;

const chevronDown = <img src={ChevronDownIcon} alt="Chevron down icon" />;

const chevronUp = <img src={ChevronUpIcon} alt="Chevron up icon" />;
