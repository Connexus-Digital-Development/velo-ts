import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cog from "./Cog";
import CTAButton from "./CTAButton";
import { useLocation } from "react-router-dom";

interface RegularBannerProps {
  rotate?: boolean;
  requiresSpacer?: boolean;
  requiresExtraSpacer?: boolean;
  headlineLine1: string;
  headlineLine2: string;
  subheadlineLine1: string;
  subheadlineLine2: string;
  hasCTA?: string;
  image?: number;
  hasScrollCTA?: boolean;
  scrollCTARef?: React.RefObject<HTMLElement>;
  CTAText?: string;
}

const RegularBanner = (props: RegularBannerProps) => {
  const [rotating, setRotating] = useState(false);
  const { search } = useLocation();

  useEffect(() => {
    setRotating(props.rotate ?? false);
  }, [props.rotate]);

  return (
    <div id="journeyHeadingBlock" className=" oh pr z0 ">
      <div className="container">
        <div className="sharedHeaderBlockCopy">
          {props.requiresSpacer === true && (
            <div className="spacerForNoCTAScenario"></div>
          )}
          {props.requiresExtraSpacer === true && (
            <div className="spacerForNoCTAScenarioExtra"></div>
          )}
          <h1 className="align-content-start heroText">
            {props.headlineLine1}
          </h1>
          <h1 className="align-content-start heroText">
            {props.headlineLine2}
          </h1>
          <p className="banner-subheadlin  w-50">
            {props.subheadlineLine1} {props.subheadlineLine2}
          </p>
          {props.hasCTA === "true" && (
            <CTAButton
              align="left"
              colour={props.image === 5 ? "mustard" : "green"}
              CTAText={props.image === 5 ? "Get a travel quote" : "Get a quote"}
              Url={`/get-a-quote${search}`}
            />
          )}
          {props.hasScrollCTA === true && props.scrollCTARef && (
            <button
              onClick={() => {
                props.scrollCTARef!.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
              className="btn btn-green mt-3 btn-wider mb-2 lufga"
            >
              {props.CTAText}
            </button>
          )}
        </div>
      </div>

      <div className="bannerSVG">
        {props.requiresExtraSpacer === true && (
          <div className="spacerForNoCTAScenarioExtra"></div>
        )}
        <Cog rotate={rotating} />
      </div>
    </div>
  );
};

export default RegularBanner;
