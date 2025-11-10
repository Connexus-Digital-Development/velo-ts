import CTAButton from "@/components/shared/CTAButton";
import { useLocation } from "react-router-dom";

const IntroBlock = () => {
  const { search } = useLocation();
  return (
    <div className="container-fluid whiteBG pr oh mb-5">
      <img
        src="/static/media/bikeCouple.a433751ebdc08604489c.png"
        alt="biker couple"
        className="bikerCoupleImage"
      />
      <div className="container mt-5">
        <div className="row ">
          <div
            id="left"
            className="col-12 col-lg-6 mt-sm-5  mb-3 coverFeatLeft"
          >
            <h3>
              Designed and developed{" "}
              <span className="blueFont">
                for <br />
                cyclists
              </span>
              .
            </h3>
            <p className="pr-3">
              Our cover is designed to protect a cyclist and their bicycle for
              everything cycling can throw at you. Our competitors often offer
              an entry level cover for a lower premium, where we offer a
              higher-level standard cover at a similar premium.
            </p>
          </div>
        </div>
        <div className="mb-5 DesAnDev">
          <CTAButton
            align="left"
            colour="green"
            CTAText="Get a quote"
            onClick={() => {
              sessionStorage.removeItem("context");
            }}
            Url={`/get-a-quote${search}`}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroBlock;
