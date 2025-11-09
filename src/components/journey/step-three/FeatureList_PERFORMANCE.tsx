import { Checkbox } from "@mantine/core";
import currency from "currency.js";
import { useEffect, useState } from "react";
import { useSafeContext } from "@/context/journeyStore";
import useRiskModelAdaptor from "@/hooks/useRiskModelAdaptor";
import { loggingService } from "@/services/loggingService";
import TransactorService from "@/services/transactorService";
import { type Quote } from "@/models/JourneyComponentTypes";

import crossIcon from "@/assets/svgs/cross-icon.svg?url";
import tickIcon from "@/assets/svgs/tick-icon.svg?url";
import chevronDownIcon from "@/assets/svgs/chevron-down-icon.svg?url";
import chevronUpIcon from "@/assets/svgs/chevron-up-icon.svg?url";
interface FeatureListPerformanceProps {
  isCore: boolean;
  initPerformanceQuote: Quote;
  setIsLoading: (loading: boolean) => void;
  setPerformanceQuote: (quote: Quote) => void;
  unSelectAll: () => void;
  showReQuote: boolean;
  setShowReQuote: (show: boolean) => void;
  showReQuoteMessage: boolean;
  setShowReQuoteMessage: (show: boolean) => void;
  fromExternalLink: boolean;
  showReQuoteCore: boolean;
  clearShowError: () => void;
}

const FeatureListPerformance: React.FC<FeatureListPerformanceProps> = ({
  isCore,
  initPerformanceQuote,
  setIsLoading,
  setPerformanceQuote,
  unSelectAll,
  showReQuote,
  setShowReQuote,
  showReQuoteMessage: showPerformanceReQuoteMessage,
  setShowReQuoteMessage: setShowPerformanceReQuoteMessage,
  fromExternalLink,
  showReQuoteCore,
  clearShowError,
}) => {
  const [show, setShow] = useState(false);
  const handleClick = (e: any, show: boolean) => {
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
            onClick={(e) => handleClick(e, true)}
          >
            <img
              src={chevronDownIcon}
              alt="chevron down"
              className="bi bi-chevron-down chevronScale"
            />
          </a>
        </div>
        <div hidden={!show}>
          <Features
            isCore={isCore}
            initPerformanceQuote={initPerformanceQuote}
            setIsLoading={setIsLoading}
            setPerformanceQuote={setPerformanceQuote}
            unSelectAll={unSelectAll}
            showReQuote={showReQuote}
            setShowReQuote={setShowReQuote}
            showReQuoteMessage={showPerformanceReQuoteMessage}
            setShowReQuoteMessage={setShowPerformanceReQuoteMessage}
            fromExternalLink={fromExternalLink}
            showReQuoteCore={showReQuoteCore} // Pass it to the inner component
            clearShowError={clearShowError} // Pass it to FeaturesPerformance
          />
        </div>
        <div hidden={!show}>
          <a
            className="d-flex justify-content-center mt-3"
            hidden={show}
            onClick={(e) => handleClick(e, false)}
          >
            <img
              src={chevronUpIcon}
              alt="chevron up"
              className="bi bi-chevron-up chevronScale"
            />
          </a>
        </div>
      </div>
      <div className="d-none d-lg-block pl-2 pb-lg-4">
        <Features
          isCore={isCore}
          initPerformanceQuote={initPerformanceQuote}
          setIsLoading={setIsLoading}
          setPerformanceQuote={setPerformanceQuote}
          unSelectAll={unSelectAll}
          showReQuote={showReQuote}
          setShowReQuote={setShowReQuote}
          showReQuoteMessage={showPerformanceReQuoteMessage}
          setShowReQuoteMessage={setShowPerformanceReQuoteMessage}
          fromExternalLink={fromExternalLink}
          showReQuoteCore={showReQuoteCore} // Pass it to the inner component
          clearShowError={clearShowError}
        />
      </div>
    </div>
  );
};

export default FeatureListPerformance;

const Features = ({
  isCore,
  initPerformanceQuote,
  setIsLoading,
  setPerformanceQuote,
  unSelectAll,
  showReQuote,
  setShowReQuote,
  showReQuoteMessage: showPerformanceReQuoteMessage,
  setShowReQuoteMessage: setShowPerformanceReQuoteMessage,
  fromExternalLink,
  showReQuoteCore,
  clearShowError, // Add this prop
}: any) => {
  const [gState, setGState] = useSafeContext({
    componentName: "FeatureListPerformance",
  });
  const riskModel = useRiskModelAdaptor(gState);
  const [_showExtras, _setShowExtras] = useState(
    gState.bikes.length === 1 && gState.bikes[0].isElectric,
  );
  const [monthlyPriceDifference, setMonthlyPriceDifference] = useState(0);
  const [annualPriceDifference, setAnnualPriceDifference] = useState(0);
  const [showPriceDifference, setShowPriceDifference] = useState(false);
  const [sportsCoverCheckBox, setSportsCoverCheckBox] = useState(
    gState.sportsCover,
  );
  const [includeWorldwideCoverCheckBox, setIncludeWorldwideCoverCheckBox] =
    useState(gState.worldwideCover);
  const [PCCheckbox, setPCCheckbox] = useState(
    gState.personalAccidentPerformance,
  );

  // Reset local checkbox states when Core is selected, but only if they haven't been quoted yet
  useEffect(() => {
    if (gState.selectedCoreScheme === true) {
      // Only reset if local state differs from global state (meaning unquoted changes exist)
      if (sportsCoverCheckBox !== gState.sportsCover) {
        setSportsCoverCheckBox(gState.sportsCover || false);
      }
      if (includeWorldwideCoverCheckBox !== gState.worldwideCover) {
        setIncludeWorldwideCoverCheckBox(gState.worldwideCover || false);
      }
      if (PCCheckbox !== gState.personalAccidentPerformance) {
        setPCCheckbox(gState.personalAccidentPerformance || false);
      }
    }
  }, [
    gState.selectedCoreScheme,
    gState.sportsCover,
    gState.worldwideCover,
    gState.personalAccidentPerformance,
    PCCheckbox,
    includeWorldwideCoverCheckBox,
    sportsCoverCheckBox,
  ]);

  const handlePCCheckbox = (flag: boolean) => {
    // Personal Accident Checkbox
    // Only update local state - don't update global state until Update Quote is clicked
    setPCCheckbox(flag);
    setShowReQuote(true);
  };

  const handleSCCheckbox = (flag: boolean) => {
    // Sports Cover Checkbox
    // Only update local state - don't update global state until Update Quote is clicked
    setSportsCoverCheckBox(flag);
    setShowReQuote(true);
  };
  const handleWCCheckbox = (flag: boolean) => {
    // Worldwide Cover Checkbox
    // Only update local state - don't update global state until Update Quote is clicked
    setIncludeWorldwideCoverCheckBox(flag);
    setShowReQuote(true);
  };

  // Cancel handler - revert to global state
  const handleCancelClick = (e: any) => {
    e.preventDefault();
    // Revert all checkboxes to global state values
    setSportsCoverCheckBox(gState.sportsCover || false);
    setIncludeWorldwideCoverCheckBox(gState.worldwideCover || false);
    setPCCheckbox(gState.personalAccidentPerformance || false);
    setShowReQuote(false);
    setShowPerformanceReQuoteMessage(false);
    clearShowError();
  };

  const handleUpdateClick = (e: any) => {
    setShowPerformanceReQuoteMessage(false);
    clearShowError();
    e.preventDefault();
    setIsLoading(true);
    clearShowError(); // Clear the error message
    // SET GLOBAL STATE IMMEDIATELY - don't wait for API response
    //

    if (!riskModel) {
      loggingService.logError(
        "Risk model is undefined in FeatureListPerformance",
      );
      setIsLoading(false);
      return;
    }

    setGState({
      ...gState,
      personalAccidentPerformance: PCCheckbox,
      worldwideCover: includeWorldwideCoverCheckBox,
      sportsCover: sportsCoverCheckBox,
    });
    gState.personalAccidentPerformance = PCCheckbox;
    gState.worldwideCover = includeWorldwideCoverCheckBox;
    gState.sportsCover = sportsCoverCheckBox;
    riskModel.includePersonalAccidentCover = PCCheckbox;
    riskModel.includePersonalAccidentCoverPerformance = PCCheckbox;
    riskModel.includeRoadRageCover = PCCheckbox;
    riskModel.includeSportCover = sportsCoverCheckBox;
    riskModel.includeWorldwideCover = includeWorldwideCoverCheckBox;

    riskModel.policy.schemeTable = parseInt(
      import.meta.env.VITE_PERFORMANCE_SCHEME_TABLE,
    );
    riskModel.newDD = true;

    TransactorService.fetchQuoteForScheme(riskModel, gState).then((data) => {
      const performanceQuote = data.value;

      setPerformanceQuote(performanceQuote);
      console.log("Updating performance quote:", performanceQuote);
      setGState({
        ...gState,
        annualGrossPremium: performanceQuote.annualGrossPremium,
        instalmentsSubsequentPayments:
          performanceQuote.instalmentsSubsequentPayments,
        schemeTable: 0,
        performanceQuote: performanceQuote,
        selectedCoreScheme: false,
        personalAccidentPerformance: PCCheckbox,
        worldwideCover: includeWorldwideCoverCheckBox,
        sportsCover: sportsCoverCheckBox,
      });
      console.log("Updated performance quote:", performanceQuote);
      unSelectAll();

      setMonthlyPriceDifference(
        performanceQuote.instalmentsSubsequentPayments -
          initPerformanceQuote.instalmentsSubsequentPayments,
      );
      setAnnualPriceDifference(
        performanceQuote.annualGrossPremium -
          initPerformanceQuote.annualGrossPremium,
      );
      setShowPriceDifference(
        performanceQuote.instalmentsSubsequentPayments -
          initPerformanceQuote.instalmentsSubsequentPayments >
          0,
      );
      setIsLoading(false);
      setShowReQuote(false);

      loggingService.logInfo(
        `Email sent for requote for Quotes:& ${performanceQuote.quoteReference}`,
      );
      TransactorService.sendQuoteEmails({
        quoteReferences: [performanceQuote.quoteReference],
      });
    });
  };

  return (
    <>
      <div className="row">
        <p className="col-6 pb-1">
          <img src={tickIcon} alt="tick" />
          <span className="darkGreyFont  featureListFont ">
            Accident damage
          </span>
        </p>
        <p className="col-6 pb-1">
          <img src={tickIcon} alt="tick" />{" "}
          <span className="darkGreyFont  featureListFont">Theft</span>
        </p>
        <p className="col-6 pb-1">
          <img src={tickIcon} alt="tick" />
          <span className="darkGreyFont  featureListFont ">
            Public liability
          </span>
        </p>
        <p className="col-6 pb-1">
          <img src={tickIcon} alt="tick" />
          <span className="darkGreyFont  featureListFont ">
            Accessory cover
          </span>
        </p>
        <p className="col-6 pb-1">
          <img src={tickIcon} alt="tick" />
          <span className="darkGreyFont  featureListFont ">Family cover</span>
        </p>
        <p className="col-6 pb-1">
          <img src={tickIcon} alt="tick" />
          <span className="darkGreyFont  featureListFont ">New for old</span>
        </p>
        <p className="col-6 pb-1">
          <img src={tickIcon} alt="tick" />
          <span className="darkGreyFont  featureListFont ">Legal advice</span>
          <span className="blueFont">*</span>
        </p>
        <p className="col-6 pb-1">
          <img src={tickIcon} alt="tick" />{" "}
          <span className="darkGreyFont  featureListFont ">Physio</span>
        </p>
        <p className="col-6 pb-1">
          <img src={tickIcon} alt="tick" />{" "}
          <span className="darkGreyFont  featureListFont ">Triage</span>
        </p>
        <p className="col-6 pb-1">
          <img src={tickIcon} alt="tick" />
          <span className="darkGreyFont  featureListFont ">
            Replacement cycle hire
          </span>
        </p>
        {/* For Personal accident - for performance - no electric we just show this ( using showExtra logic) */}

        {!_showExtras && (
          <p className="col-6 pb-1">
            <img src={tickIcon} alt="tick" />
            <span className={"darkGreyFont " + "  featureListFont "}>
              Personal accident
            </span>
          </p>
        )}

        <p className="col-6 pb-1">
          {isCore ? (
            <img src={crossIcon} alt="cross" />
          ) : (
            <img src={tickIcon} alt="tick" />
          )}{" "}
          <span
            className={
              (isCore ? "lightgreyFont " : "darkGreyFont ") +
              "  featureListFont "
            }
          >
            European cover
          </span>
        </p>
        <p className="col-6 pb-1">
          {isCore ? (
            <img src={crossIcon} alt="cross" />
          ) : (
            <img src={tickIcon} alt="tick" />
          )}{" "}
          <span
            className={
              (isCore ? "lightgreyFont " : "darkGreyFont ") +
              "  featureListFont "
            }
          >
            Cycle rescue
          </span>
          {isCore ? "" : <span className="blueFont">**</span>}
        </p>
        {(isCore || !_showExtras) && (
          <>
            <p className="col-6 pb-1">
              {isCore ? (
                <img src={crossIcon} alt="cross" />
              ) : (
                <img src={tickIcon} alt="tick" />
              )}{" "}
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
              {isCore ? (
                <img src={crossIcon} alt="cross" />
              ) : (
                <img src={tickIcon} alt="tick" />
              )}{" "}
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
              {isCore ? (
                <img src={crossIcon} alt="cross" />
              ) : (
                <img src={tickIcon} alt="tick" />
              )}{" "}
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
        {!isCore && (
          <span>
            {" "}
            <p className="legalFooter mt-2">
              <span className="blueFont">**</span> Cycle rescue excludes
              electronically assisted cycles weighing 40kg or over, or an output
              exceeding 200w/15mph
            </p>
          </span>
        )}

        {!isCore && _showExtras && (
          <>
            <div className="d-flex justify-content-center pt-3">
              <p className="quoteBlueSubHeader">
                <span className="footer-darkgrey">Optional</span> extras
                <span className="footer-darkgrey">.</span>
              </p>
            </div>
            {showPriceDifference && (
              <div className="d-flex justify-content-center px-2">
                <p className="greyFont lufga-light ">
                  (£
                  {currency(monthlyPriceDifference, {
                    symbol: "",
                    separator: ",",
                  }).format()}{" "}
                  extra per month or £
                  {currency(annualPriceDifference, {
                    symbol: "",
                    separator: ",",
                  }).format()}{" "}
                  extra per year)
                </p>
              </div>
            )}

            <div className="d-flex justify-content-between mb-2">
              <p className="  darkGreyFont  featureListFont ">
                Sports & events
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
                  className=" m-right-5"
                  checked={sportsCoverCheckBox}
                  disabled={showReQuoteCore} // Disable when Core has pending changes
                  onChange={(e) => {
                    if (!fromExternalLink && !showReQuoteCore) {
                      handleSCCheckbox(e.target.checked);
                      unSelectAll();
                    }
                  }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <p className="darkGreyFont featureListFont ">Worldwide cover</p>
              <div
                className={`m-right-5 ${
                  fromExternalLink ? "pointer-events-none" : ""
                }`}
              >
                <Checkbox
                  radius="md"
                  size="lg"
                  color="velo-blue"
                  className=" m-right-5"
                  checked={includeWorldwideCoverCheckBox}
                  disabled={showReQuoteCore} // Disable when Core has pending changes
                  onChange={(e) => {
                    if (!fromExternalLink && !showReQuoteCore) {
                      handleWCCheckbox(e.target.checked);
                      unSelectAll();
                    }
                  }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <p className="  darkGreyFont  featureListFont ">
                Personal accident &<br /> road rage assault
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
                  className=" m-right-5"
                  checked={PCCheckbox}
                  disabled={showReQuoteCore} // Disable when Core has pending changes
                  onChange={(e) => {
                    if (!fromExternalLink && !showReQuoteCore) {
                      handlePCCheckbox(e.target.checked);
                      unSelectAll();
                    }
                  }}
                />
              </div>
            </div>
            {showReQuote && (
              <div className="d-flex justify-content-end gap-2 m-right-5">
                <button
                  id="cancelQuotePerformance"
                  className="btn btn-outline-secondary"
                  disabled={showReQuoteCore}
                  onClick={(e) => handleCancelClick(e)}
                >
                  Cancel
                </button>
                <button
                  id="updateQuotePerformance"
                  className="btn btn-green"
                  style={{ marginRight: "15px" }}
                  disabled={showReQuoteCore}
                  onClick={(e) => handleUpdateClick(e)}
                >
                  Update quote
                </button>
              </div>
            )}
            {showPerformanceReQuoteMessage && (
              <div className="text-center">
                {" "}
                <small className="redFont my-1 ">
                  Please update or cancel your changes before proceeding
                </small>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
