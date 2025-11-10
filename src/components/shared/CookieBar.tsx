import { useState } from "react";
import { useCookies } from "react-cookie";
import TagManager from "react-gtm-module";
import { useLocation } from "react-router-dom";
const CookieBar = () => {
  const [cookies, setCookie] = useCookies(["accepted"]);
  const [accepted, SetAccepted] = useState(cookies.accepted === "true");
  const location = useLocation();

  if (accepted) {
    const script = document.createElement("script");
    script.id = "_cls_detector";
    script.src = "https://cdn.gbqofs.com/connexus/p/detector-dom.min.js";
    script.setAttribute(
      "data-clsconfig",
      "reportURI=https://c2001.report.gbss.io/qbxssbhf/reporting/89344644-4191-5ec9-36af-ef14f14a4125/cls_report",
    );
    document.body.appendChild(script);
  }

  function handleAccepted() {
    SetAccepted(true);
    setCookie("accepted", "true", {
      path: "/",
    });
    TagManager.initialize({ gtmId: import.meta.env.VITE_GA4_MEASUREMENT_ID });
  }
  function handleRejected() {
    setCookie("accepted", "false", {
      path: "/",
    });
  }

  return (
    !cookies.accepted &&
    location.pathname.toLowerCase() !== "/privacy" && (
      <section id="cookie-bar-template">
        <div id="cookie-bar-overlay"></div>
        <div className="cookie-bar-content cookieBarDiv">
          <div className="container-fluid cookie-bar-container">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-6 col-xl-8 mobilePadding">
                <h4 className="strapline lufga slightlylowerOpacity">
                  This website uses cookies
                </h4>
                <p className="strapline roboto font-20 slightlylowerOpacity">
                  Some of these are necessary, while others allow us to enhance
                  your experience, personalise content and ads (across your
                  devices), and provide insights into how the site is being
                  used. For the full details of each of the cookies we use
                  please see our{" "}
                  <a href="/Cookies" className="findOutMore">
                    Cookie Policy
                  </a>
                  . Our recommended settings are that these cookies are all
                  active but if you aren't happy with this you can Decline.
                </p>
              </div>
              <div className="col-12 col-md-12 col-lg-3 col-xl-2 mobileMarginTop align-center">
                <button
                  onClick={handleAccepted}
                  className="btn btn-outline-light cookie-btn accept"
                >
                  Accept
                </button>
              </div>
              <div className="col-12 col-md-12 col-lg-2 mobileMarginTop align-center">
                <button
                  onClick={handleRejected}
                  className="btn btn-outline-light  cookie-btn"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default CookieBar;
