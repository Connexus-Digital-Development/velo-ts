import { useState, useEffect } from "react";
import ComparisonTableRowMobile from "../CoverComparison/ComparisonTableRowMobile";
import CoverData from "./../CoverComparison/CoverData";
import ComparisonTableRow from "./../CoverComparison/ComparisonTableRow";
import BikeIcon from "@/assets/svgs/bike-icon.svg?url";

const MultiBikeComparison = () => {
  const [isCG, setIsCG] = useState(true);
  const [isWiggle, setIsWiggle] = useState(false);
  const [isCP, setIsCP] = useState(false);
  const [isYJ, setIsYJ] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(1);
  const coverData = CoverData();
  const [isCoreSelected, setIsCoreSelected] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.visualViewport?.width ?? 0 < 750) setIsMobile(true);
  }, []);

  const handlePerformanceClick = () => {
    setIsCoreSelected(false);
  };
  const handleCoreClick = () => {
    setIsCoreSelected(true);
  };

  const clearTabs = () => {
    setIsCG(false);
    setIsWiggle(false);
    setIsCP(false);
    setIsYJ(false);
  };
  const handleTabClick = (id: number) => {
    clearTabs();
    switch (id) {
      case 1:
        setIsCG(true);
        setSelectedBrand(1);
        return;
      case 2:
        setIsWiggle(true);
        setSelectedBrand(2);
        return;
      case 3:
        setIsCP(true);
        setSelectedBrand(3);
        return;
      case 4:
        setIsYJ(true);
        setSelectedBrand(4);
        return;
    }
  };

  return (
    <div className="container-fluid greyBG oh pr">
      <div className="container d-none d-sm-block">
        {/* This only shows for desktop */}
        <h3 className="text-center pt-4">
          Compare <span className="orangeFont">our multi-bike</span> cover
        </h3>
        <h4 className="text-center greyFont">
          from leading cycle insurance providers.
        </h4>
        <div className="wrapper">
          <table className="paddingBetweenCols">
            <tbody>
              {coverData.EightThousand.map((row) => (
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
        <div className="footWrapper" style={{ marginLeft: "10px" }}>
          <div className="row">
            <div className="col-12 px-3 text-center">
              <p className="small center-on-mobile">
                Please note prices were accurate as of March 2025 and are
                rounded up to the nearest pound (GBP). The cost of multi-bike
                insurance cover is based on one £3,000 e-bike and a £3,000
                mountain bike owned by a 47 year old individual living at SW19
                8TJ. Example uses Laka Core, Bikmo Go, Wiggle Essential &amp;
                Sundays cover levels. Laka premium calculated from 'what you
                will usually pay'. Quotes will vary depending on details
                provided.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-block d-sm-none">
        {" "}
        {/* mobile only */}
        <div className="container text-center">
          <h3 className="text-center pt-4 ">
            Compare <span className="orangeFont">our </span>
          </h3>
          <h3 className="text-center ">
            <span className="orangeFont">multi-bike</span> cover
          </h3>
          <p className="text-center greyFont lufga">
            from leading cycle insurance providers.
          </p>

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
                      src={BikeIcon}
                      alt="Bike icon"
                      style={
                        {
                          "--bike-icon-bg-color": isCoreSelected
                            ? "#fff"
                            : "#cbcbcb",
                          "--bike-icon-fill-color": isCoreSelected
                            ? "#fff"
                            : "#cbcbcb",
                        } as React.CSSProperties
                      }
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
                      src={BikeIcon}
                      alt="Bike icon"
                      style={
                        {
                          "--bike-icon-bg-color": !isCoreSelected
                            ? "#fff"
                            : "#cbcbcb",
                          "--bike-icon-fill-color": !isCoreSelected
                            ? "#fff"
                            : "#cbcbcb",
                        } as React.CSSProperties
                      }
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

          <div className="brandTabs d-block d-sm-none">
            <div
              className={`tab ${isCG ? "tabFocusOrange" : ""}`}
              onClick={() => {
                handleTabClick(1);
              }}
            >
              Laka
            </div>
            <div
              className={`tab ${isWiggle ? "tabFocusOrange" : ""}`}
              onClick={() => {
                handleTabClick(2);
              }}
            >
              Yellow Jersey
            </div>
            <div
              className={`tab ${isCP ? "tabFocusOrange" : ""}`}
              onClick={() => {
                handleTabClick(3);
              }}
            >
              Bikmo
            </div>
            <div
              className={`tab ${isYJ ? "tabFocusOrange" : ""}`}
              onClick={() => {
                handleTabClick(4);
              }}
            >
              Direct
              <br /> Line
            </div>
            {/* <div
              className={`tab ${isBikmo ? "tabFocusOrange" : ""}`}
              onClick={() => {
                handleTabClick(5);
              }}
            >
              Wiggle
            </div> */}
          </div>

          <div className="wrapper">
            <table className="paddingBetweenCols">
              <tbody>
                {coverData.EightThousand.map((row) => (
                  <ComparisonTableRowMobile
                    row={row}
                    theme="#ff9100"
                    themeClass="orangeFont"
                    key={row.id}
                    selectedCol={selectedBrand}
                    corePerformance={isCoreSelected}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="small p-1 text-center ">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiBikeComparison;
