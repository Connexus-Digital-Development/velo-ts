import CTAButton from "@/components/shared/CTAButton";
import { useLocation } from "react-router-dom";
import mountainBike from "@/assets/images/mountainBike.jpg";

const IntroBlock = () => {
  const { search } = useLocation();
  return (
    <div className="container-fluid oh pr whiteBG">
      <div className="container">
        <div className="row mt-5 CycleInsuranceIntro">
          <div id="left" className="col-12 col-md-6 pr">
            <h4 className="text-left pt-4 pb-4 pr-5 lh-5">
              Complete bicycle insurance protection,{" "}
              <span className="blueFont">customisable to your needs </span>
              whether you own a single-bike, multiple bikes or an electric bike.
            </h4>

            <div className="col-12 d-block d-md-none mobile-bike-container">
              <img src={mountainBike} className="introBlocKBike" alt="Bike" />
            </div>
          </div>
          <div id="right" className="col-12 col-md-6 pt-4 mb-3 ">
            <h5 className="blackFont text-left">Cycle insurance</h5>
            <p className="pr-5 text-left">
              Velosure Cycle Insurance was designed with the cyclist in mind,
              covering the essentials as standard and offering optional extras
              to suit your specific needs. No other cycle specific policy we're
              aware of offers this depth of cover at such a competitive price,
              with essential features such as theft & accidental damage, repair
              & replacement, sports cover, cycle rescue and worldwide cover
              included as standard.
            </p>
            <div className="row">
              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-5 col-sm-4 col-5">
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
              {/* <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-5 col-6">
                <CTAButtonHash
                  align="left"
                  colour="blue"
                  CTAText="Compare our cover"
                  onClick={() => {
                    sessionStorage.removeItem("context");
                  }}
                  Url={`/bike-insurance-comparison-chart#chart`}
                />
              </div> */}
            </div>

            <h5 className="blackFont mt-5 text-left">Travel insurance</h5>
            <p className="pr-5 text-left ">
              Cycling abroad? Whether you plan on taking one or multiple trips
              overseas, Velosure have the perfect, low-cost option to ensure
              you're protected. Our Velosure Travel Insurance has been designed
              specifically with you, the cyclist, in mind. Whether you're
              heading to a duathlon in Lisbon or slogging it up the Alp D'Huez
              in France, you can enjoy your cycle adventure worry-free.
            </p>
            <CTAButton
              additionalClass="mb-5"
              align="left"
              colour="mustard"
              CTAText="More details"
              onClick={() => {
                sessionStorage.removeItem("context");
              }}
              Url={`/bicycle-travel-insurance${search}`}
            />
          </div>
        </div>
      </div>
      <img
        src={mountainBike}
        className="introBlocKBike d-none d-md-block"
        //className="img-fluid d-none d-sm-block"
        alt="Intro bike"
      />
    </div>
  );
};

export default IntroBlock;
