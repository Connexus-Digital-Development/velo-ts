import { useState, useEffect, type ReactElement } from "react";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import { HomeSecurityIcon } from "../../icons/HomeSecurityIcon";
import { OutbuildingSecurityIcon } from "@/components/icons/OutbuidingSecurityIcon";
import { CommunalSecurityIcon } from "../../icons/CommunalSecurityIcon";

interface BikeSecurityProps {
  setLocationInvalid: (valid: boolean) => void;
}

const isHomeHelpText = (
  <span>
    A house, a flat, lockable private room in halls of residence or a privately
    accessed integral garage.
  </span>
);

const outBuildingHomeText = (
  <span>
    An attached or detached garage, privately accessed wooden or metal
    shed.{" "}
  </span>
);

const communalHelpText = (
  <span>A communal hallway or a communal outbuilding. </span>
);

const otherHelpText = (
  <span>
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
    to discuss your details in full so we can provide a full and accurate quote.
  </span>
);

const BikeSecurity = ({ setLocationInvalid }: BikeSecurityProps) => {
  const [state, setState] = useSafeContext({
    componentName: "BikeSecurity",
  });
  const [helpText, setHelpText] = useState(isHomeHelpText);
  const [isHome, setIsHome] = useState(false);
  const [isHomeHover, setIsHomeHover] = useState(false);
  const [isOutbuilding, setIsOutbuilding] = useState(false);
  const [isOutbuildingHover, setIsOutbuildingHover] = useState(false);
  const [isCommunal, setIsCommunal] = useState(false);
  const [isCommunalHover, setIsCommunalHover] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [_isOtherHover, setIsOtherHover] = useState(false);

  const handleHomeClick = () => {
    setStatesToFalse();
    setIsHome(true);
    setState({ ...state, storageLocation: 1 });
    setHelpText(isHomeHelpText);
    setLocationInvalid(true);
  };
  const handleOutbuildingClick = () => {
    setStatesToFalse();
    setIsOutbuilding(true);
    setState({ ...state, storageLocation: 2 });
    setHelpText(outBuildingHomeText);
    setLocationInvalid(true);
  };
  const handleCommunalClick = () => {
    setStatesToFalse();
    setIsCommunal(true);
    setState({ ...state, storageLocation: 3 });
    setHelpText(communalHelpText);
    setLocationInvalid(true);
  };
  const handleOtherClick = () => {
    setStatesToFalse();
    setIsOther(true);
    setState({ ...state, storageLocation: 4 });
    setHelpText(otherHelpText);
    setLocationInvalid(false);
  };

  const handleHover = (
    hoverState: boolean,
    hoverAction: React.Dispatch<React.SetStateAction<boolean>>,
    helpText: ReactElement,
  ) => {
    hoverAction(hoverState);
    setHelpText(helpText);
  };
  const getHelperText = () => {
    if (isHome) {
      return isHomeHelpText;
    }
    if (isOutbuilding) {
      return outBuildingHomeText;
    }
    if (isCommunal) {
      return communalHelpText;
    }

    return otherHelpText;
  };

  const setStatesToFalse = () => {
    setIsHome(false);
    setIsOutbuilding(false);
    setIsCommunal(false);
    setIsOther(false);
  };

  const GetInitialButtonStates = () => {
    switch (state.storageLocation) {
      case 1:
        {
          setIsHome(true);
          setHelpText(isHomeHelpText);
        }
        break;
      case 2:
        {
          setIsOutbuilding(true);
          setHelpText(outBuildingHomeText);
        }
        break;
      case 3:
        {
          setIsCommunal(true);
          setHelpText(communalHelpText);
        }
        break;
      case 4:
        {
          setIsOther(true);
          setHelpText(otherHelpText);
        }
        break;
    }
  };
  useEffect(() => {
    GetInitialButtonStates();
  }, []);

  const style = { opacity: 0 };

  return (
    <section className="container container_narrow">
      <div className="content_section w mt-3 mb-3">
        <h3 className="journey-section-titles">
          Bike<span className="blueFont"> security</span>.
        </h3>
        <div className="row">
          <form>
            <div className="col-md-12">
              <p className="lufga-light">
                Where do you usually keep your bike(s) when not in use?
              </p>

              <div className="row">
                <div className="col-12 col-lg-3">
                  <label
                    id="bikeStorage1"
                    className={
                      isHome === true
                        ? "btn btn-secondary btn-100 mr-1 primaryFocussed mb-2"
                        : "btn btn-secondary btn-100 mr-1 mb-2"
                    }
                    onClick={handleHomeClick}
                    onMouseEnter={() =>
                      handleHover(true, setIsHomeHover, isHomeHelpText)
                    }
                    onMouseLeave={() =>
                      handleHover(false, setIsHomeHover, getHelperText())
                    }
                  >
                    <span className="btn-icon-security">
                      <HomeSecurityIcon
                        isHome={isHome}
                        isHomeHover={isHomeHover}
                      />
                    </span>
                    <span className="SecurityLocationButtonLabel">Home </span>
                  </label>
                </div>
                <div className="col-12 col-lg-3">
                  {" "}
                  <label
                    id="bikeStorage2"
                    className={
                      isOutbuilding === true
                        ? "btn btn-secondary btn-100 mr-1 primaryFocussed mb-2"
                        : "btn btn-secondary btn-100 mr-1 mb-2"
                    }
                    onClick={handleOutbuildingClick}
                    onMouseEnter={() =>
                      handleHover(
                        true,
                        setIsOutbuildingHover,
                        outBuildingHomeText,
                      )
                    }
                    onMouseLeave={() =>
                      handleHover(false, setIsOutbuildingHover, getHelperText())
                    }
                  >
                    <span className="btn-icon-security">
                      <OutbuildingSecurityIcon
                        isOutbuilding={isOutbuilding}
                        isOutbuildingHover={isOutbuildingHover}
                      />
                    </span>
                    <span className="SecurityLocationButtonLabel">
                      Outbuilding
                    </span>
                  </label>
                </div>
                <div className="col-12 col-lg-3">
                  <label
                    id="bikeStorage3"
                    className={
                      isCommunal === true
                        ? "btn btn-secondary btn-100 mr-1 primaryFocussed mb-2"
                        : "btn btn-secondary btn-100 mr-1 mb-2"
                    }
                    onClick={handleCommunalClick}
                    onMouseEnter={() =>
                      handleHover(true, setIsCommunalHover, communalHelpText)
                    }
                    onMouseLeave={() =>
                      handleHover(false, setIsCommunalHover, getHelperText())
                    }
                  >
                    <span className="btn-icon-security">
                      <CommunalSecurityIcon
                        isCommunal={isCommunal}
                        isCommunalHover={isCommunalHover}
                      />
                    </span>
                    <span className="SecurityLocationButtonLabel">
                      Communal area
                    </span>
                  </label>
                </div>
                <div className="col-12 col-lg-3">
                  <label
                    id="bikeStorage4"
                    className={
                      isOther === true
                        ? "btn btn-secondary btn-100 mr-1 btn-icon-no-icon primaryFocussed mb-2"
                        : "btn btn-secondary btn-100 mr-1 btn-icon-no-icon mb-2"
                    }
                    onClick={handleOtherClick}
                    onMouseEnter={() =>
                      handleHover(true, setIsOtherHover, otherHelpText)
                    }
                    onMouseLeave={() =>
                      handleHover(false, setIsOtherHover, getHelperText())
                    }
                  >
                    <span className="SecurityLocationButtonLabel extraPaddingForLargerScreen">
                      Other
                    </span>
                  </label>
                </div>
              </div>
              <p
                style={style}
                className={
                  helpText === otherHelpText
                    ? "greyBG redFont lufga-regular"
                    : "greyBG lufga-regular"
                }
              >
                {helpText}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BikeSecurity;
