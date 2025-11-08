import CoverData from "./CoverData";
import ComparisonTableRow from "./ComparisonTableRow";
import ComparisonTableRowMobile from "./ComparisonTableRowMobile";
import { useEffect, useState } from "react";
import CTAButton from "@/components/shared/CTAButton";
import { useLocation } from "react-router-dom";

const CompareOurCover = () => {
  const { search } = useLocation();
  const coverData = CoverData();

  const [is2k, setIs2k] = useState(true);
  const [is4k, setIs4k] = useState(false);
  const [is8k, setIs8k] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [isCG, setIsCG] = useState(false);
  const [isLaka, setIsLaka] = useState(true);
  const [isYJ, setIsYJ] = useState(false);
  const [isBikmo, setIsBikmo] = useState(false);
  const [isCoreSelected, setIsCoreSelected] = useState(true);

  const [selectedBrand, setSelectedBrand] = useState(1);

  const handlePerformanceClick = () => {
    setIsCoreSelected(false);
  };
  const handleCoreClick = () => {
    setIsCoreSelected(true);
  };

  const clearButtons = () => {
    setIs2k(false);
    setIs4k(false);
    setIs8k(false);
  };

  useEffect(() => {
    if ((window.visualViewport?.width || 0) < 750) setIsMobile(true);
  }, []);

  const handle2KClick = () => {
    clearButtons();
    setIs2k(true);
  };
  const handle4KClick = () => {
    clearButtons();
    setIs4k(true);
  };
  const handle8KClick = () => {
    clearButtons();
    setIs8k(true);
  };

  const clearTabs = () => {
    setIsCG(false);
    // setIsWiggle(false);
    setIsLaka(false);
    setIsYJ(false);
    setIsBikmo(false);
  };

  const handleTabClick = (id: number) => {
    clearTabs();
    switch (id) {
      case 1:
        setIsLaka(true);
        setSelectedBrand(1);
        return;
      case 2:
        setIsYJ(true);
        setSelectedBrand(2);
        return;
      case 3:
        setIsBikmo(true);
        setSelectedBrand(3);
        return;
      case 4:
        setIsCG(true);
        setSelectedBrand(4);
        return;
      // case 5:
      //   setIsWiggle(true);
      //   setSelectedBrand(5);
      //   return;
      default:
        setIsLaka(true);
        setSelectedBrand(1);
        return;
    }
  };

  type ComparisonSelectorProps = {
    title: string;
    headerClass: string;
    tabClass: string;
  };

  const ComparisonSelector = ({
    title,
    headerClass,
    tabClass,
  }: ComparisonSelectorProps) => {
    return (
      <>
        <div className={headerClass} id="chart">
          <p className="p-2">{title}</p>
        </div>
        <div className="brandTabs d-block d-sm-none">
          <div
            className={`tab ${isLaka ? tabClass : ""}`}
            onClick={() => {
              handleTabClick(1);
            }}
          >
            Laka
            <br /> Core
          </div>
          <div
            className={`tab ${isYJ ? tabClass : ""}`}
            onClick={() => {
              handleTabClick(2);
            }}
          >
            Bikmo
            <br /> Go
          </div>
          <div
            className={`tab ${isBikmo ? tabClass : ""}`}
            onClick={() => {
              handleTabClick(3);
            }}
          >
            Wiggle
            <br /> Essential
          </div>
          <div
            className={`tab ${isCG ? tabClass : ""}`}
            onClick={() => {
              handleTabClick(4);
            }}
          >
            Sundays
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="container-fluid bgLightBlue mt-5">
      <div className="container text-center mt-5 lufga ">
        <h4>
          Compare <span className="blueFont">our cover</span>
        </h4>
        <p>from leading cycle insurance providers.</p>

        {isMobile === true && (
          <div className="row CorePerformanceButtonContainer">
            <div className="col-6">
              <button
                onClick={handleCoreClick}
                className={`CorePerformanceButton ${
                  isCoreSelected && "CorePerformanceButtonSelected"
                }  `}
              >
                <div className="svgContainer">
                  <svg
                    id="Group_2890"
                    data-name="Group 2890"
                    width="35"
                    height="35"
                    viewBox="0 0 31.09 27.882"
                  >
                    <defs>
                      <clipPath id="clip-path">
                        <rect
                          id="Rectangle_1443"
                          data-name="Rectangle 1443"
                          width="31.09"
                          height="27.882"
                          fill={isCoreSelected ? "#fff" : "#cbcbcb"}
                        />
                      </clipPath>
                    </defs>
                    <g
                      id="Group_2435"
                      data-name="Group 2435"
                      clipPath="url(#clipPath)"
                    >
                      <path
                        id="Path_2250"
                        data-name="Path 2250"
                        d="M25.031,15.764a6.02,6.02,0,0,0-2.051.358L21.3,12.306v-.819a1.885,1.885,0,0,0,.971-1.058,1.878,1.878,0,0,0-1.122-2.407l-2.063-.751L17.551,5.586a2.8,2.8,0,1,0-2.506-1.543,2.446,2.446,0,0,0-1.608.828L9.591,9.325a1.875,1.875,0,0,0-.018,2.413l1.813,2.2L9.307,16.711a6.052,6.052,0,1,0,2.709,6.216l.967.1a1.872,1.872,0,0,0,.238.459.462.462,0,0,0,.321.795H15.8a.462.462,0,0,0,.4-.685,1.854,1.854,0,0,0,.425-1.041l.164-2.03,4.738-5.411.61,1.384a6.057,6.057,0,1,0,2.894-.737M13.8,22.33l.495-6.119a.46.46,0,0,0-.1-.332l-3.907-4.731a.951.951,0,0,1,.007-1.223l3.832-4.438a1.51,1.51,0,0,1,1.084-.529,1.1,1.1,0,0,1,.808.314l2.46,2.7a.465.465,0,0,0,.184.123l2.17.79a.953.953,0,0,1-.652,1.792L17.672,9.77a.96.96,0,0,1-.389-.266L16.127,8.216a.462.462,0,0,0-.689,0l-2.391,2.69a.459.459,0,0,0-.01.6l2.993,3.6a.948.948,0,0,1,.215.684L15.7,22.484a.958.958,0,0,1-.949.877c-.026,0-.052,0-.078,0A.955.955,0,0,1,13.8,22.33M15.784,9.219l.809.9a1.884,1.884,0,0,0,.763.519l2.507.912a1.865,1.865,0,0,0,.512.108v.346l-5.087.765L14,11.225Zm.957,5.3-.763-.917,4.578-.689.56,1.271-4.2,4.8.252-3.116a1.87,1.87,0,0,0-.425-1.348m.8-13.594a1.869,1.869,0,1,1-1.869,1.869A1.871,1.871,0,0,1,17.542.924m-6.349,20.9q0,.043,0,.086L6.915,21.45l2.575-3.441a5.133,5.133,0,0,1,1.7,3.814m-1.146-4.557,1.946-2.6,1.369,1.657-.467,5.768-.78-.084c0-.064,0-.125,0-.185a6.052,6.052,0,0,0-2.071-4.557M6.059,26.957a5.134,5.134,0,1,1,2.692-9.5l-2.622,3.5c-.025,0-.048,0-.07,0a.868.868,0,1,0,.681,1.406l4.353.467a5.128,5.128,0,0,1-5.034,4.129m18.972,0a5.133,5.133,0,0,1-2.52-9.606l1.774,4.028a.868.868,0,1,0,1.614.444.873.873,0,0,0-.789-.864L23.353,16.97a5.134,5.134,0,1,1,1.678,9.987m0-5.1a.036.036,0,1,1,.036-.036.036.036,0,0,1-.036.036"
                        fill={isCoreSelected ? "#fff" : "#cbcbcb"}
                      />
                    </g>
                  </svg>
                </div>
                <div
                  className={`innerCorePerformanceButton ${
                    isCoreSelected && "innerCorePerformanceButtonSelected"
                  }`}
                >
                  <div className="d-block">
                    Velosure
                    <br />
                    <span className="CorePerformanceButtonSpan">Core</span>
                  </div>
                </div>
              </button>
            </div>

            <div className="col-6">
              <button
                onClick={handlePerformanceClick}
                className={`CorePerformanceButton ${
                  !isCoreSelected && "CorePerformanceButtonSelected"
                }  `}
              >
                <div className="svgContainer">
                  <svg
                    id="Group_2890"
                    data-name="Group 2890"
                    width="35"
                    height="35"
                    viewBox="0 0 31.09 27.882"
                  >
                    <defs>
                      <clipPath id="clip-path">
                        <rect
                          id="Rectangle_1443"
                          data-name="Rectangle 1443"
                          width="31.09"
                          height="27.882"
                          fill={!isCoreSelected ? "#fff" : "#cbcbcb"}
                        />
                      </clipPath>
                    </defs>
                    <g
                      id="Group_2435"
                      data-name="Group 2435"
                      clipPath="url(#clipPath)"
                    >
                      <path
                        id="Path_2250"
                        data-name="Path 2250"
                        d="M25.031,15.764a6.02,6.02,0,0,0-2.051.358L21.3,12.306v-.819a1.885,1.885,0,0,0,.971-1.058,1.878,1.878,0,0,0-1.122-2.407l-2.063-.751L17.551,5.586a2.8,2.8,0,1,0-2.506-1.543,2.446,2.446,0,0,0-1.608.828L9.591,9.325a1.875,1.875,0,0,0-.018,2.413l1.813,2.2L9.307,16.711a6.052,6.052,0,1,0,2.709,6.216l.967.1a1.872,1.872,0,0,0,.238.459.462.462,0,0,0,.321.795H15.8a.462.462,0,0,0,.4-.685,1.854,1.854,0,0,0,.425-1.041l.164-2.03,4.738-5.411.61,1.384a6.057,6.057,0,1,0,2.894-.737M13.8,22.33l.495-6.119a.46.46,0,0,0-.1-.332l-3.907-4.731a.951.951,0,0,1,.007-1.223l3.832-4.438a1.51,1.51,0,0,1,1.084-.529,1.1,1.1,0,0,1,.808.314l2.46,2.7a.465.465,0,0,0,.184.123l2.17.79a.953.953,0,0,1-.652,1.792L17.672,9.77a.96.96,0,0,1-.389-.266L16.127,8.216a.462.462,0,0,0-.689,0l-2.391,2.69a.459.459,0,0,0-.01.6l2.993,3.6a.948.948,0,0,1,.215.684L15.7,22.484a.958.958,0,0,1-.949.877c-.026,0-.052,0-.078,0A.955.955,0,0,1,13.8,22.33M15.784,9.219l.809.9a1.884,1.884,0,0,0,.763.519l2.507.912a1.865,1.865,0,0,0,.512.108v.346l-5.087.765L14,11.225Zm.957,5.3-.763-.917,4.578-.689.56,1.271-4.2,4.8.252-3.116a1.87,1.87,0,0,0-.425-1.348m.8-13.594a1.869,1.869,0,1,1-1.869,1.869A1.871,1.871,0,0,1,17.542.924m-6.349,20.9q0,.043,0,.086L6.915,21.45l2.575-3.441a5.133,5.133,0,0,1,1.7,3.814m-1.146-4.557,1.946-2.6,1.369,1.657-.467,5.768-.78-.084c0-.064,0-.125,0-.185a6.052,6.052,0,0,0-2.071-4.557M6.059,26.957a5.134,5.134,0,1,1,2.692-9.5l-2.622,3.5c-.025,0-.048,0-.07,0a.868.868,0,1,0,.681,1.406l4.353.467a5.128,5.128,0,0,1-5.034,4.129m18.972,0a5.133,5.133,0,0,1-2.52-9.606l1.774,4.028a.868.868,0,1,0,1.614.444.873.873,0,0,0-.789-.864L23.353,16.97a5.134,5.134,0,1,1,1.678,9.987m0-5.1a.036.036,0,1,1,.036-.036.036.036,0,0,1-.036.036"
                        fill={!isCoreSelected ? "#fff" : "#cbcbcb"}
                      />
                    </g>
                  </svg>
                </div>
                <div
                  className={`innerCorePerformanceButton ${
                    !isCoreSelected && "innerCorePerformanceButtonSelected"
                  }`}
                >
                  <div className="d-block">
                    Velosure
                    <br />
                    <span className="CorePerformanceButtonSpan">
                      Performance
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handle2KClick}
            className={
              is2k === true
                ? "btn compareValueButton blueButton text-white"
                : "btn compareValueButton blueButton-hover"
            }
          >
            Single bike
          </button>
          <button
            onClick={handle4KClick}
            className={
              is4k === true
                ? "btn  compareValueButton greenButton  text-white"
                : "btn compareValueButton greenButtonHover"
            }
          >
            E-bike
          </button>
          <button
            onClick={handle8KClick}
            className={
              is8k === true
                ? "btn  compareValueButton orangeButton text-white"
                : "btn  compareValueButton orangeButtonHover "
            }
          >
            Multi-bike
          </button>
        </div>

        {is2k === true && (
          <>
            <ComparisonSelector
              title="A single £1000 bike"
              headerClass="fullWidthBarBlue"
              tabClass="tabFocusBlue"
            />

            <div className="wrapper">
              <table className="paddingBetweenCols">
                <tbody>
                  {isMobile === true &&
                    coverData.TwoThousand.map((row) => (
                      <ComparisonTableRowMobile
                        row={row}
                        theme="#00a8ff"
                        themeClass="blueFont"
                        key={row.id}
                        selectedCol={selectedBrand}
                        corePerformance={isCoreSelected}
                      />
                    ))}

                  {isMobile === false &&
                    coverData.TwoThousand.map((row) => (
                      <ComparisonTableRow
                        row={row}
                        theme="#00a8ff"
                        themeClass="blueFont"
                        key={row.id}
                      />
                    ))}
                </tbody>
              </table>
            </div>
            <div className="row">
              <p className="small center-on-mobile comparisonSmallprint">
                Please note prices were accurate as of March 2025 and are
                rounded up to the nearest pound (GBP). The cost of single bike
                insurance cover is based on a £1,000 2023 Trek mountain bike
                owned by a 47 year old individual living at SW19 8TJ. Example
                uses Laka Core, Bikmo Go, Wiggle Essential & Sundays cover
                levels. Laka premium calculated from 'what you will usually
                pay'. Quotes will vary depending on details provided.
              </p>
            </div>
          </>
        )}

        {is4k === true && (
          <>
            <ComparisonSelector
              title="A single £4000 e-bike"
              headerClass="fullWidthBarGreen"
              tabClass="tabFocusGreen"
            />

            <div className="wrapper">
              <table className="paddingBetweenCols">
                <tbody>
                  {isMobile === true &&
                    coverData.FourThousand.map((row) => (
                      <ComparisonTableRowMobile
                        row={row}
                        theme="#7bc10b"
                        themeClass="greenFont"
                        key={row.id}
                        selectedCol={selectedBrand}
                        corePerformance={isCoreSelected}
                      />
                    ))}

                  {isMobile === false &&
                    coverData.FourThousand.map((row) => (
                      <ComparisonTableRow
                        row={row}
                        theme="#7bc10b"
                        themeClass="greenFont"
                        key={row.id}
                      />
                    ))}
                </tbody>
              </table>
            </div>
            <div className="row">
              <p className="small center-on-mobile comparisonSmallprint">
                Please note prices were accurate as of March 2025 and are
                rounded up to the nearest pound (GBP). The cost of single bike
                insurance cover is based on a £2,500 electric bike owned by a 47
                year old individual living at SW19 8TJ. Example uses Laka Core,
                Bikmo Go, Wiggle Essential & Sundays cover levels. Laka premium
                calculated from 'what you will usually pay'. Quotes will vary
                depending on details provided.
              </p>
            </div>
          </>
        )}

        {is8k === true && (
          <>
            <ComparisonSelector
              title="2 bikes totaling £6,000 with £3,000 away from home cover"
              headerClass="fullWidthBarOrange"
              tabClass="tabFocusOrange"
            />
            <div className="wrapper">
              <table className="paddingBetweenCols">
                <tbody>
                  {isMobile === true &&
                    coverData.EightThousand.map((row) => (
                      <ComparisonTableRowMobile
                        row={row}
                        theme="#ff9100"
                        themeClass="orangeFont"
                        key={row.id}
                        selectedCol={selectedBrand}
                        corePerformance={isCoreSelected}
                      />
                    ))}

                  {isMobile === false &&
                    coverData.EightThousand.map((row) => (
                      <ComparisonTableRow
                        row={row}
                        theme="#ff9100"
                        themeClass="orangeFont"
                        key={row.id}
                      />
                    ))}
                </tbody>
              </table>
            </div>
            <div className="row">
              <p className="small center-on-mobile comparisonSmallprint">
                Please note prices were accurate as of March 2025 and are
                rounded up to the nearest pound (GBP). The cost of multi-bike
                insurance cover is based on one £3,000 e-bike and a £3,000
                mountain bike owned by a 47 year old individual living at SW19
                8TJ. Example uses Laka Core, Bikmo Go, Wiggle Essential &
                Sundays cover levels. Laka premium calculated from 'what you
                will usually pay'. Quotes will vary depending on details
                provided.
              </p>
            </div>
          </>
        )}
      </div>
      <div className="container">
        <div className="footWrapper">
          <div className="row">
            <div className="col-12 px-sm-3 text-center ">
              <div className="text-center mb-5">
                <CTAButton
                  align="center"
                  colour="green"
                  CTAText="Get a quote"
                  onClick={() => {
                    sessionStorage.removeItem("context");
                  }}
                  Url={`/get-a-quote${search}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompareOurCover;
