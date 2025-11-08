import CTAButton from "@/components/shared/CTAButton";
import { useLocation } from "react-router-dom";

const NeedAQuote = () => {
  const { search } = useLocation();
  return (
    <div className="container-fluid greyBG pr oh">
      <div className="container Why_Icons">
        <div className="row">
          <div className="col-12 mt-3 text-center mt-5 mb-5">
            <h3>
              Need a<span className="blueFont"> quote?</span>
            </h3>
            <p className="mobilePadding">
              Use our quick and easy online quote tool to get a tailored quote
            </p>
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
    </div>
  );
};

export default NeedAQuote;
