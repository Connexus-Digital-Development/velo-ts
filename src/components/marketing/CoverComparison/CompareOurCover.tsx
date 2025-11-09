import CoverData from "./CoverData";
import ComparisonTableRow from "./ComparisonTableRow";
import ComparisonTableRowMobile from "./ComparisonTableRowMobile";
import { useEffect, useState } from "react";
import CTAButton from "@/components/shared/CTAButton";
import { useLocation } from "react-router-dom";
import BikeGearIcon from "@/assets/svgs/bike-gear-icon.svg?url";

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
                  <img
                    src={BikeGearIcon}
                    alt="Bike gear icon"
                    style={{
                      width: "35px",
                      height: "35px",
                      color: isCoreSelected ? "#fff" : "#cbcbcb"
                    }}
                  />
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
                  <img
                    src={BikeGearIcon}
                    alt="Bike gear icon"
                    style={{
                      width: "35px",
                      height: "35px",
                      color: !isCoreSelected ? "#fff" : "#cbcbcb"
                    }}
                  />
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
