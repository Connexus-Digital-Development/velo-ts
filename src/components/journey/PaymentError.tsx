import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import { useLocation } from "react-router-dom";
import { JourneyContext, initialJourneyState } from "@/context/journeyStore";
import { useContext, useEffect } from "react";
const PaymentError = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const quoteReference = query.get("quoteReference");
  const context = useContext(JourneyContext);
  const [, setGState] = context!;
  useEffect(() => {
    setGState(initialJourneyState);
    sessionStorage.removeItem("context");
  }, []);
  return (
    <div className="pr oh">
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Your bike insurance quote"}
        headlineLine2={""}
        subheadlineLine1={"Tell us about you, your bike and cover you need."}
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
      />
      <section
        className="container container_narrow pb-3"
        id="quote-referral-section"
      >
        <div className="content_section">
          <h4>Something went wrong processing the payment for your quote</h4>
          <p>
            Please try again later or call our customer service team on{" "}
            <a href="tel:08000833035" target="_blank" rel="noreferrer">
              <strong>0800 083 3035 </strong>
            </a>
            quoting reference {quoteReference} and they can help with getting
            you a full and accurate quote.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PaymentError;
