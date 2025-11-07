
import { Link } from "react-router-dom";

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
          <g>
            <path
              id="breadcrumbs1"
              data-name="Path 2110"
              d="M27.21,0H269.182l20.5,32.152a10.69,10.69,0,0,1,0,11.494L269.182,75.8H27.21A27.21,27.21,0,0,1,0,48.588V27.209A27.21,27.21,0,0,1,27.21,0"
              transform="translate(10.5 15.5)"
              style={visitedStyle}
              strokeWidth="2"
            />
          </g>
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
          <g>
            <path
              id="breadcrumbs2"
              data-name="Path 2111"
              d="M550.832,0H280.858l20.5,32.152a10.686,10.686,0,0,1,0,11.494L280.858,75.8H550.832l20.5-32.152a10.69,10.69,0,0,0,0-11.494Z"
              transform="translate(10.5 15.5)"
              strokeWidth="2"
              style={visitedStyle}
            />
          </g>
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
          <g>
            <path
              id="breadcrumbs3"
              data-name="Path 2112"
              d="M832.505,0H562.531l20.5,32.152a10.69,10.69,0,0,1,0,11.494L562.531,75.8H832.505l20.5-32.152a10.69,10.69,0,0,0,0-11.494Z"
              transform="translate(10 16)"
              style={visitedStyle}
              strokeWidth="2"
            />
          </g>
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
          <g>
            <path
              id="breadcrumbs4"
              data-name="Path 2113"
              d="M1085.87,0H844.2l20.5,32.152a10.69,10.69,0,0,1,0,11.494L844.2,75.8H1085.87a27.21,27.21,0,0,0,27.21-27.209V27.209A27.21,27.21,0,0,0,1085.87,0"
              transform="translate(10.5 15.5)"
              style={completedStyle}
              strokeWidth="2"
            />
          </g>
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
