import { useState } from "react";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import YourQuote from "@/components/journey/step-three/YourQuote";
import TopNavBlank from "@/components/shared/TopNavBlank";
import RegularBanner from "@/components/shared/RegularBanner";
import SummaryOfCover from "@/components/journey/step-three/SummaryOfCover";
import { useNavigate } from "react-router-dom";
const QRQuoteSummary = () => {
  const [gState, setGState] = useSafeContext({
    componentName: "QRQuoteSummary",
  });
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const [clickedButton, setClickedButton] = useState(false);
  const [canProceedToPayment, setCanProceedToPayment] = useState(true);
  const [validateNextButton, setValidateNextButton] = useState(false);
  //new parts
  const [showReQuoteCore, setShowReQuoteCore] = useState(false);
  const [showReQuote, setShowReQuote] = useState(false);
  const [showReQuoteMessage, setShowReQuoteMessage] = useState(false);
  const [showCoreReQuoteMessage, setShowCoreReQuoteMessage] = useState(false);
  const [showPerformanceReQuoteMessage, setShowPerformanceReQuoteMessage] =
    useState(false);

  const clearShowError = () => {
    setClickedButton(false);
  };

  const onProceedToPayment = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setValidateNextButton(true);
    if (gState.hasPreviousClaim == null) {
      return;
    }

    if (!canProceedToPayment) {
      setClickedButton(true);
      const ele = document.getElementById("yourQuote");
      if (ele) {
        ele.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      window.scrollTo(0, 0);
      navigate(`/QuoteRetrievalPayment`);
    }
  };

  const amendDetails = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setGState({
      ...gState,
      yourCoverCrumb: 0,
      yourDetailsCrumb: 1,
      yourQuoteCrumb: 1,
      paymentCrumb: 0,
    });

    navigate(`/get-a-quote`);
  };

  return (
    <div className="container-fluid mb-5 oh">
      <TopNavBlank theme={"white"} />
      <RegularBanner
        headlineLine1={"Retrieve"}
        headlineLine2={"your quote"}
        subheadlineLine1={"Retrieve your quote and purchase your insurance"}
        subheadlineLine2={""}
        hasCTA={"false"}
        rotate={false}
      />
      <div className={loading ? "overlay" : "overlay_hidden"}>
        <h1 className="GettingQuoteOverlayH1">
          {loading ? "Getting your updated quote..." : "Getting your quote..."}
        </h1>
      </div>
      {!loading && (
        <>
          <YourQuote
            error={""}
            coreQuote={gState.coreQuote}
            setIsLoading={setIsLoading}
            showError={clickedButton}
            fromExternalLink={true}
            canProceedToPayment={setCanProceedToPayment}
            performanceQuote={gState.performanceQuote}
            showReQuote={showReQuote}
            showReQuoteCore={showReQuoteCore}
            setShowReQuote={setShowReQuote}
            setShowReQuoteCore={setShowReQuoteCore}
            showReQuoteMessage={showReQuoteMessage}
            setShowReQuoteMessage={setShowReQuoteMessage}
            clearShowError={clearShowError}
            showCoreReQuoteMessage={showCoreReQuoteMessage}
            setShowCoreReQuoteMessage={setShowCoreReQuoteMessage}
            showPerformanceReQuoteMessage={showPerformanceReQuoteMessage}
            setShowPerformanceReQuoteMessage={setShowPerformanceReQuoteMessage}
          />
          <div id="aggregator-quote">
            <SummaryOfCover
              detailsText="Please ensure all of the details are correct. To amend any information click the 'Amend details' button below."
              fromExternalLink={true}
              validateNextButton={validateNextButton}
            />
            <div className="container container_narrow">
              <div className="row my-5">
                <div className="col-12 mb-4 mt-3">
                  <div
                    className="btn btn-wider btn-red float-start"
                    id="amend-details"
                    onClick={amendDetails}
                  >
                    Amend details
                  </div>
                  <div className="col-12">
                    <div
                      id={`aggregator-proceed-to-payment#${
                        gState.selectedCoreScheme ? "core" : "performance"
                      }`}
                      className="btn btn-wider btn-green float-end"
                      onClick={onProceedToPayment}
                    >
                      Confirm details
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};
export default QRQuoteSummary;
