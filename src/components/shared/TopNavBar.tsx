import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import CTAButton from "./CTAButton";
import { useLocation } from "react-router-dom";
import SOBBar from "./SOBBar";

const TopNavBar = (props) => {
  const { search } = useLocation();
  const [textColourClass, setTextColourClass] = useState("blueFont");
  const [svgFill, setSvgFill] = useState("#00a8ff");
  const [svgFill2, setSvgFill2] = useState("#171715");
  const [burgerColourClass, setBurgerColourClass] = useState(
    props.theme === "white" ? "btn-primary" : "btn-whiteNav"
  );
  const [burgerColourIconClass, setBurgerColourIconClass] = useState(
    props.theme === "white"
      ? "navbar-toggler-icon"
      : "navbar-toggler-icon navbar-toggler-icon-white"
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
    if (SOB !== null && offerActive !== 'true') {
      setShowSOBBanner(true);
      setTopSpacingClass("fixed-top-alternate");
    } 
  }, []);

  const resetSObBanner= () =>{
    setShowSOBBanner(false);
    setTopSpacingClass("");
  }

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
      {showSOBBanner === true && <SOBBar bgColor={backgroundColourClass} resetSObBanner={resetSObBanner} />}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="187.204"
              height="44"
              viewBox="0 0 187.204 44"
            >
              <g
                id="Group_1580"
                data-name="Group 1580"
                transform="translate(-687.36 -80.891)"
              >
                <g
                  id="Group_1563"
                  data-name="Group 1563"
                  transform="translate(687.36 80.891)"
                >
                  <path
                    id="Path_1898"
                    data-name="Path 1898"
                    d="M459.934,482.308a3.517,3.517,0,0,1,0-6.815.647.647,0,0,0,.5-.7.614.614,0,0,0-.015-.15,26.762,26.762,0,0,0-.8-3.088.733.733,0,0,0-.843-.442,3.482,3.482,0,0,1-4.011-1.645,3.447,3.447,0,0,1,.562-4.247.632.632,0,0,0,.214-.514.7.7,0,0,0-.174-.493,23.734,23.734,0,0,0-2.247-2.247.679.679,0,0,0-.923.04,3.544,3.544,0,0,1-6.094-2.528,3.439,3.439,0,0,1,.117-.838.644.644,0,0,0,0-.431.661.661,0,0,0-.436-.455,21.508,21.508,0,0,0-3.049-.843.688.688,0,0,0-.8.481,3.565,3.565,0,0,1-6.9.04.682.682,0,0,0-.8-.521,20.158,20.158,0,0,0-3.049.843.645.645,0,0,0-.46.74.906.906,0,0,0,.019.146,3.6,3.6,0,0,1,.117.85,3.545,3.545,0,0,1-6.094,2.516.678.678,0,0,0-.922-.04,19.75,19.75,0,0,0-2.247,2.247.705.705,0,0,0-.175.493.633.633,0,0,0,.214.514,3.445,3.445,0,0,1,.562,4.247,3.5,3.5,0,0,1-4.011,1.645.732.732,0,0,0-.842.442,20.549,20.549,0,0,0-.8,3.088.727.727,0,0,0-.017.173.646.646,0,0,0,.5.674,3.517,3.517,0,0,1,0,6.815.647.647,0,0,0-.5.7.67.67,0,0,0,.015.15,26.787,26.787,0,0,0,.8,3.089.732.732,0,0,0,.842.441,3.482,3.482,0,0,1,4.011,1.645,3.446,3.446,0,0,1-.562,4.248.632.632,0,0,0-.214.513.707.707,0,0,0,.175.494,23.744,23.744,0,0,0,2.247,2.246.678.678,0,0,0,.922-.04,3.545,3.545,0,0,1,6.094,2.528,3.416,3.416,0,0,1-.117.838.648.648,0,0,0,0,.431.663.663,0,0,0,.436.456,21.605,21.605,0,0,0,3.049.842.689.689,0,0,0,.8-.481,3.565,3.565,0,0,1,6.9-.04.681.681,0,0,0,.8.521,20.2,20.2,0,0,0,3.049-.842.645.645,0,0,0,.46-.74.8.8,0,0,0-.019-.147,3.569,3.569,0,0,1-.117-.85,3.545,3.545,0,0,1,6.094-2.516.679.679,0,0,0,.923.04,19.825,19.825,0,0,0,2.247-2.246.707.707,0,0,0,.174-.494.63.63,0,0,0-.214-.513,3.448,3.448,0,0,1-.562-4.248,3.5,3.5,0,0,1,4.011-1.645.733.733,0,0,0,.843-.441,20.512,20.512,0,0,0,.8-3.089.7.7,0,0,0,.017-.173A.646.646,0,0,0,459.934,482.308Zm-9.126-12.654q.25.332.484.678a.455.455,0,0,1-.271.7l-11.691,2.815a2.609,2.609,0,0,0-1.819,1.587l-1.238,3.169a.227.227,0,0,1-.423,0l-.439-1.128a1.134,1.134,0,0,1,.007-.841l1.06-2.586a2.608,2.608,0,0,1,1.783-1.543l12.076-3.011A.454.454,0,0,1,450.807,469.654Zm-13.082,12.9,2.2-5.368a2.608,2.608,0,0,1,1.756-1.536l10.569-2.755a.452.452,0,0,1,.534.265q.18.448.332.909a.449.449,0,0,1-.321.588l-9.947,2.448a2.61,2.61,0,0,0-1.806,1.583l-2.369,6.061a.227.227,0,0,1-.423,0l-.529-1.355A1.133,1.133,0,0,1,437.726,482.549Zm.748-19.067a15.346,15.346,0,0,1,10,3.686.454.454,0,0,1-.194.784l-12.186,2.886a2.609,2.609,0,0,0-1.829,1.589l-.2.5a.227.227,0,0,1-.423,0l-2.614-6.716a.812.812,0,0,1,.382-1.015A15.337,15.337,0,0,1,438.473,463.482Zm-.237,30.835a15.415,15.415,0,0,1-12.219-24.5.8.8,0,0,1,1.38.161l8.2,19.884a1.589,1.589,0,0,0,1.468.982h2.845a1.588,1.588,0,0,0,1.47-.986l3.432-8.38a2.608,2.608,0,0,1,1.769-1.539l6.738-1.719a.455.455,0,0,1,.567.433c0,.082,0,.163,0,.245A15.419,15.419,0,0,1,438.236,494.317Z"
                    transform="translate(-416.514 -456.901)"
                    fill={svgFill}
                  />
                  <g
                    id="Group_1560"
                    data-name="Group 1560"
                    transform="translate(47.156 4.234)"
                  >
                    <g
                      id="Group_1558"
                      data-name="Group 1558"
                      transform="translate(0 0)"
                    >
                      <path
                        id="Path_1899"
                        data-name="Path 1899"
                        d="M509.12,465.216h5.1l7.336,18.852,7.37-18.852H534l-9.956,24.309h-4.891Z"
                        transform="translate(-509.12 -465.216)"
                        fill={svgFill2}
                      />
                      <path
                        id="Path_1900"
                        data-name="Path 1900"
                        d="M552.961,486.54c0-5.6,3.828-9.355,9.6-9.355s9.6,3.756,9.6,9.355v.815l-.355.355H557.284a5.178,5.178,0,0,0,5.281,4.642,5.37,5.37,0,0,0,4.854-2.976h4.324a9.379,9.379,0,0,1-9.178,6.52C556.789,495.9,552.961,492.139,552.961,486.54Zm14.6-2.374a5.35,5.35,0,0,0-9.994,0Z"
                        transform="translate(-530.637 -471.09)"
                        fill={svgFill2}
                      />
                      <path
                        id="Path_1901"
                        data-name="Path 1901"
                        d="M595.691,465.216h4.252v24.309h-4.252Z"
                        transform="translate(-551.609 -465.216)"
                        fill={svgFill2}
                      />
                      <path
                        id="Path_1902"
                        data-name="Path 1902"
                        d="M609.053,486.54c0-5.6,3.828-9.355,9.6-9.355s9.6,3.756,9.6,9.355-3.828,9.355-9.6,9.355S609.053,492.139,609.053,486.54Zm14.954,0c0-3.366-2.126-5.6-5.351-5.6s-5.351,2.233-5.351,5.6,2.126,5.6,5.351,5.6S624.007,489.907,624.007,486.54Z"
                        transform="translate(-558.167 -471.09)"
                        fill={svgFill2}
                      />
                      <path
                        id="Path_1903"
                        data-name="Path 1903"
                        d="M649,489.375h4c.142,1.771,1.843,2.976,4.218,2.976s3.967-.922,3.967-2.3c0-.85-1.063-1.453-4.357-2.091-5.139-1.169-6.769-2.339-6.769-5.28,0-3.3,2.87-5.492,7.159-5.492a7.7,7.7,0,0,1,7.405,4.607l-3.9.956a3.792,3.792,0,0,0-3.507-2.019c-1.736,0-2.906.709-2.906,1.736,0,.744.815,1.2,3.331,1.772,5.917,1.24,7.8,2.586,7.8,5.812,0,3.508-3.3,5.847-8.22,5.847C652.439,495.9,649.143,493.273,649,489.375Z"
                        transform="translate(-577.773 -471.09)"
                        fill={svgFill2}
                      />
                      <path
                        id="Path_1904"
                        data-name="Path 1904"
                        d="M702.76,495.877h-4.252v-1.311a7.421,7.421,0,0,1-4.82,1.807c-4.856,0-8.08-2.87-8.08-7.193V478.158h4.252v10.525c0,2.374,1.736,3.934,4.325,3.934s4.323-1.559,4.323-3.934V478.158h4.252Z"
                        transform="translate(-595.739 -471.568)"
                        fill={svgFill2}
                      />
                      <path
                        id="Path_1905"
                        data-name="Path 1905"
                        d="M725.693,477.817h4.252v2.092a5.336,5.336,0,0,1,4.288-2.446,5.212,5.212,0,0,1,1.878.354v3.26h-1.453c-2.834,0-4.713,1.595-4.713,3.969v10.489h-4.252Z"
                        transform="translate(-615.413 -471.227)"
                        fill={svgFill2}
                      />
                      <path
                        id="Path_1906"
                        data-name="Path 1906"
                        d="M746.435,486.54c0-5.6,3.828-9.355,9.6-9.355s9.6,3.756,9.6,9.355v.815l-.355.355h-14.53a5.178,5.178,0,0,0,5.281,4.642,5.369,5.369,0,0,0,4.854-2.976h4.325a9.38,9.38,0,0,1-9.179,6.52C750.263,495.9,746.435,492.139,746.435,486.54Zm14.6-2.374a5.35,5.35,0,0,0-9.993,0Z"
                        transform="translate(-625.593 -471.09)"
                        fill={svgFill2}
                      />
                    </g>
                    <g
                      id="Group_1559"
                      data-name="Group 1559"
                      transform="translate(9.698 28.458)"
                    >
                      <path
                        id="Path_1907"
                        data-name="Path 1907"
                        d="M528.165,524.427a2.89,2.89,0,0,1,2.969-2.936,2.954,2.954,0,0,1,2.475,1.275l-.65.4a2.212,2.212,0,1,0,0,2.516l.65.4a2.955,2.955,0,0,1-2.475,1.274A2.89,2.89,0,0,1,528.165,524.427Z"
                        transform="translate(-528.165 -521.294)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1908"
                        data-name="Path 1908"
                        d="M544.1,524.592l-2.261,5.082a1.184,1.184,0,0,1-1.077.773,1.445,1.445,0,0,1-.962-.4l.3-.543a.768.768,0,0,0,.559.263.577.577,0,0,0,.534-.378l.3-.625-1.826-4.169h.814l1.415,3.347,1.415-3.347Z"
                        transform="translate(-533.809 -522.816)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1909"
                        data-name="Path 1909"
                        d="M548.773,526.595a2.249,2.249,0,0,1,4.153-1.143l-.617.37a1.513,1.513,0,1,0,0,1.546l.617.37a2.249,2.249,0,0,1-4.153-1.143Z"
                        transform="translate(-538.279 -522.721)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1910"
                        data-name="Path 1910"
                        d="M558.608,521.2h.707v5.921h-.707Z"
                        transform="translate(-543.106 -521.152)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1911"
                        data-name="Path 1911"
                        d="M566.181,526.907h-3.61a1.508,1.508,0,0,0,1.555,1.233,1.736,1.736,0,0,0,1.414-.683l.486.42a2.365,2.365,0,0,1-1.924.913,2.2,2.2,0,0,1-2.294-2.213,2.2,2.2,0,0,1,4.391.017C566.2,526.694,566.189,526.808,566.181,526.907Zm-3.618-.642h2.887a1.464,1.464,0,0,0-2.887,0Z"
                        transform="translate(-544.676 -522.721)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1912"
                        data-name="Path 1912"
                        d="M575.952,521.573a.473.473,0,1,1,.477.469A.465.465,0,0,1,575.952,521.573Zm.123,1.307h.707v4.194h-.707Z"
                        transform="translate(-551.619 -521.104)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1913"
                        data-name="Path 1913"
                        d="M583.848,526.1v2.59h-.707v-2.368a1.157,1.157,0,0,0-1.225-1.242,1.2,1.2,0,0,0-1.283,1.258v2.352h-.707V524.5h.707v.642a1.757,1.757,0,0,1,1.513-.74A1.606,1.606,0,0,1,583.848,526.1Z"
                        transform="translate(-553.568 -522.721)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1914"
                        data-name="Path 1914"
                        d="M589.211,528.133l.4-.51a1.774,1.774,0,0,0,1.3.526c.551,0,.971-.214.971-.592,0-.4-.468-.526-1.02-.658-.69-.173-1.505-.386-1.505-1.266,0-.814.74-1.233,1.6-1.233a2.255,2.255,0,0,1,1.538.575l-.395.518a1.619,1.619,0,0,0-1.135-.452c-.485,0-.888.189-.888.551,0,.411.477.526,1.036.657.69.165,1.5.37,1.5,1.242,0,.831-.748,1.3-1.694,1.3A2.423,2.423,0,0,1,589.211,528.133Z"
                        transform="translate(-558.126 -522.721)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1915"
                        data-name="Path 1915"
                        d="M597.495,527.125v-2.533h.708v2.435a1.192,1.192,0,0,0,2.385,0v-2.435h.707v2.533a1.905,1.905,0,0,1-3.8,0Z"
                        transform="translate(-562.192 -522.816)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1916"
                        data-name="Path 1916"
                        d="M609.463,524.463v.732h-.14a1.33,1.33,0,0,0-1.431,1.431v2.1h-.707v-4.194h.707v.724a1.619,1.619,0,0,1,1.431-.79Z"
                        transform="translate(-566.948 -522.753)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1917"
                        data-name="Path 1917"
                        d="M616.722,524.5v4.194h-.707v-.757a1.915,1.915,0,0,1-1.628.855,2.2,2.2,0,0,1,0-4.391,1.916,1.916,0,0,1,1.628.855V524.5Zm-.707,2.1a1.5,1.5,0,1,0-1.5,1.513A1.47,1.47,0,0,0,616.014,526.595Z"
                        transform="translate(-569.453 -522.721)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1918"
                        data-name="Path 1918"
                        d="M627.274,526.1v2.59h-.707v-2.368a1.157,1.157,0,0,0-1.225-1.242,1.2,1.2,0,0,0-1.283,1.258v2.352h-.707V524.5h.707v.642a1.758,1.758,0,0,1,1.513-.74A1.606,1.606,0,0,1,627.274,526.1Z"
                        transform="translate(-574.882 -522.721)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1919"
                        data-name="Path 1919"
                        d="M632.767,526.595a2.249,2.249,0,0,1,4.153-1.143l-.617.37a1.513,1.513,0,1,0,0,1.546l.617.37a2.249,2.249,0,0,1-4.153-1.143Z"
                        transform="translate(-579.503 -522.721)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1920"
                        data-name="Path 1920"
                        d="M646.364,526.907h-3.61a1.508,1.508,0,0,0,1.555,1.233,1.737,1.737,0,0,0,1.414-.683l.485.42a2.364,2.364,0,0,1-1.924.913,2.2,2.2,0,0,1-2.295-2.213,2.2,2.2,0,0,1,4.391.017C646.38,526.694,646.372,526.808,646.364,526.907Zm-3.618-.642h2.886a1.464,1.464,0,0,0-2.886,0Z"
                        transform="translate(-584.029 -522.721)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1921"
                        data-name="Path 1921"
                        d="M660.31,524.5v4.194H659.6v-.757a1.915,1.915,0,0,1-1.628.855,2.2,2.2,0,0,1,0-4.391,1.916,1.916,0,0,1,1.628.855V524.5Zm-.707,2.1a1.5,1.5,0,1,0-1.5,1.513A1.47,1.47,0,0,0,659.6,526.595Z"
                        transform="translate(-590.845 -522.721)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1922"
                        data-name="Path 1922"
                        d="M667.807,524.148v2.319c0,.453.247.65.675.65a1.2,1.2,0,0,0,.583-.156v.667a1.46,1.46,0,0,1-.732.172,1.1,1.1,0,0,1-1.234-1.217v-2.435h-.756v-.642h.756V522.38h.707v1.126h1.258v.642Z"
                        transform="translate(-595.982 -521.73)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1923"
                        data-name="Path 1923"
                        d="M678.319,524.148v2.319c0,.453.247.65.675.65a1.2,1.2,0,0,0,.583-.156v.667a1.459,1.459,0,0,1-.732.172,1.1,1.1,0,0,1-1.234-1.217v-2.435h-.756v-.642h.756V522.38h.707v1.126h1.258v.642Z"
                        transform="translate(-601.142 -521.73)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1924"
                        data-name="Path 1924"
                        d="M687.9,524.532v2.59h-.707v-2.368a1.157,1.157,0,0,0-1.225-1.242,1.2,1.2,0,0,0-1.283,1.258v2.352h-.707V521.2h.707v2.393a1.736,1.736,0,0,1,1.513-.765A1.606,1.606,0,0,1,687.9,524.532Z"
                        transform="translate(-604.637 -521.152)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1925"
                        data-name="Path 1925"
                        d="M697.768,526.907h-3.611a1.508,1.508,0,0,0,1.555,1.233,1.738,1.738,0,0,0,1.415-.683l.485.42a2.365,2.365,0,0,1-1.924.913,2.2,2.2,0,0,1-2.295-2.213,2.2,2.2,0,0,1,4.391.017C697.784,526.694,697.776,526.808,697.768,526.907Zm-3.619-.642h2.887a1.464,1.464,0,0,0-2.887,0Z"
                        transform="translate(-609.258 -522.721)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1926"
                        data-name="Path 1926"
                        d="M710.06,524.463v.732h-.14a1.33,1.33,0,0,0-1.431,1.431v2.1h-.708v-4.194h.708v.724a1.618,1.618,0,0,1,1.431-.79Z"
                        transform="translate(-616.319 -522.753)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1927"
                        data-name="Path 1927"
                        d="M713.515,521.573a.473.473,0,1,1,.477.469A.465.465,0,0,1,713.515,521.573Zm.123,1.307h.707v4.194h-.707Z"
                        transform="translate(-619.134 -521.104)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1928"
                        data-name="Path 1928"
                        d="M721.313,529.489l-.732.189c-.016-.378-.346-.625-.822-.625h-1.546a1.034,1.034,0,0,1-1.168-1,1.08,1.08,0,0,1,.518-.946,1.8,1.8,0,0,1-.576-1.332,1.827,1.827,0,0,1,1.916-1.817,2.015,2.015,0,0,1,1.028.271.894.894,0,0,1,.954-.724h.321v.658h-.279a.471.471,0,0,0-.518.461,1.762,1.762,0,0,1,.411,1.151,1.838,1.838,0,0,1-1.916,1.826,1.958,1.958,0,0,1-.889-.2.571.571,0,0,0-.263.469c0,.3.239.485.592.485h1.538A1.3,1.3,0,0,1,721.313,529.489Zm-3.593-3.709a1.185,1.185,0,1,0,1.184-1.143A1.142,1.142,0,0,0,717.719,525.78Z"
                        transform="translate(-620.838 -522.285)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1929"
                        data-name="Path 1929"
                        d="M730.487,524.532v2.59h-.707v-2.368a1.157,1.157,0,0,0-1.225-1.242,1.2,1.2,0,0,0-1.283,1.258v2.352h-.707V521.2h.707v2.393a1.735,1.735,0,0,1,1.513-.765A1.606,1.606,0,0,1,730.487,524.532Z"
                        transform="translate(-625.538 -521.152)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1930"
                        data-name="Path 1930"
                        d="M736.927,524.148v2.319c0,.453.247.65.674.65a1.2,1.2,0,0,0,.583-.156v.667a1.46,1.46,0,0,1-.732.172,1.1,1.1,0,0,1-1.233-1.217v-2.435h-.757v-.642h.757V522.38h.707v1.126h1.258v.642Z"
                        transform="translate(-629.906 -521.73)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1931"
                        data-name="Path 1931"
                        d="M751.014,526.595a2.106,2.106,0,0,1-2.106,2.2,1.916,1.916,0,0,1-1.628-.855v2.319h-.707V524.5h.707v.757a1.917,1.917,0,0,1,1.628-.855A2.106,2.106,0,0,1,751.014,526.595Zm-.732,0a1.5,1.5,0,1,0-1.5,1.513A1.472,1.472,0,0,0,750.282,526.595Z"
                        transform="translate(-635.358 -522.721)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1932"
                        data-name="Path 1932"
                        d="M759.413,524.463v.732h-.14a1.33,1.33,0,0,0-1.431,1.431v2.1h-.707v-4.194h.707v.724a1.618,1.618,0,0,1,1.431-.79Z"
                        transform="translate(-640.542 -522.753)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1933"
                        data-name="Path 1933"
                        d="M762.868,521.573a.473.473,0,1,1,.477.469A.465.465,0,0,1,762.868,521.573Zm.123,1.307h.707v4.194h-.707Z"
                        transform="translate(-643.356 -521.104)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1934"
                        data-name="Path 1934"
                        d="M766.308,526.595a2.249,2.249,0,0,1,4.153-1.143l-.617.37a1.513,1.513,0,1,0,0,1.546l.617.37a2.249,2.249,0,0,1-4.153-1.143Z"
                        transform="translate(-645.044 -522.721)"
                        fill={svgFill}
                      />
                      <path
                        id="Path_1935"
                        data-name="Path 1935"
                        d="M779.906,526.907H776.3a1.508,1.508,0,0,0,1.555,1.233,1.737,1.737,0,0,0,1.414-.683l.485.42a2.364,2.364,0,0,1-1.924.913,2.2,2.2,0,0,1-2.294-2.213,2.2,2.2,0,0,1,4.391.017C779.922,526.694,779.914,526.808,779.906,526.907Zm-3.618-.642h2.887a1.464,1.464,0,0,0-2.887,0Z"
                        transform="translate(-649.571 -522.721)"
                        fill={svgFill}
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
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
                    { <li>
                      <Link
                        className="dropdown-item"
                        to="/bike-insurance-comparison-chart"
                      >
                        <div className="menuItem">
                          <h6>Compare our cover</h6>
                          <p>See how we compare to our competitors.</p>
                        </div>
                      </Link>
                    </li> }
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
                    href="#"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23.662"
                height="23.788"
                viewBox="0 0 23.662 23.788"
                style={{ marginTop: "3px" }}
              >
                <g
                  id="Group_1588"
                  data-name="Group 1588"
                  transform="translate(-1753.881 -1310.313)"
                >
                  <g id="Group_1584" data-name="Group 1584">
                    <path
                      id="Path_1977"
                      data-name="Path 1977"
                      d="M1772.207,1334.1a18.251,18.251,0,0,1-12.631-5.625l-.072-.077a18.069,18.069,0,0,1-5.619-12.96l.008-.335.207-.261a12.056,12.056,0,0,1,5.207-3.859,1.8,1.8,0,0,1,.652-.114c.539,0,1.754.276,2.061,1.126.545,1.51,1.234,3.486,1.736,5.383a2.419,2.419,0,0,1-.74,2.282l-1.768,1.122a1.367,1.367,0,0,0,.24.6,25,25,0,0,0,2.36,2.765,24.215,24.215,0,0,0,2.746,2.339.994.994,0,0,0,.553.21.314.314,0,0,0,.1-.013l1.076-1.728a2.378,2.378,0,0,1,1.854-.781,1.732,1.732,0,0,1,.389.039,25.177,25.177,0,0,1,5.494,1.772,2.387,2.387,0,0,1,.935,2.688,12.17,12.17,0,0,1-2.756,4.234,12.408,12.408,0,0,1-1.1.972l-.26.2-.668.012Zm-16.326-18.281a16.447,16.447,0,0,0,5.039,11.171l.1.1a16.243,16.243,0,0,0,11.144,5.01c.235-.2.457-.4.664-.6a10.214,10.214,0,0,0,2.3-3.544c-.012-.007-.051-.13-.094-.228a23.468,23.468,0,0,0-4.91-1.556,2.265,2.265,0,0,0-.234.049l-1,1.585a2.456,2.456,0,0,1-3.475.3,26.221,26.221,0,0,1-2.98-2.54,26.769,26.769,0,0,1-2.561-3,2.833,2.833,0,0,1-.551-2.186,1.93,1.93,0,0,1,.863-1.292l1.583-1a1.2,1.2,0,0,0,.039-.275c-.44-1.644-1.063-3.449-1.577-4.882a.9.9,0,0,0-.271-.058,10.259,10.259,0,0,0-3.479,2.289c-.2.2-.4.421-.6.661Z"
                      fill="#fff"
                    />
                  </g>
                  <g id="Group_1585" data-name="Group 1585">
                    <path
                      id="Path_1978"
                      data-name="Path 1978"
                      d="M1776.543,1322.978a1,1,0,0,1-1-1,9.676,9.676,0,0,0-9.666-9.665,1,1,0,0,1,0-2,11.679,11.679,0,0,1,11.666,11.665,1,1,0,0,1-1,1Z"
                      fill="#fff"
                    />
                  </g>
                  <g id="Group_1586" data-name="Group 1586">
                    <path
                      id="Path_1979"
                      data-name="Path 1979"
                      d="M1773.41,1322.978a1,1,0,0,1-1-1,6.541,6.541,0,0,0-6.535-6.533,1,1,0,0,1,0-2,8.545,8.545,0,0,1,8.535,8.533,1,1,0,0,1-1,1Z"
                      fill="#fff"
                    />
                  </g>
                  <g id="Group_1587" data-name="Group 1587">
                    <path
                      id="Path_1980"
                      data-name="Path 1980"
                      d="M1770.109,1322.978a1,1,0,0,1-1-1,3.237,3.237,0,0,0-3.234-3.232,1,1,0,0,1,0-2,5.239,5.239,0,0,1,5.234,5.232,1,1,0,0,1-1,1Z"
                      fill="#fff"
                    />
                  </g>
                </g>
              </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="187.204"
                  height="44"
                  viewBox="0 0 187.204 44"
                >
                  <g
                    id="Group_1580"
                    data-name="Group 1580"
                    transform="translate(-687.36 -80.891)"
                  >
                    <g
                      id="Group_1563"
                      data-name="Group 1563"
                      transform="translate(687.36 80.891)"
                    >
                      <path
                        id="Path_1898"
                        data-name="Path 1898"
                        d="M459.934,482.308a3.517,3.517,0,0,1,0-6.815.647.647,0,0,0,.5-.7.614.614,0,0,0-.015-.15,26.762,26.762,0,0,0-.8-3.088.733.733,0,0,0-.843-.442,3.482,3.482,0,0,1-4.011-1.645,3.447,3.447,0,0,1,.562-4.247.632.632,0,0,0,.214-.514.7.7,0,0,0-.174-.493,23.734,23.734,0,0,0-2.247-2.247.679.679,0,0,0-.923.04,3.544,3.544,0,0,1-6.094-2.528,3.439,3.439,0,0,1,.117-.838.644.644,0,0,0,0-.431.661.661,0,0,0-.436-.455,21.508,21.508,0,0,0-3.049-.843.688.688,0,0,0-.8.481,3.565,3.565,0,0,1-6.9.04.682.682,0,0,0-.8-.521,20.158,20.158,0,0,0-3.049.843.645.645,0,0,0-.46.74.906.906,0,0,0,.019.146,3.6,3.6,0,0,1,.117.85,3.545,3.545,0,0,1-6.094,2.516.678.678,0,0,0-.922-.04,19.75,19.75,0,0,0-2.247,2.247.705.705,0,0,0-.175.493.633.633,0,0,0,.214.514,3.445,3.445,0,0,1,.562,4.247,3.5,3.5,0,0,1-4.011,1.645.732.732,0,0,0-.842.442,20.549,20.549,0,0,0-.8,3.088.727.727,0,0,0-.017.173.646.646,0,0,0,.5.674,3.517,3.517,0,0,1,0,6.815.647.647,0,0,0-.5.7.67.67,0,0,0,.015.15,26.787,26.787,0,0,0,.8,3.089.732.732,0,0,0,.842.441,3.482,3.482,0,0,1,4.011,1.645,3.446,3.446,0,0,1-.562,4.248.632.632,0,0,0-.214.513.707.707,0,0,0,.175.494,23.744,23.744,0,0,0,2.247,2.246.678.678,0,0,0,.922-.04,3.545,3.545,0,0,1,6.094,2.528,3.416,3.416,0,0,1-.117.838.648.648,0,0,0,0,.431.663.663,0,0,0,.436.456,21.605,21.605,0,0,0,3.049.842.689.689,0,0,0,.8-.481,3.565,3.565,0,0,1,6.9-.04.681.681,0,0,0,.8.521,20.2,20.2,0,0,0,3.049-.842.645.645,0,0,0,.46-.74.8.8,0,0,0-.019-.147,3.569,3.569,0,0,1-.117-.85,3.545,3.545,0,0,1,6.094-2.516.679.679,0,0,0,.923.04,19.825,19.825,0,0,0,2.247-2.246.707.707,0,0,0,.174-.494.63.63,0,0,0-.214-.513,3.448,3.448,0,0,1-.562-4.248,3.5,3.5,0,0,1,4.011-1.645.733.733,0,0,0,.843-.441,20.512,20.512,0,0,0,.8-3.089.7.7,0,0,0,.017-.173A.646.646,0,0,0,459.934,482.308Zm-9.126-12.654q.25.332.484.678a.455.455,0,0,1-.271.7l-11.691,2.815a2.609,2.609,0,0,0-1.819,1.587l-1.238,3.169a.227.227,0,0,1-.423,0l-.439-1.128a1.134,1.134,0,0,1,.007-.841l1.06-2.586a2.608,2.608,0,0,1,1.783-1.543l12.076-3.011A.454.454,0,0,1,450.807,469.654Zm-13.082,12.9,2.2-5.368a2.608,2.608,0,0,1,1.756-1.536l10.569-2.755a.452.452,0,0,1,.534.265q.18.448.332.909a.449.449,0,0,1-.321.588l-9.947,2.448a2.61,2.61,0,0,0-1.806,1.583l-2.369,6.061a.227.227,0,0,1-.423,0l-.529-1.355A1.133,1.133,0,0,1,437.726,482.549Zm.748-19.067a15.346,15.346,0,0,1,10,3.686.454.454,0,0,1-.194.784l-12.186,2.886a2.609,2.609,0,0,0-1.829,1.589l-.2.5a.227.227,0,0,1-.423,0l-2.614-6.716a.812.812,0,0,1,.382-1.015A15.337,15.337,0,0,1,438.473,463.482Zm-.237,30.835a15.415,15.415,0,0,1-12.219-24.5.8.8,0,0,1,1.38.161l8.2,19.884a1.589,1.589,0,0,0,1.468.982h2.845a1.588,1.588,0,0,0,1.47-.986l3.432-8.38a2.608,2.608,0,0,1,1.769-1.539l6.738-1.719a.455.455,0,0,1,.567.433c0,.082,0,.163,0,.245A15.419,15.419,0,0,1,438.236,494.317Z"
                        transform="translate(-416.514 -456.901)"
                        fill="#00a8ff"
                      />
                      <g
                        id="Group_1560"
                        data-name="Group 1560"
                        transform="translate(47.156 4.234)"
                      >
                        <g
                          id="Group_1558"
                          data-name="Group 1558"
                          transform="translate(0 0)"
                        >
                          <path
                            id="Path_1899"
                            data-name="Path 1899"
                            d="M509.12,465.216h5.1l7.336,18.852,7.37-18.852H534l-9.956,24.309h-4.891Z"
                            transform="translate(-509.12 -465.216)"
                            fill="#171715"
                          />
                          <path
                            id="Path_1900"
                            data-name="Path 1900"
                            d="M552.961,486.54c0-5.6,3.828-9.355,9.6-9.355s9.6,3.756,9.6,9.355v.815l-.355.355H557.284a5.178,5.178,0,0,0,5.281,4.642,5.37,5.37,0,0,0,4.854-2.976h4.324a9.379,9.379,0,0,1-9.178,6.52C556.789,495.9,552.961,492.139,552.961,486.54Zm14.6-2.374a5.35,5.35,0,0,0-9.994,0Z"
                            transform="translate(-530.637 -471.09)"
                            fill="#171715"
                          />
                          <path
                            id="Path_1901"
                            data-name="Path 1901"
                            d="M595.691,465.216h4.252v24.309h-4.252Z"
                            transform="translate(-551.609 -465.216)"
                            fill="#171715"
                          />
                          <path
                            id="Path_1902"
                            data-name="Path 1902"
                            d="M609.053,486.54c0-5.6,3.828-9.355,9.6-9.355s9.6,3.756,9.6,9.355-3.828,9.355-9.6,9.355S609.053,492.139,609.053,486.54Zm14.954,0c0-3.366-2.126-5.6-5.351-5.6s-5.351,2.233-5.351,5.6,2.126,5.6,5.351,5.6S624.007,489.907,624.007,486.54Z"
                            transform="translate(-558.167 -471.09)"
                            fill="#171715"
                          />
                          <path
                            id="Path_1903"
                            data-name="Path 1903"
                            d="M649,489.375h4c.142,1.771,1.843,2.976,4.218,2.976s3.967-.922,3.967-2.3c0-.85-1.063-1.453-4.357-2.091-5.139-1.169-6.769-2.339-6.769-5.28,0-3.3,2.87-5.492,7.159-5.492a7.7,7.7,0,0,1,7.405,4.607l-3.9.956a3.792,3.792,0,0,0-3.507-2.019c-1.736,0-2.906.709-2.906,1.736,0,.744.815,1.2,3.331,1.772,5.917,1.24,7.8,2.586,7.8,5.812,0,3.508-3.3,5.847-8.22,5.847C652.439,495.9,649.143,493.273,649,489.375Z"
                            transform="translate(-577.773 -471.09)"
                            fill="#171715"
                          />
                          <path
                            id="Path_1904"
                            data-name="Path 1904"
                            d="M702.76,495.877h-4.252v-1.311a7.421,7.421,0,0,1-4.82,1.807c-4.856,0-8.08-2.87-8.08-7.193V478.158h4.252v10.525c0,2.374,1.736,3.934,4.325,3.934s4.323-1.559,4.323-3.934V478.158h4.252Z"
                            transform="translate(-595.739 -471.568)"
                            fill="#171715"
                          />
                          <path
                            id="Path_1905"
                            data-name="Path 1905"
                            d="M725.693,477.817h4.252v2.092a5.336,5.336,0,0,1,4.288-2.446,5.212,5.212,0,0,1,1.878.354v3.26h-1.453c-2.834,0-4.713,1.595-4.713,3.969v10.489h-4.252Z"
                            transform="translate(-615.413 -471.227)"
                            fill="#171715"
                          />
                          <path
                            id="Path_1906"
                            data-name="Path 1906"
                            d="M746.435,486.54c0-5.6,3.828-9.355,9.6-9.355s9.6,3.756,9.6,9.355v.815l-.355.355h-14.53a5.178,5.178,0,0,0,5.281,4.642,5.369,5.369,0,0,0,4.854-2.976h4.325a9.38,9.38,0,0,1-9.179,6.52C750.263,495.9,746.435,492.139,746.435,486.54Zm14.6-2.374a5.35,5.35,0,0,0-9.993,0Z"
                            transform="translate(-625.593 -471.09)"
                            fill="#171715"
                          />
                        </g>
                        <g
                          id="Group_1559"
                          data-name="Group 1559"
                          transform="translate(9.698 28.458)"
                        >
                          <path
                            id="Path_1907"
                            data-name="Path 1907"
                            d="M528.165,524.427a2.89,2.89,0,0,1,2.969-2.936,2.954,2.954,0,0,1,2.475,1.275l-.65.4a2.212,2.212,0,1,0,0,2.516l.65.4a2.955,2.955,0,0,1-2.475,1.274A2.89,2.89,0,0,1,528.165,524.427Z"
                            transform="translate(-528.165 -521.294)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1908"
                            data-name="Path 1908"
                            d="M544.1,524.592l-2.261,5.082a1.184,1.184,0,0,1-1.077.773,1.445,1.445,0,0,1-.962-.4l.3-.543a.768.768,0,0,0,.559.263.577.577,0,0,0,.534-.378l.3-.625-1.826-4.169h.814l1.415,3.347,1.415-3.347Z"
                            transform="translate(-533.809 -522.816)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1909"
                            data-name="Path 1909"
                            d="M548.773,526.595a2.249,2.249,0,0,1,4.153-1.143l-.617.37a1.513,1.513,0,1,0,0,1.546l.617.37a2.249,2.249,0,0,1-4.153-1.143Z"
                            transform="translate(-538.279 -522.721)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1910"
                            data-name="Path 1910"
                            d="M558.608,521.2h.707v5.921h-.707Z"
                            transform="translate(-543.106 -521.152)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1911"
                            data-name="Path 1911"
                            d="M566.181,526.907h-3.61a1.508,1.508,0,0,0,1.555,1.233,1.736,1.736,0,0,0,1.414-.683l.486.42a2.365,2.365,0,0,1-1.924.913,2.2,2.2,0,0,1-2.294-2.213,2.2,2.2,0,0,1,4.391.017C566.2,526.694,566.189,526.808,566.181,526.907Zm-3.618-.642h2.887a1.464,1.464,0,0,0-2.887,0Z"
                            transform="translate(-544.676 -522.721)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1912"
                            data-name="Path 1912"
                            d="M575.952,521.573a.473.473,0,1,1,.477.469A.465.465,0,0,1,575.952,521.573Zm.123,1.307h.707v4.194h-.707Z"
                            transform="translate(-551.619 -521.104)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1913"
                            data-name="Path 1913"
                            d="M583.848,526.1v2.59h-.707v-2.368a1.157,1.157,0,0,0-1.225-1.242,1.2,1.2,0,0,0-1.283,1.258v2.352h-.707V524.5h.707v.642a1.757,1.757,0,0,1,1.513-.74A1.606,1.606,0,0,1,583.848,526.1Z"
                            transform="translate(-553.568 -522.721)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1914"
                            data-name="Path 1914"
                            d="M589.211,528.133l.4-.51a1.774,1.774,0,0,0,1.3.526c.551,0,.971-.214.971-.592,0-.4-.468-.526-1.02-.658-.69-.173-1.505-.386-1.505-1.266,0-.814.74-1.233,1.6-1.233a2.255,2.255,0,0,1,1.538.575l-.395.518a1.619,1.619,0,0,0-1.135-.452c-.485,0-.888.189-.888.551,0,.411.477.526,1.036.657.69.165,1.5.37,1.5,1.242,0,.831-.748,1.3-1.694,1.3A2.423,2.423,0,0,1,589.211,528.133Z"
                            transform="translate(-558.126 -522.721)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1915"
                            data-name="Path 1915"
                            d="M597.495,527.125v-2.533h.708v2.435a1.192,1.192,0,0,0,2.385,0v-2.435h.707v2.533a1.905,1.905,0,0,1-3.8,0Z"
                            transform="translate(-562.192 -522.816)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1916"
                            data-name="Path 1916"
                            d="M609.463,524.463v.732h-.14a1.33,1.33,0,0,0-1.431,1.431v2.1h-.707v-4.194h.707v.724a1.619,1.619,0,0,1,1.431-.79Z"
                            transform="translate(-566.948 -522.753)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1917"
                            data-name="Path 1917"
                            d="M616.722,524.5v4.194h-.707v-.757a1.915,1.915,0,0,1-1.628.855,2.2,2.2,0,0,1,0-4.391,1.916,1.916,0,0,1,1.628.855V524.5Zm-.707,2.1a1.5,1.5,0,1,0-1.5,1.513A1.47,1.47,0,0,0,616.014,526.595Z"
                            transform="translate(-569.453 -522.721)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1918"
                            data-name="Path 1918"
                            d="M627.274,526.1v2.59h-.707v-2.368a1.157,1.157,0,0,0-1.225-1.242,1.2,1.2,0,0,0-1.283,1.258v2.352h-.707V524.5h.707v.642a1.758,1.758,0,0,1,1.513-.74A1.606,1.606,0,0,1,627.274,526.1Z"
                            transform="translate(-574.882 -522.721)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1919"
                            data-name="Path 1919"
                            d="M632.767,526.595a2.249,2.249,0,0,1,4.153-1.143l-.617.37a1.513,1.513,0,1,0,0,1.546l.617.37a2.249,2.249,0,0,1-4.153-1.143Z"
                            transform="translate(-579.503 -522.721)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1920"
                            data-name="Path 1920"
                            d="M646.364,526.907h-3.61a1.508,1.508,0,0,0,1.555,1.233,1.737,1.737,0,0,0,1.414-.683l.485.42a2.364,2.364,0,0,1-1.924.913,2.2,2.2,0,0,1-2.295-2.213,2.2,2.2,0,0,1,4.391.017C646.38,526.694,646.372,526.808,646.364,526.907Zm-3.618-.642h2.886a1.464,1.464,0,0,0-2.886,0Z"
                            transform="translate(-584.029 -522.721)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1921"
                            data-name="Path 1921"
                            d="M660.31,524.5v4.194H659.6v-.757a1.915,1.915,0,0,1-1.628.855,2.2,2.2,0,0,1,0-4.391,1.916,1.916,0,0,1,1.628.855V524.5Zm-.707,2.1a1.5,1.5,0,1,0-1.5,1.513A1.47,1.47,0,0,0,659.6,526.595Z"
                            transform="translate(-590.845 -522.721)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1922"
                            data-name="Path 1922"
                            d="M667.807,524.148v2.319c0,.453.247.65.675.65a1.2,1.2,0,0,0,.583-.156v.667a1.46,1.46,0,0,1-.732.172,1.1,1.1,0,0,1-1.234-1.217v-2.435h-.756v-.642h.756V522.38h.707v1.126h1.258v.642Z"
                            transform="translate(-595.982 -521.73)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1923"
                            data-name="Path 1923"
                            d="M678.319,524.148v2.319c0,.453.247.65.675.65a1.2,1.2,0,0,0,.583-.156v.667a1.459,1.459,0,0,1-.732.172,1.1,1.1,0,0,1-1.234-1.217v-2.435h-.756v-.642h.756V522.38h.707v1.126h1.258v.642Z"
                            transform="translate(-601.142 -521.73)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1924"
                            data-name="Path 1924"
                            d="M687.9,524.532v2.59h-.707v-2.368a1.157,1.157,0,0,0-1.225-1.242,1.2,1.2,0,0,0-1.283,1.258v2.352h-.707V521.2h.707v2.393a1.736,1.736,0,0,1,1.513-.765A1.606,1.606,0,0,1,687.9,524.532Z"
                            transform="translate(-604.637 -521.152)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1925"
                            data-name="Path 1925"
                            d="M697.768,526.907h-3.611a1.508,1.508,0,0,0,1.555,1.233,1.738,1.738,0,0,0,1.415-.683l.485.42a2.365,2.365,0,0,1-1.924.913,2.2,2.2,0,0,1-2.295-2.213,2.2,2.2,0,0,1,4.391.017C697.784,526.694,697.776,526.808,697.768,526.907Zm-3.619-.642h2.887a1.464,1.464,0,0,0-2.887,0Z"
                            transform="translate(-609.258 -522.721)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1926"
                            data-name="Path 1926"
                            d="M710.06,524.463v.732h-.14a1.33,1.33,0,0,0-1.431,1.431v2.1h-.708v-4.194h.708v.724a1.618,1.618,0,0,1,1.431-.79Z"
                            transform="translate(-616.319 -522.753)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1927"
                            data-name="Path 1927"
                            d="M713.515,521.573a.473.473,0,1,1,.477.469A.465.465,0,0,1,713.515,521.573Zm.123,1.307h.707v4.194h-.707Z"
                            transform="translate(-619.134 -521.104)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1928"
                            data-name="Path 1928"
                            d="M721.313,529.489l-.732.189c-.016-.378-.346-.625-.822-.625h-1.546a1.034,1.034,0,0,1-1.168-1,1.08,1.08,0,0,1,.518-.946,1.8,1.8,0,0,1-.576-1.332,1.827,1.827,0,0,1,1.916-1.817,2.015,2.015,0,0,1,1.028.271.894.894,0,0,1,.954-.724h.321v.658h-.279a.471.471,0,0,0-.518.461,1.762,1.762,0,0,1,.411,1.151,1.838,1.838,0,0,1-1.916,1.826,1.958,1.958,0,0,1-.889-.2.571.571,0,0,0-.263.469c0,.3.239.485.592.485h1.538A1.3,1.3,0,0,1,721.313,529.489Zm-3.593-3.709a1.185,1.185,0,1,0,1.184-1.143A1.142,1.142,0,0,0,717.719,525.78Z"
                            transform="translate(-620.838 -522.285)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1929"
                            data-name="Path 1929"
                            d="M730.487,524.532v2.59h-.707v-2.368a1.157,1.157,0,0,0-1.225-1.242,1.2,1.2,0,0,0-1.283,1.258v2.352h-.707V521.2h.707v2.393a1.735,1.735,0,0,1,1.513-.765A1.606,1.606,0,0,1,730.487,524.532Z"
                            transform="translate(-625.538 -521.152)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1930"
                            data-name="Path 1930"
                            d="M736.927,524.148v2.319c0,.453.247.65.674.65a1.2,1.2,0,0,0,.583-.156v.667a1.46,1.46,0,0,1-.732.172,1.1,1.1,0,0,1-1.233-1.217v-2.435h-.757v-.642h.757V522.38h.707v1.126h1.258v.642Z"
                            transform="translate(-629.906 -521.73)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1931"
                            data-name="Path 1931"
                            d="M751.014,526.595a2.106,2.106,0,0,1-2.106,2.2,1.916,1.916,0,0,1-1.628-.855v2.319h-.707V524.5h.707v.757a1.917,1.917,0,0,1,1.628-.855A2.106,2.106,0,0,1,751.014,526.595Zm-.732,0a1.5,1.5,0,1,0-1.5,1.513A1.472,1.472,0,0,0,750.282,526.595Z"
                            transform="translate(-635.358 -522.721)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1932"
                            data-name="Path 1932"
                            d="M759.413,524.463v.732h-.14a1.33,1.33,0,0,0-1.431,1.431v2.1h-.707v-4.194h.707v.724a1.618,1.618,0,0,1,1.431-.79Z"
                            transform="translate(-640.542 -522.753)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1933"
                            data-name="Path 1933"
                            d="M762.868,521.573a.473.473,0,1,1,.477.469A.465.465,0,0,1,762.868,521.573Zm.123,1.307h.707v4.194h-.707Z"
                            transform="translate(-643.356 -521.104)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1934"
                            data-name="Path 1934"
                            d="M766.308,526.595a2.249,2.249,0,0,1,4.153-1.143l-.617.37a1.513,1.513,0,1,0,0,1.546l.617.37a2.249,2.249,0,0,1-4.153-1.143Z"
                            transform="translate(-645.044 -522.721)"
                            fill="#00a8ff"
                          />
                          <path
                            id="Path_1935"
                            data-name="Path 1935"
                            d="M779.906,526.907H776.3a1.508,1.508,0,0,0,1.555,1.233,1.737,1.737,0,0,0,1.414-.683l.485.42a2.364,2.364,0,0,1-1.924.913,2.2,2.2,0,0,1-2.294-2.213,2.2,2.2,0,0,1,4.391.017C779.922,526.694,779.914,526.808,779.906,526.907Zm-3.618-.642h2.887a1.464,1.464,0,0,0-2.887,0Z"
                            transform="translate(-649.571 -522.721)"
                            fill="#00a8ff"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
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
                    <Link to="/OurCoverLevels">
                    Our cover levels
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/bike-insurance-comparison-chart">
                      Compare our cover
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/bicycle-travel-insurance">Additional travel cover</Link>
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
