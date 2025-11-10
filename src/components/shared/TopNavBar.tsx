import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import CTAButton from "./CTAButton";
import { useLocation } from "react-router-dom";
import SOBBar from "./SOBBar";

import PhoneIcon from "@/assets/svgs/phone-icon.svg?url";
import VelosureLogoMobile from "@/assets/svgs/velosure-logo-mobile.svg?url";
import { VelosureLogoNavbar } from "../icons/VelosureLogoNavbar";

const TopNavBar = (props: { theme: "white" | "transparent" }) => {
  const { search } = useLocation();
  const [textColourClass, setTextColourClass] = useState("blueFont");
  const [svgFill, setSvgFill] = useState("#00a8ff");
  const [svgFill2, setSvgFill2] = useState("#171715");
  const [burgerColourClass, setBurgerColourClass] = useState(
    props.theme === "white" ? "btn-primary" : "btn-whiteNav",
  );
  const [burgerColourIconClass, setBurgerColourIconClass] = useState(
    props.theme === "white"
      ? "navbar-toggler-icon"
      : "navbar-toggler-icon navbar-toggler-icon-white",
  );

  const [backgroundColourClass, setBackgroundColourClass] =
    useState("whiteNav");
  const [show, setShow] = useState(false);
  const [showSOBBanner, setShowSOBBanner] = useState(false);
  const [topSpacingClass, setTopSpacingClass] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

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

  const handleScroll = () => {
    if (props.theme === "white") return;

    const position = window.scrollY;
    if (position > 20 && props.theme === "transparent") {
      setBackgroundColourClass("whiteNav");
      setSvgFill("#00a8ff");
      setSvgFill2("#171715");
      setBurgerColourClass("btn-primary");
      setBurgerColourIconClass("navbar-toggler-icon");
      setTextColourClass("blueFont");
    } else {
      setBackgroundColourClass("transparentNav");
      setSvgFill("#fff");
      setSvgFill2("#fff");
      setBurgerColourClass("btn-whiteNav");
      setBurgerColourIconClass("navbar-toggler-icon navbar-toggler-icon-white");
      setTextColourClass("whiteFont");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (props.theme === "transparent") {
      setBackgroundColourClass("transparentNav");
      setSvgFill("#fff");
      setSvgFill2("#fff");
      setTextColourClass("whiteFont");
    } else if (props.theme === "white") {
      setBackgroundColourClass("whiteNav");
      setSvgFill("#00a8ff");
      setTextColourClass("blueFont");
    }

    if (showSOBBanner) {
      setTopSpacingClass("top-fixed-variation");
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          className="container-fluid container_mega_wide"
        >
          <a
            className="navbar-brand"
            href="/"
            onClick={() => {
              sessionStorage.removeItem("context");
            }}
          >
            <VelosureLogoNavbar svgFill={svgFill} svgFill2={svgFill2} />
          </a>

          <div className="linksBox d-none d-xl-block">
            <div className="row">
              <div className="col-2 col-sm-3 col-md-2">
                <div className="dropdown">
                  <div
                    className={`dropdown-toggle nav-link ${textColourClass}`}
                    id="dropdownMenuLink"
                    data-bs-toggle=""
                    aria-expanded="false"
                  >
                    Our cover
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/single-bike-insurance"
                      >
                        <div className="menuItem">
                          <h6>Single bike cover</h6>
                          <p>
                            Cycle insurance that covers you
                            <br /> where you need it most.
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/multi-bike-insurance"
                      >
                        <div className="menuItem">
                          <h6>Multi bike cover</h6>
                          <p>
                            Best value multi bike cover on the market,
                            <br /> leading protection for all your cycles.
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/electric-bicycle-insurance"
                      >
                        <div className="menuItem">
                          <h6>E-bike cover</h6>
                          <p>
                            E-bike policy that covers you for theft,
                            <br />
                            accidental damage, cycle battery & more.
                          </p>
                        </div>
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/OurCoverLevels">
                        <div className="menuItem">
                          <h6>Our cover levels</h6>
                          <p>
                            All of the information you need to decide
                            <br />
                            if our cover meets your needs.
                            <br />
                          </p>
                        </div>
                      </Link>
                    </li>
                    {
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/bike-insurance-comparison-chart"
                        >
                          <div className="menuItem">
                            <h6>Compare our cover</h6>
                            <p>See how we compare to our competitors.</p>
                          </div>
                        </Link>
                      </li>
                    }
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/bicycle-travel-insurance"
                      >
                        <div className="menuItem">
                          <h6>Additional travel cover</h6>
                          <p>
                            Competitive rates for travellers where <br />
                            cycling is a main activity.
                            <br />
                          </p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-2 col-sm-3 col-md-2 mr-3">
                <div className="dropdown">
                  <div
                    className={`dropdown-toggle nav-link ${textColourClass}`}
                    id="dropdownMenuLink"
                    data-bs-toggle=""
                    aria-expanded="false"
                  >
                    Information
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" to="/policy-information">
                        <div className="menuItem">
                          <h6>Policy information</h6>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/security-requirements"
                      >
                        <div className="menuItem">
                          <h6>Security requirements</h6>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/bicycle-insurance-faqs"
                      >
                        <div className="menuItem">
                          <h6>FAQ</h6>
                        </div>
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/Reviews">
                        <div className="menuItem">
                          <h6>Reviews</h6>
                        </div>
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/accessories-we-cover"
                      >
                        <div className="menuItem">
                          <h6>Accessories we cover</h6>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-2 col-sm-3 col-md-2">
                {" "}
                <div className="dropdown">
                  <Link
                    className={`nav-link ${textColourClass}`}
                    to={`/affiliate-scheme${search}`}
                  >
                    Affiliate
                  </Link>
                </div>
              </div>
              <div className="col-2 col-sm-3 col-md-2">
                {" "}
                <div className="dropdown">
                  <Link className={`nav-link ${textColourClass}`} to="/Pitstop">
                    Blog
                  </Link>
                </div>
              </div>
              <div className="col-2">
                {" "}
                <div className="dropdown">
                  <div
                    className={`dropdown-toggle nav-link ${textColourClass}`}
                    // href="#"
                    id="dropdownMenuLink"
                    data-bs-toggle=""
                    aria-expanded="false"
                  >
                    Company
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" to="/about">
                        <div className="menuItem">
                          <h6>About us</h6>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/contact">
                        <div className="menuItem">
                          <h6>Contact us</h6>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/SubmitAClaim">
                        <div className="menuItem">
                          <h6>Submit a claim</h6>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/MakeAComplaint">
                        <div className="menuItem">
                          <h6>Make a complaint</h6>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/ReferAFriend">
                        <div className="menuItem">
                          <h6>Refer a friend</h6>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="inline-flex btnGroup">
            <a
              href="tel:0800 083 3035 "
              className="btn btn-green callNavButton "
            >
              <img
                src={PhoneIcon}
                alt="Phone Icon"
                className="phoneIconNavBar"
              />
            </a>

            {/* <button
              className="bg-transparent border-0"
              //calling twice seems to resolve race conditions
              onClick={() => {
                sessionStorage.removeItem("context");
                sessionStorage.removeItem("context");
              }}
            > */}
            <CTAButton
              align="left"
              colour="green"
              CTAText="Quote me"
              onClick={() => {
                sessionStorage.removeItem("context");
                sessionStorage.removeItem("context");
              }}
              Url={`/get-a-quote${search}`}
            />
            {/* </button> */}
            <button
              className={`dropdown-toggle d-block d-xl-none ml-1 ${burgerColourClass}`}
              onClick={handleShow}
            >
              <span className={`${burgerColourIconClass}`}></span>
            </button>
          </div>
        </div>

        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {" "}
              <Link
                className="navbar-brand"
                to="/"
                onClick={() => {
                  sessionStorage.removeItem("context");
                }}
              >
                <img src={VelosureLogoMobile} alt="Velosure Logo" />
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul id="burgerList">
              <li>
                <span>Our cover</span>
                <ul>
                  <li>
                    <Link to="/single-bike-insurance">Single bike cover</Link>
                  </li>
                  <li>
                    <Link to="/multi-bike-insurance">Multi bike cover</Link>
                  </li>
                  <li>
                    <Link to="/electric-bicycle-insurance">E-bike cover</Link>
                  </li>

                  <li>
                    <Link to="/OurCoverLevels">Our cover levels</Link>
                  </li>
                  {/* <li>
                    <Link to="/bike-insurance-comparison-chart">
                      Compare our cover
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/bicycle-travel-insurance">
                      Additional travel cover
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <span>Information</span>
                <ul>
                  <li>
                    <Link to="/policy-information">Policy information</Link>
                  </li>
                  <li>
                    <Link to="/security-requirements">
                      Security requirements
                    </Link>
                  </li>
                  <li>
                    <Link to="/bicycle-insurance-faqs">FAQ</Link>
                  </li>

                  <li>
                    <Link to="/Reviews">Reviews</Link>
                  </li>

                  <li>
                    <Link to="/accessories-we-cover">Accessories we cover</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to={`/affiliate-scheme${search}`}>
                  <span>Affiliate</span>
                </Link>
              </li>
              <li>
                <Link to="/Pitstop">
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <span>Company</span>
                <ul>
                  <li>
                    <Link to="/about">About us</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact us</Link>
                  </li>
                  <li>
                    <Link to="/SubmitAClaim">Submit a claim</Link>
                  </li>
                  <li>
                    <Link to="/MakeAComplaint">Make a complaint</Link>
                  </li>
                  <li>
                    <Link to="/ReferAFriend">Refer a friend</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </nav>
    </>
  );
};

export default TopNavBar;
