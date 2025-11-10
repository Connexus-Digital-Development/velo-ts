
import { Link } from "react-router-dom";
import BreadcrumbStep1 from "@/assets/svgs/breadcrumb-step-1.svg?url";
import BreadcrumbStep2 from "@/assets/svgs/breadcrumb-step-2.svg?url";
import BreadcrumbStep3 from "@/assets/svgs/breadcrumb-step-3.svg?url";
import BreadcrumbStep4 from "@/assets/svgs/breadcrumb-step-4.svg?url";

const CompletedBreadcrumbs = () => {


  const visitedStyle = {
    fill: "#fff",
    stroke: "#7BC10B",
    cursor: "not-allowed",
  };

  const visitedFontStyle = {
    fill: "#7BC10B",
    cursor: "not-allowed",
  };

  const focusFontStyle = {
    fill: "#fff",
  };

  const completedStyle = {
    fill: "#86bb2f",
  };

  return (
    <div className="container container_narrow">
      <svg
        className="breadcrumbSVG"
        xmlns="http://www.w3.org/2000/svg"
        width="113%"
        height="100"
        viewBox="0 0 1280 100"
      >
        <Link
          className="breadcrumbLink"
          to={'#'}
          style={{ textDecoration: "none" }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={BreadcrumbStep1}
              alt="Your cover breadcrumb step"
              style={{
                position: "absolute",
                top: "15.5px",
                left: "10.5px",
                width: "269.182px",
                height: "75.8px",
                ...visitedStyle
              }}
            />
          </div>
          <text
            id="Your_cover"
            data-name="Your cover"
            transform="translate(10 36)"
            className="breadcrumb-text"
            style={visitedFontStyle}
          >
            <tspan x="80" y="29">
              Your cover
            </tspan>
          </text>
        </Link>

        <Link
          className="breadcrumbLink"
          to={'#'}
          style={{ textDecoration: "none" }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={BreadcrumbStep2}
              alt="Your details breadcrumb step"
              style={{
                position: "absolute",
                top: "15.5px",
                left: "280.858px",
                width: "290.332px",
                height: "75.8px",
                ...visitedStyle
              }}
            />
          </div>
          <text
            id="Your_details"
            style={visitedFontStyle}
            transform="translate(275 36)"
            className="breadcrumb-text"
          >
            <tspan x="85" y="29">
              Your details
            </tspan>
          </text>
        </Link>

        <Link
          to={'#'}
          className="breadcrumbLink"
          style={{ textDecoration: "none" }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={BreadcrumbStep3}
              alt="Your quote breadcrumb step"
              style={{
                position: "absolute",
                top: "16px",
                left: "562.531px",
                width: "290.332px",
                height: "75.8px",
                ...visitedStyle
              }}
            />
          </div>
          <text
            id="Your_quote"
            transform="translate(550 36)"
            style={visitedFontStyle}

            className="breadcrumb-text"
          >
            <tspan x="90" y="29">
              Your quote
            </tspan>
          </text>
        </Link>

        <Link
          className="breadcrumbLink"
          to={'#'}
          style={{ textDecoration: "none" }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={BreadcrumbStep4}
              alt="Payment breadcrumb step"
              style={{
                position: "absolute",
                top: "15.5px",
                left: "844.2px",
                width: "265.67px",
                height: "75.8px",
                ...completedStyle
              }}
            />
          </div>
          <text
            id="Payment"
            transform="translate(850 36)"
            style={focusFontStyle}
            className="breadcrumb-text"
          >
            <tspan x="80" y="29">
              Ready!
            </tspan>
          </text>
        </Link>
      </svg>
    </div>
  );
};

export default CompletedBreadcrumbs;
