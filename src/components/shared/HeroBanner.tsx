import CTAButton from "./CTAButton";
import { useLocation } from "react-router-dom";

interface HeroBannerProps {
  image: number;
  heading1: string;
  heading2: string;
  subHeading: string;
}

const HeroBanner = (props: HeroBannerProps) => {
  const { search } = useLocation();
  let imageClass = "";

  switch (props.image) {
    case 1:
      imageClass = "HeroSingle";
      break;
    case 2:
      imageClass = "HeroMulti";
      break;
    case 3:
      imageClass = "HeroElectric";
      break;
    case 4:
      imageClass = "HeroTravel";
      break;
    case 5:
      imageClass = "HeroJonny";
      break;
    default:
      imageClass = "HeroSingle";
  }

  return (
    <div className={`container-fluid bgBlue oh pr ${imageClass}`}>
      <div className="container pt-150">
        <div className="headerBlockCopy heroPadding">
          <h1 className="align-content-lg-start heroText">{props.heading1}</h1>
          <h1 className="align-content-lg-start heroText">{props.heading2}</h1>
          <p className="hero-banner-subheadline bannerWidth w-50">
            {props.subHeading}
          </p>
          <div className="d-md-flex ">
            <div className="pr-3">
              <CTAButton
                align="left"
                colour={props.image === 4 ? "mustard" : "green"}
                CTAText={
                  props.image === 4 ? "Get a travel quote" : "Get a quote"
                }
                onClick={() => {
                  sessionStorage.removeItem("context");
                }}
                additionalClass="CTAHeroSmall"
                externalLink={props.image === 4}
                Url={
                  props.image === 4
                    ? "https://lawshieldvelosure.justtravelcover.com/quote/trip-details"
                    : `/get-a-quote${search}`
                }
              />
            </div>
            {/* <div className="pt-sm-3 pt-md-0">
              {props.image !== 4 && (
                <CTAButtonHash
                  align="left"
                  colour="white"
                  CTAText="Compare our cover"
                  additionalClass="CTAHeroSmall"
                  onClick={() => {
                    sessionStorage.removeItem("context");
                  }}
                  Url={`/bike-insurance-comparison-chart#chart`}
                />
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroBanner;
