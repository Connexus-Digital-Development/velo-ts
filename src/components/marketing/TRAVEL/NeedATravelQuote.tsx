import CTAButton from "@/components/shared/CTAButton";
import { useLocation } from "react-router-dom";

const NeedATravelQuote = () => {
  const { search } = useLocation();
  return (
    <div className="container-fluid greyBG pr oh">
      <div className="container Why_Icons">
        <div className="row">
          <div className="col-12 mt-3 text-center mt-5 mb-5">
            <h3>
              After an<span className="blueFont"> annual</span> cycle insurance
              policy?
            </h3>
            <p className="pr-5 pl-5 pt-2">
              If you are looking to <span>protect you and your cycle</span> all
              year round, Velosure offer a comprehensive insurance covering you
              for everything from theft, accidental damage, public liability and
              much more.
            </p>
            <CTAButton
              align="center"
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

export default NeedATravelQuote;
