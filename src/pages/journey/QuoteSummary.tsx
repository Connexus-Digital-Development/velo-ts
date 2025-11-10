import { useEffect, useState } from "react";
import { useSafeContext } from "@/context/journeyStore";
import useGlobalStateAdaptor from "@/hooks/useGlobalStateAdaptor";
import { useRetrieveQuote } from "@/hooks/queries/useQuotes";
import YourQuote from "@/components/journey/step-three/YourQuote";
import TopNavBlank from "@/components/shared/TopNavBlank";
import RegularBanner from "@/components/shared/RegularBanner";
import SummaryOfCover from "@/components/journey/step-three/SummaryOfCover";
import { useParams, useNavigate } from "react-router-dom";

const QuoteSummary = () => {
  const navigate = useNavigate();
  const params = useParams();
  const quoteId = params.id?.slice(2) || "";
  const [showQuoteDetails, setShowQuoteDetails] = useState(false);
  const [gState, setGState] = useSafeContext({
    componentName: "QuoteSummary",
  });
  const [vals, setVals] = useState<any>(null);
  const [errored, setErrored] = useState(false);
  const [error, setError] = useState<string | React.JSX.Element | null>(null);
  const [incepted, setIncepted] = useState(false);
  const [expired, setExpired] = useState(false);
  const statefromExternalLink = useGlobalStateAdaptor(
    vals?.coreQuote,
    vals?.performanceQuote,
    vals?.selectedCoreScheme,
    quoteId,
  );

  const [loading, setIsLoading] = useState(false);
  const [clickedButton, setClickedButton] = useState(false);
  const [canProceedToPayment, setCanProceedToPayment] = useState(true);
  const [validateNextButton, setValidateNextButton] = useState(false);
  const [showReQuote, setShowReQuote] = useState(false);
  const [showReQuoteCore, setShowReQuoteCore] = useState(false);
  const [showReQuoteMessage, setShowReQuoteMessage] = useState(false);
  const [showCoreReQuoteMessage, setShowCoreReQuoteMessage] = useState(false);
  const [showPerformanceReQuoteMessage, setShowPerformanceReQuoteMessage] =
    useState(false);
  // React Query hook for retrieving quotes
  const {
    data: quoteData,
    isLoading: isQuoteLoading,
    error: quoteError,
  } = useRetrieveQuote(quoteId);

  // Handle quote retrieval response
  useEffect(() => {
    if (quoteError) {
      setErrored(true);
      setError(
        <p>
          Something went wrong getting your quote, please check the link is
          correct and try again or contact our customer service team on{" "}
          <a href="tel:08000833035" target="_blank" rel="noreferrer">
            <strong>0800 083 3035 </strong>
          </a>
        </p>,
      );
      return;
    }

    if (quoteData === null || vals !== null) {
      return;
    }

    if (quoteData) {
      if (quoteData?.Value?.coreQuote.inTransactor) {
        setIncepted(true);
        return;
      }
      if (quoteData?.Value?.coreQuote.expired) {
        setExpired(true);
        return;
      }

      setVals(quoteData);
    }
  }, [quoteData, quoteError, vals]);

  useEffect(() => {
    if (!showQuoteDetails || errored) {
      setGState(statefromExternalLink);
      if (!statefromExternalLink.loading) {
        setShowQuoteDetails(true);
      }
    }
  }, [statefromExternalLink, errored, setGState, showQuoteDetails]);

  const onProceedToPayment = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setValidateNextButton(true);
    if (gState.hasPreviousClaim === null) {
      return;
    }

    if (!canProceedToPayment) {
      setClickedButton(true);
      const ele = document.getElementById("yourQuote");
      ele?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo(0, 0);
      navigate(`/payment`);
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
      <TopNavBlank />
      <RegularBanner
        headlineLine1={"Your bike"}
        headlineLine2={"insurance quote"}
        subheadlineLine1={"Tell us about you, your bike and cover you need."}
        subheadlineLine2={""}
        hasCTA={"false"}
        rotate={isQuoteLoading}
      />
      <div className={isQuoteLoading || loading ? "overlay" : "overlay_hidden"}>
        <h1 className="GettingQuoteOverlayH1">
          {loading ? "Getting your updated quote..." : "Getting your quote..."}
        </h1>
      </div>
      {!isQuoteLoading &&
        !loading &&
        gState.performanceQuote !== null &&
        !incepted &&
        !expired && (
          <YourQuote
            error={error}
            coreQuote={gState.coreQuote}
            setIsLoading={setIsLoading}
            showError={clickedButton}
            fromExternalLink={true}
            canProceedToPayment={setCanProceedToPayment}
            performanceQuote={gState.performanceQuote}
            clearShowError={() => setClickedButton(false)}
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
      {incepted && (
        <h4
          id="quote-retrieval-incepted"
          className="container container_narrow content_section mt-5 mb-5"
        >
          You have already purchased this policy. If you require further
          assistance, please contact our customer service team on{" "}
          <a href="tel:08000833035" target="_blank" rel="noreferrer">
            <strong>0800 083 3035 </strong>
          </a>
        </h4>
      )}
      {expired && (
        <h4
          id="quote-retrieval-expired"
          className="container container_narrow content_section mt-5 mb-5"
        >
          this quote has expired. If you require further assistance, please
          contact our customer service team on{" "}
          <a href="tel:08000833035" target="_blank" rel="noreferrer">
            <strong>0800 083 3035 </strong>
          </a>
        </h4>
      )}

      {errored && (
        <h4
          id="quote-retrieval-expired"
          className="container container_narrow content_section mt-5 mb-5"
        >
          {error}
        </h4>
      )}

      {showQuoteDetails && (
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
                    id={`aggregator-proceed-to-payment#${gState.selectedCoreScheme ? "core" : "performance"}`}
                    className="btn btn-wider btn-green float-end"
                    onClick={onProceedToPayment}
                  >
                    Confirm details
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default QuoteSummary;
