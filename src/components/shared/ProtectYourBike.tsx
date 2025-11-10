import CTAButton from "./CTAButton";
import { useLocation } from "react-router-dom";

import { BikeMulti } from "../icons/BikeMulti";
import { BikeBlue } from "../icons/BikeBlue";
import { BikeEBike } from "../icons/BikeEBike";
import { BikeMustard } from "../icons/BikeMustard";
//
const ProtectYourBike = ({ variant }: { variant: number }) => {
  //prop variant 1 = single bike,multibike = 2 or electric = 3, or Travel version =4

  const { search } = useLocation();
  return (
    <div
      className={`${
        variant === 4 ? "mustardBG mustardBorder" : "blueBorderBott"
      }`}
    >
      <div className={`container  footerOverFlow`}>
        <div className="row pt-3 pb-3 pr">
          <div className="col-12 col-xl-9">
            {variant === 1 && (
              <h3 className="text-left center-on-mobile protect">
                Protect<span className="blueFont"> your bicycle</span> with the
                cover it deserves.
              </h3>
            )}

            {variant === 2 && (
              <h3 className="text-left center-on-mobile protect">
                Protect<span className="blueFont"> your bicycles</span> with the
                cover they deserve.
              </h3>
            )}

            {variant === 3 && (
              <h3 className="text-left center-on-mobile protect">
                Protect<span className="blueFont"> your bicycle</span> with the
                cover it deserves.
              </h3>
            )}
            {variant === 4 && (
              <h3 className="text-left center-on-mobile protect">
                Protect<span className="mustardFont"> your bicycle</span> with
                the travel cover it deserves.
              </h3>
            )}
          </div>
          <div className="col-xl-3 col-12 mt-3">
            <CTAButton
              align="center"
              colour={variant === 4 ? "mustard" : "blue"}
              CTAText={variant === 4 ? "Get a travel quote" : "Get a quote"}
              onClick={() => {
                sessionStorage.removeItem("context");
              }}
              externalLink={variant === 4}
              Url={
                variant === 4
                  ? "https://lawshieldvelosure.justtravelcover.com/quote/trip-details"
                  : `/get-a-quote${search}`
              }
            />
            {/* </div>
        <div className="col-sm-1"> */}
            {variant === 1 && <BikeBlue />}
            {variant === 2 && (
              <BikeMulti />
              // <img src={ProtectYourBikeMultiBike} alt="Multi bike icon" />
            )}
            {variant === 3 && (
              <BikeEBike />
              // <img src={ProtectYourBikeEBike} alt="E-Bike icon" />
            )}
            {variant === 4 && <BikeMustard />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectYourBike;
