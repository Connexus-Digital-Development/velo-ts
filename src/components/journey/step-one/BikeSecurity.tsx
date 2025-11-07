import { useState, useEffect, useContext } from "react";
import { JourneyContext } from "@/context/journeyStore";
import { type BikeSecurityProps } from "@/models/JourneyComponentTypes";

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
  const [state, setState] = useContext(JourneyContext);
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

  const handleHover = (hoverState: boolean, hoverAction: React.Dispatch<React.SetStateAction<boolean>>, helpText: string) => {
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
    <section className="container container_narrow mt-3">
      <div className="content_section">
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
                      <svg
                        id="Group_1829"
                        data-name="Group 1829"
                        xmlns="http://www.w3.org/2000/svg"
                        width="90.84"
                        height="37.831"
                        viewBox="0 0 45.84 37.831"
                      >
                        <defs>
                          <clipPath id="clipPath1">
                            <rect
                              id="Rectangle_861"
                              data-name="Rectangle 861"
                              width="45.84"
                              height="37.831"
                            />
                          </clipPath>
                        </defs>
                        <g
                          id="Group_1829-2"
                          data-name="Group 1829"
                          transform="translate(0 0)"
                          clipPath="url(#clipPath1)"
                        >
                          <path
                            id="Path_2128"
                            data-name="Path 2128"
                            d="M100.874,21.754h2.974v2.974a.875.875,0,1,0,1.75,0V20.879a.876.876,0,0,0-.875-.875h-3.849a.875.875,0,1,0,0,1.75"
                            transform="translate(-65.007 -13.004)"
                            fill={
                              isHome === true || isHomeHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                          <path
                            id="Path_2129"
                            data-name="Path 2129"
                            d="M49.467,56.111a.876.876,0,0,0-.875.875V72.558H31.446V56.986a.876.876,0,0,0-.875-.875H23.222a.876.876,0,0,0-.875.875V72.558h-5.6V56.986a.875.875,0,1,0-1.75,0V73.432a.876.876,0,0,0,.875.875h7.348a.876.876,0,0,0,.875-.875V57.861h5.6V73.432a.876.876,0,0,0,.875.875h18.9a.876.876,0,0,0,.875-.875V56.986a.876.876,0,0,0-.875-.875"
                            transform="translate(-9.75 -36.476)"
                            fill={
                              isHome === true || isHomeHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                          <path
                            id="Path_2130"
                            data-name="Path 2130"
                            d="M45.536,19.109,23.578.213a.871.871,0,0,0-1.139,0L.306,19.107a.877.877,0,0,0-.1,1.234.9.9,0,0,0,1.233.1L23,2.029l21.39,18.407a.875.875,0,0,0,1.141-1.327"
                            transform="translate(0 0)"
                            fill={
                              isHome === true || isHomeHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                          <path
                            id="Path_2131"
                            data-name="Path 2131"
                            d="M80.922,64.159a.876.876,0,0,0,.875-.875v-6.3a.876.876,0,0,0-.875-.875H72.874a.876.876,0,0,0-.875.875v6.3a.876.876,0,0,0,.875.875Zm-7.173-6.3h6.3V62.41h-6.3Z"
                            transform="translate(-46.805 -36.476)"
                            fill={
                              isHome === true || isHomeHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                        </g>
                      </svg>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="90.457"
                        height="38.015"
                        viewBox="0 0 53.457 38.015"
                      >
                        <g id="Group_1828" transform="translate(0 0)">
                          <g
                            id="Group_1828-2"
                            data-name="Group 1828"
                            transform="translate(0 0)"
                            clipPath="url(#clipPath2)"
                          >
                            <path
                              id="Path_2114"
                              data-name="Path 2114"
                              d="M52.658,36.418H51.417V6.651A6.658,6.658,0,0,0,44.767,0H8.69A6.658,6.658,0,0,0,2.04,6.651V36.418H.8a.8.8,0,1,0,0,1.6H52.658a.8.8,0,1,0,0-1.6M3.637,6.651A5.059,5.059,0,0,1,8.69,1.6H44.767A5.059,5.059,0,0,1,49.82,6.651V36.418H48.067V7.03a3.61,3.61,0,0,0-3.528-3.679H8.917A3.61,3.61,0,0,0,5.39,7.03V36.418H3.637ZM46.47,24.271a.763.763,0,0,0-.16-.017H6.987V7.03a2.013,2.013,0,0,1,1.93-2.082H44.539A2.013,2.013,0,0,1,46.47,7.03ZM6.987,25.851H46.31a.763.763,0,0,0,.16-.017V36.418H6.987Z"
                              transform="translate(0 0)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                            <path
                              id="Path_2115"
                              data-name="Path 2115"
                              d="M54.639,52.664h-29.7a.807.807,0,0,0,0,1.6h29.7a.807.807,0,0,0,0-1.6"
                              transform="translate(-14.988 -32.558)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                            <path
                              id="Path_2116"
                              data-name="Path 2116"
                              d="M54.639,41.613h-29.7a.807.807,0,0,0,0,1.6h29.7a.807.807,0,0,0,0-1.6"
                              transform="translate(-14.988 -25.726)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                            <path
                              id="Path_2117"
                              data-name="Path 2117"
                              d="M54.639,30.563h-29.7a.807.807,0,0,0,0,1.6h29.7a.807.807,0,0,0,0-1.6"
                              transform="translate(-14.988 -18.895)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                            <path
                              id="Path_2118"
                              data-name="Path 2118"
                              d="M54.639,19.512h-29.7a.807.807,0,0,0,0,1.6h29.7a.807.807,0,0,0,0-1.6"
                              transform="translate(-14.988 -12.063)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                            <path
                              id="Path_2119"
                              data-name="Path 2119"
                              d="M112.032,52.664h-.221a.8.8,0,1,0,0,1.6h.221a.8.8,0,0,0,0-1.6"
                              transform="translate(-68.63 -32.558)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                            <path
                              id="Path_2120"
                              data-name="Path 2120"
                              d="M112.032,41.613h-.221a.8.8,0,1,0,0,1.6h.221a.8.8,0,0,0,0-1.6"
                              transform="translate(-68.63 -25.726)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                            <path
                              id="Path_2121"
                              data-name="Path 2121"
                              d="M112.032,30.563h-.221a.8.8,0,1,0,0,1.6h.221a.8.8,0,0,0,0-1.6"
                              transform="translate(-68.63 -18.895)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                            <path
                              id="Path_2122"
                              data-name="Path 2122"
                              d="M112.032,19.512h-.221a.8.8,0,1,0,0,1.6h.221a.8.8,0,0,0,0-1.6"
                              transform="translate(-68.63 -12.063)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                            <path
                              id="Path_2123"
                              data-name="Path 2123"
                              d="M51.241,69.394l-1.57,1.927a1.856,1.856,0,0,0-.612-.1c-.058,0-.116,0-.173.009l-.7-1.831H47.105l.841,2.193a1.874,1.874,0,0,0-.668.937l-4.931.249a1.384,1.384,0,0,0-.21-.6l3.136-2.778h-1.4L41.7,71.734a1.381,1.381,0,0,0-.74-.215,1.4,1.4,0,1,0,1.311,1.868l5.007.253a1.866,1.866,0,1,0,3.383-1.513l2.227-2.734Z"
                              transform="translate(-24.459 -42.901)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                            <path
                              id="Path_2124"
                              data-name="Path 2124"
                              d="M89.52,72.916a1.4,1.4,0,1,0,1.091-1.362l-.712-2.16H88.772L90,71.868a1.392,1.392,0,0,0-.476,1.048"
                              transform="translate(-54.88 -42.901)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                            <path
                              id="Path_2125"
                              data-name="Path 2125"
                              d="M54.581,72.423l1.155-.058c.033-.055.068-.108.1-.161a5.981,5.981,0,0,0-.689-1.687l-.977.865a4.7,4.7,0,0,1,.406,1.041"
                              transform="translate(-33.492 -43.594)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                            <path
                              id="Path_2126"
                              data-name="Path 2126"
                              d="M37.967,74.432a4.739,4.739,0,1,1-7.841-4.866c.06-.06.125-.114.188-.171H28.607a6.012,6.012,0,1,0,10.655,5.169c-.015-.023-.03-.045-.044-.068Z"
                              transform="translate(-16.977 -42.901)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                            <path
                              id="Path_2127"
                              data-name="Path 2127"
                              d="M87.809,69.394c.063.057.128.111.189.171a4.739,4.739,0,1,1-6.7,0c.059-.059.121-.115.183-.171h-1.7a6.016,6.016,0,1,0,9.74,0Z"
                              transform="translate(-48.611 -42.901)"
                              fill={
                                isOutbuilding === true || isOutbuildingHover
                                  ? "#fff"
                                  : "#7a7a7a"
                              }
                            />
                          </g>
                        </g>
                      </svg>
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
                      <svg
                        id="Group_1830"
                        data-name="Group 1830"
                        xmlns="http://www.w3.org/2000/svg"
                        width="90.466"
                        height="37.754"
                        viewBox="0 0 47.466 37.754"
                      >
                        <defs>
                          <clipPath id="clipPath3">
                            <rect
                              id="Rectangle_862"
                              data-name="Rectangle 862"
                              width="67.466"
                              height="37.754"
                              fill={isCommunal === true ? "#fff" : "#7a7a7a"}
                            />
                          </clipPath>
                        </defs>
                        <g id="Group_1830-2" clipPath="url(#clip-path3)">
                          <path
                            id="Path_2132"
                            data-name="Path 2132"
                            d="M8.386,13.838l1.7-4.3a4.734,4.734,0,0,1,1.837,6.379,2.827,2.827,0,0,1,.875,1.091,6.045,6.045,0,0,0-2.225-8.7l1.143-2.9L15.018,9.8a.971.971,0,0,1,.715-.3h.7l-2.1-2.786L12.275,3.982,13.518.834A.663.663,0,0,0,12.883,0H8.5a.659.659,0,0,0,0,1.316H11.92l-.951,2.411a.521.521,0,0,0-.131.331L9.353,7.823a6.044,6.044,0,0,0-3.91.243C5.1,5.115.411,4.859.081,8a48.479,48.479,0,0,0-.016,5v6.067a.658.658,0,0,0,1.316,0V8.885c0-.7-.024-1.389.756-1.748a1.413,1.413,0,0,1,2.01,1.386c0,.092,0,.184,0,.275a6.049,6.049,0,0,0,0,9.727v.536a.663.663,0,0,0,1.286.2,6.037,6.037,0,0,0,1.444.392q0-.667.044-1.328a4.71,4.71,0,0,1-1.454-.506c.02-2.77.091-5.551.03-8.319a4.728,4.728,0,0,1,3.369-.438L7.117,13.488c-.311.788.961,1.13,1.269.35m-4.24.088v2.808a4.725,4.725,0,0,1,.019-6.164c0,1.119-.019,2.239-.019,3.356"
                            transform="translate(0 -0.001)"
                            fill={
                              isCommunal === true || isCommunalHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                          <path
                            id="Path_2133"
                            data-name="Path 2133"
                            d="M51.252,13.79l.958-2.232,1.613,2.061a6.09,6.09,0,0,0-.828,1,.865.865,0,0,1-.039.492L52,17.54h.006c-.009.137-.016.274-.016.413s.012.28.021.418l2.907,3.86a.967.967,0,0,1,.626-.26,4.735,4.735,0,0,1-2.238-4.018c0-.066,0-.13.005-.2.146.025.291.05.436.077l4.124.753a.653.653,0,0,0,.741-.346.964.964,0,0,1-.709-.327,1.055,1.055,0,0,1-.246-.687,1.079,1.079,0,0,1,.184-.595l-2.174-2.777a4.731,4.731,0,0,1,6.78,2.353h.229a1.017,1.017,0,0,1,.094,2.028,4.719,4.719,0,0,1-1.334,3.021l.739.943c.111-.062.224-.119.338-.174a6.049,6.049,0,0,0-7.663-9.214L52.8,10.189l.8-1.873a.714.714,0,0,0,.059-.289h1.781a.658.658,0,0,0,0-1.316H51.418a.658.658,0,0,0,0,1.316H52.3L49.83,13.79ZM56.469,17l-2.922-.534a4.738,4.738,0,0,1,1.093-1.8L56.469,17"
                            transform="translate(-31.868 -4.292)"
                            fill={
                              isCommunal === true || isCommunalHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                          <path
                            id="Path_2134"
                            data-name="Path 2134"
                            d="M26.951,49.429V49.34a1.3,1.3,0,0,0-.424-.947,4.716,4.716,0,0,1-1.61.789c-.008.134-.01.282-.01.449v.911a5.987,5.987,0,0,0,1.326-.447,6.4,6.4,0,0,1,.719-.666"
                            transform="translate(-15.928 -30.949)"
                            fill={
                              isCommunal === true || isCommunalHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                          <path
                            id="Path_2135"
                            data-name="Path 2135"
                            d="M45.228,32a3.938,3.938,0,0,0,.865,1.02.734.734,0,0,0,.425.2h0c.167.04.337.07.5.106l.5-1.257-.111-.02L47.434,32Z"
                            transform="translate(-28.925 -20.468)"
                            fill={
                              isCommunal === true || isCommunalHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                          <path
                            id="Path_2136"
                            data-name="Path 2136"
                            d="M48.2,73.947a6.416,6.416,0,0,1,.889-.869c.016-.013.031-.027.048-.04v-.023l0-.066a1.447,1.447,0,0,0-.083-.427A4.77,4.77,0,0,1,47.089,74.2v1.417l.111-.04c.07-.163.143-.323.226-.479a6.455,6.455,0,0,1,.772-1.151"
                            transform="translate(-30.115 -46.381)"
                            fill={
                              isCommunal === true || isCommunalHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                          <path
                            id="Path_2137"
                            data-name="Path 2137"
                            d="M97.261,75.618c.059-.07.114-.143.176-.211l-.19-.243a4.731,4.731,0,0,1-1.736.964l-.18.418-.284.662-.092.215.468.086a5.994,5.994,0,0,0,.818-.244c.07-.164.146-.324.23-.481a6.409,6.409,0,0,1,.791-1.166"
                            transform="translate(-60.727 -48.07)"
                            fill={
                              isCommunal === true || isCommunalHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                          <path
                            id="Path_2138"
                            data-name="Path 2138"
                            d="M76.256,68.7A6.076,6.076,0,0,0,79.348,72.8l-.633-.84-1.829-2.43Z"
                            transform="translate(-48.769 -43.934)"
                            fill={
                              isCommunal === true || isCommunalHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                          <path
                            id="Path_2139"
                            data-name="Path 2139"
                            d="M76.107,40.036,75.295,39l-1.141-1.458.8-1.873a.711.711,0,0,0,.059-.289H76.8a.694.694,0,0,0,.1-.01.659.659,0,0,0-.1-1.306H72.774a.6.6,0,0,0-.574.368.653.653,0,0,0,.574.948h.886L71.908,39.46H73.33l.236-.55.43.55H74.1a.985.985,0,0,1,.409.1l.03.012a1.109,1.109,0,0,1,.422.362.968.968,0,0,1,.15.369.87.87,0,0,1-.032.448c0,.011,0,.023-.009.034l-.013.034.119.152c-.107.1-.208.213-.307.325l-.66,1.674-.192.487-.114.289.014.019.737.978.317.421.13.023,4.124.754a.665.665,0,0,0,.641-1.1l-2.843-3.632a4.719,4.719,0,0,1,5.642.67H84.39a6.043,6.043,0,0,0-8.182-1.714l-.1-.129M76,42.015l1.829,2.337L74.9,43.818A4.74,4.74,0,0,1,76,42.015"
                            transform="translate(-45.988 -21.785)"
                            fill={
                              isCommunal === true || isCommunalHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                          <path
                            id="Path_2140"
                            data-name="Path 2140"
                            d="M28.461,41.189l1.7-4.3a4.743,4.743,0,0,1,2.409,4.124c0,.144-.009.285-.022.426a3.142,3.142,0,0,1,.333.246,2.865,2.865,0,0,1,.507.559,2.79,2.79,0,0,1,.254.455,6.034,6.034,0,0,0-2.995-7.043l1.143-2.9,4.3,5.7a6.52,6.52,0,0,0,1.16,1.444.733.733,0,0,0,.425.2h0c.2.047.4.084.593.125l.134-.34.155-.391a.838.838,0,0,1,.047-.191.9.9,0,0,1,.124-.241l.038-.1-.2-.037.746-1.737H37.884l-.4.937c-.021-.023-.041-.048-.056-.068l-.654-.869h-.2a1.04,1.04,0,0,1-.278-.04.994.994,0,0,1-.716-.951c0-.009,0-.018,0-.028s0-.036,0-.054a1.071,1.071,0,0,1,.093-.391l-1.263-1.678-1.335-1.773-.721-.958.258-.655.5-1.269.483-1.224a.663.663,0,0,0-.634-.833H28.572a.6.6,0,0,0-.495.231.665.665,0,0,0,.495,1.085h3.422l-.2.5-.5,1.266q-.128.322-.254.644a.516.516,0,0,0-.131.331l-1.485,3.764a6.041,6.041,0,0,0-3.911.242,2.628,2.628,0,0,0-.134-.574,2.467,2.467,0,0,0-.81-1.128c-1.48-1.164-4.171-.718-4.418,1.631-.018.172-.031.345-.042.518-.028.437-.039.878-.038,1.321,0,1.058.065,2.126.065,3.161v6.067a.658.658,0,0,0,1.316,0V36.236c0-.143,0-.285.006-.425a1.355,1.355,0,0,1,2.264-1.11,1.686,1.686,0,0,1,.5,1.173c0,.039,0,.077,0,.116l0,.16a6.049,6.049,0,0,0,0,9.727v.536a.663.663,0,0,0,1.286.2,6.025,6.025,0,0,0,2.24.459c0-.044,0-.088,0-.132,0-.076,0-.153-.006-.229-.006-.2-.012-.4-.016-.595,0-.121,0-.242,0-.364a4.709,4.709,0,0,1-2.175-.581c.02-2.77.092-5.551.03-8.319a4.729,4.729,0,0,1,3.369-.438l-1.749,4.432c-.311.788.961,1.13,1.269.35M24.24,37.921c0,1.119-.019,2.239-.019,3.356v2.808a4.725,4.725,0,0,1,.019-6.164"
                            transform="translate(-12.839 -17.493)"
                            fill={
                              isCommunal === true || isCommunalHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                          <path
                            id="Path_2141"
                            data-name="Path 2141"
                            d="M105.016,64.777l.292.373c.082-.046.166-.087.25-.129.161-.08.324-.156.491-.222a5.928,5.928,0,0,0,.228-3.717.974.974,0,0,1-.346.1,1.106,1.106,0,0,1-.122.013h-.861a4.725,4.725,0,0,1-.18,3.265Z"
                            transform="translate(-67.004 -39.065)"
                            fill={
                              isCommunal === true || isCommunalHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                          <path
                            id="Path_2142"
                            data-name="Path 2142"
                            d="M68.436,57.64a6.018,6.018,0,0,0-2.083.37c-.172.063-.338.137-.5.215a6.112,6.112,0,0,0-.594.321l-.014.009-.386-.493-.239-.3-.247-.316-1.182-1.51q.4-.936.8-1.873a.711.711,0,0,0,.059-.289h1.781l.025,0a.6.6,0,0,0,.589-.486.631.631,0,0,0-.614-.828H61.808a.659.659,0,0,0,0,1.316h.886L60.07,59.881l-.15.349-.147.342-.108.253c-.021-.024-.041-.048-.056-.068l-.179-.238-.346-.459-.4-.532-2.094-2.781L56.1,56.1l-.4-.531-.35-.465-.71-.943-.109-.145.089-.225.1-.248c.06-.173.126-.343.2-.508l.67-1.7.054-.138.042-.106.089-.225a.5.5,0,0,0,.031-.207.688.688,0,0,0-.456-.583.6.6,0,0,0-.209-.044H50.755a.6.6,0,0,0-.463.193.671.671,0,0,0-.166.379.754.754,0,0,0,.019.273.6.6,0,0,0,.536.465c.025,0,.048.007.074.007h3.422l-.118.3-.615,1.56-.135.342-.084.212a.568.568,0,0,0-.077.125.493.493,0,0,0-.053.205l-.152.387-.134.34-.135.342-1.064,2.7a5.973,5.973,0,0,0-3.688.162c-.074.027-.15.05-.223.08a2.666,2.666,0,0,0-.065-.341,2.5,2.5,0,0,0-.192-.521,2.447,2.447,0,0,0-.45-.626,2.623,2.623,0,0,0-.316-.271,2.764,2.764,0,0,0-.332-.209,2.637,2.637,0,0,0-4.006,1.9,17.322,17.322,0,0,0-.081,1.858c0,.12,0,.24,0,.36s0,.24.005.36q.007.3.015.594l.011.36q.005.18.01.36c.01.372.018.741.018,1.106v6.067a.658.658,0,0,0,1.316,0V58.918c0-.7-.024-1.39.755-1.749a1.3,1.3,0,0,1,1.556.256,1.548,1.548,0,0,1,.24.331,1.708,1.708,0,0,1,.164.426,1.835,1.835,0,0,1,.049.373c0,.092,0,.184,0,.275a6.121,6.121,0,0,0-1.813,2.159c-.08.159-.152.323-.218.49A6.042,6.042,0,0,0,46.4,68.558v.536a.663.663,0,0,0,1.286.2,6.054,6.054,0,0,0,5.137-10.951l1.143-2.9.053.071.386.513.443.588,2.988,3.969.425.564.019.027c.111.151.225.323.344.5a3.6,3.6,0,0,0,.8.918.735.735,0,0,0,.425.2h0c.834.2,1.688.347,2.542.488-.009.137-.015.274-.015.413a6.056,6.056,0,1,0,6.056-6.056m0,10.8A4.745,4.745,0,0,1,63.7,63.7c0-.066,0-.131.005-.2.146.025.291.05.436.077l4.124.753a.664.664,0,0,0,.64-1.1L66.058,59.6a4.739,4.739,0,1,1,2.378,8.837m-7.693-6.812.028-.065.159-.369.272-.634.168-.39.178-.415L62.6,57.3l.985,1.259.225.287.224.287.178.228a6.091,6.091,0,0,0-.849,1.036,6.019,6.019,0,0,0-.34.591q-.12.239-.219.49c-.064.161-.123.324-.173.491l-.9-.165-.989-.181m3.194.584a4.742,4.742,0,0,1,1.093-1.8l1.829,2.337-2.922-.534M46.423,60.6c0,1.119-.019,2.239-.019,3.356v2.808a4.726,4.726,0,0,1,.019-6.165m3.587,7.833a4.715,4.715,0,0,1-2.285-.588c.02-2.77.092-5.551.03-8.319a4.73,4.73,0,0,1,3.369-.438q-.874,2.216-1.749,4.431c-.311.788.961,1.13,1.269.35l1.7-4.3a4.738,4.738,0,0,1-2.331,8.864"
                            transform="translate(-27.025 -31.999)"
                            fill={
                              isCommunal === true || isCommunalHover
                                ? "#fff"
                                : "#7a7a7a"
                            }
                          />
                        </g>
                      </svg>
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
