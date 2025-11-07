import { type QuoteReferralProps } from "@/models/JourneyComponentTypes";

const QuoteReferral: React.FC<QuoteReferralProps> = ({ quoteReference }) => {
  return (
    <section
      className="container container_narrow pb-3"
      id="quote-referral-section"
    >
      <div className="content_section">
        <h4 className="">Your request for a quote has been referred.</h4>
        <p>
          Please call our customer service team on{" "}
          <a href="tel:08000833035" target="_blank" rel="noreferrer">
            <strong>0800 083 3035 </strong>
          </a>
          quoting reference {quoteReference} and they can help with getting you
          a full and accurate quote.
        </p>
      </div>
    </section>
  );
};

export default QuoteReferral;
