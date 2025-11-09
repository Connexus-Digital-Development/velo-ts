import { useSafeContext } from "@/context/journeyStore";
import { Link, useLocation } from "react-router-dom";
import BreadcrumbStep1 from "@/assets/svgs/breadcrumb-step-1.svg?url";
import BreadcrumbStep2 from "@/assets/svgs/breadcrumb-step-2.svg?url";
import BreadcrumbStep3 from "@/assets/svgs/breadcrumb-step-3.svg?url";
import BreadcrumbStep4 from "@/assets/svgs/breadcrumb-step-4.svg?url";

interface BreadcrumbsProps {
  navigationAction?: (() => Promise<void>) | null;
}

const Breadcrumbs = ({ navigationAction = null }: BreadcrumbsProps) => {
  const [state] = useSafeContext({
    componentName: "Breadcrumbs",
  });
  const UNVISITED = 0;
  const VISITED = 1;
  const FOCUS = 2;
  const COMPLETED = 3;
  const { search } = useLocation();

  const getStyle = (currentState: any) => {
    if (currentState === UNVISITED) return unvisitedStyle;
    if (currentState === VISITED) return visitedStyle;
    if (currentState === FOCUS) return focusStyle;
    if (currentState === COMPLETED) return completedStyle;
    return unvisitedStyle;
  };

  const getFontStyle = (currentState: any) => {
    if (currentState === UNVISITED) return unvisitedFontStyle;
    if (currentState === VISITED) return visitedFontStyle;
    if (currentState === FOCUS) return focusFontStyle;
    if (currentState === COMPLETED) return focusFontStyle;
    return unvisitedFontStyle;
  };

  const unvisitedStyle = {
    fill: "#f1f1f1",
    stroke: "#bbb",
    cursor: "not-allowed",
  };

  const unvisitedFontStyle = {
    fill: "#bbb",
    cursor: "not-allowed",
  };

  const visitedStyle = {
    fill: "#fff",
    stroke: "#7BC10B",
  };

  const visitedFontStyle = {
    fill: "#7BC10B",
  };

  const focusStyle = {
    fill: "#0098dd",
    stroke: "#0098dd",
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
          to={state.yourDetailsCrumb > 0 ? `/stepOne${search}` : "#"}
          className="breadcrumbLink"
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
                ...getStyle(state.yourCoverCrumb)
              }}
            />
          </div>
          <text
            id="Your_cover"
            data-name="Your cover"
            transform="translate(10 36)"
            className="breadcrumb-text"
            style={getFontStyle(state.yourCoverCrumb)}
          >
            <tspan x="80" y="29">
              Your cover
            </tspan>
          </text>
        </Link>

        {navigationAction === null && (
          <Link
            to={state.yourDetailsCrumb > 0 ? `/stepTwo${search}` : "#"} // unless this step has been visited dont allow
            className="breadcrumbLink"
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
                  ...getStyle(state.yourDetailsCrumb)
                }}
              />
            </div>
            <text
              id="Your_details"
              style={getFontStyle(state.yourDetailsCrumb)}
              transform="translate(275 36)"
              className="breadcrumb-text"
            >
              <tspan x="85" y="29">
                Your details
              </tspan>
            </text>
          </Link>
        )}
        {navigationAction !== null && (
          <a
            onClick={navigationAction}
            className="breadcrumbLink"
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
                  ...getStyle(state.yourDetailsCrumb)
                }}
              />
            </div>
            <text
              id="Your_details"
              style={getFontStyle(state.yourDetailsCrumb)}
              transform="translate(275 36)"
              className="breadcrumb-text"
            >
              <tspan x="85" y="29">
                Your details
              </tspan>
            </text>
          </a>
        )}

        <Link
          to={state.yourQuoteCrumb > 0 ? `/stepThree${search}` : "#"} // unless this step has been visited dont allow
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
                ...getStyle(state.yourQuoteCrumb)
              }}
            />
          </div>
          <text
            id="Your_quote"
            transform="translate(550 36)"
            style={getFontStyle(state.yourQuoteCrumb)}
            className="breadcrumb-text"
          >
            <tspan x="90" y="29">
              Your quote
            </tspan>
          </text>
        </Link>

        <Link
          to={state.paymentCrumb > 0 ? `/StepFour${search}` : "#"} // unless this step has been visited dont allow
          className="breadcrumbLink"
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
                ...getStyle(state.paymentCrumb)
              }}
            />
          </div>
          <text
            id="Payment"
            transform="translate(850 36)"
            style={getFontStyle(state.paymentCrumb)}
            className="breadcrumb-text"
          >
            <tspan x="80" y="29">
              {state.paymentCrumb < 3 && "Payment"}
              {state.paymentCrumb === 3 && "Ready!"}
            </tspan>
          </text>
        </Link>
      </svg>
    </div>
  );
};

export default Breadcrumbs;
