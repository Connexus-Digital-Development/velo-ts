import { useState, useEffect } from "react";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import { Link, useNavigate } from "react-router-dom";
// import CTAButton from "./CTAButton";
// import { useLocation } from "react-router-dom";
import SOBBar from "./SOBBar";
import { VelosureLogoNavbar } from "../icons/VelosureLogoNavbar";

const TopNavBlank = () => {
  // const { search } = useLocation();
  // const [textColourClass, setTextColourClass] = useState("blueFont");

  const [backgroundColourClass] = useState("whiteNav");
  // const [_show, setShow] = useState(false);
  const [showSOBBanner, setShowSOBBanner] = useState(false);
  const [topSpacingClass, setTopSpacingClass] = useState("");
  // const handleClose = () => setShow(false);
  // const handleShow = () => {
  //   setShow(true);
  // };

  useEffect(() => {
    const SOB = sessionStorage.getItem("sourceOfBusinessId");
    const offerActive = sessionStorage.getItem("offerActive");
    if (SOB !== null && offerActive !== "true") {
      setShowSOBBanner(true);
      setTopSpacingClass("fixed-top-alternate");
    }
  }, []);

  const resetSObBanner = () => {
    setShowSOBBanner(false);
    setTopSpacingClass("");
  };

  return (
    <>
      {showSOBBanner === true && (
        <SOBBar
          bgColor={backgroundColourClass}
          resetSObBanner={resetSObBanner}
        />
      )}
      <nav
        className={`navbar navbar-expand-md navbar-toggleable-md navbar-light fixed-top ${topSpacingClass} menu ohm ${backgroundColourClass}`}
      >
        <div
          id="navBarContainer"
          className="container-fluid container_mega_wide pr"
        >
          <a
            className="navbar-brand"
            href="/"
            onClick={() => {
              //sessionStorage.removeItem("context");
            }}
          >
            <VelosureLogoNavbar svgFill="#00a8ff" svgFill2="#171715" />
          </a>
          <div className="test"></div>
        </div>
      </nav>
    </>
  );
};

export default TopNavBlank;
