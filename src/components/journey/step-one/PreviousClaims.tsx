import { useState, useEffect, useContext } from "react";
import { JourneyContext } from "@/context/journeyStore";
import { type AboutYourBikeProps } from "@/models/JourneyComponentTypes";

const PreviousClaims = ({ validateNextButton }: AboutYourBikeProps) => {
  const [state, setState] = useContext(JourneyContext);
  const [showSetPreviousClaimsMessage, setShowSetPreviousClaimsMessage] =
    useState(false);
  const [unableToQuoteMessage, setUnableToQuoteMessage] = useState(false);

  useEffect(() => {
    if (validateNextButton && state.hasPreviousClaim == null) {
      setShowSetPreviousClaimsMessage(true);
    }
  }, [validateNextButton]);
  return (
    <section className="container container_narrow mt-3">
      <div className="content_section">
        <h3 className="journey-section-titles">
          Previous<span className="blueFont"> claims</span>.
        </h3>
        <p className="lufga-light">
          Have you had any previous cycle claims, losses or incidents in the
          last 5 years?{" "}
        </p>
        <div className="row">
          <div className="col-6 col-md-2" id="has-previous-claim">
            <button
              type="button"
              onClick={(e) => {
                setState({
                  ...state,
                  hasPreviousClaim: true,
                });
                setShowSetPreviousClaimsMessage(false);
              }}
              className={
                state.hasPreviousClaim === true
                  ? "btn btn-secondary btn-100 m-1 primaryFocussed"
                  : "btn btn-secondary btn-100 m-1"
              }
            >
              Yes
            </button>
          </div>
          <div className="col-6 col-md-2">
            <button
              type="button"
              onClick={(e) => {
                setState({
                  ...state,
                  hasPreviousClaim: false,
                });
                setShowSetPreviousClaimsMessage(false);
              }}
              className={
                state.hasPreviousClaim === false
                  ? "btn btn-secondary btn-100 m-1 primaryFocussed"
                  : "btn btn-secondary btn-100 m-1"
              }
            >
              No
            </button>
          </div>
          {showSetPreviousClaimsMessage && (
            <small className="redFont mt-1">
              Please select yes or no before continuing
            </small>
          )}
          {unableToQuoteMessage && (
            <span className="redFont mt-1">
              Please call us on{" "}
              <a
                className="redFont"
                rel="noreferrer"
                href="tel:08000833035"
                target="_blank"
              >
                {" "}
                0800 083 3035
              </a>{" "}
              to discuss your details in full so we can provide a full and
              accurate quote.
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default PreviousClaims;
