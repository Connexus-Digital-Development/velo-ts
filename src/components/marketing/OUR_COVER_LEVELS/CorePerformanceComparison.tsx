import { useLocation } from "react-router";
import ComparisonTableRowAlt from "../COVER_COMPARISON/ComparisonTableRowAlt";
import CTAButton from "@/components/shared/CTAButton";
import CoverData from "./../COVER_COMPARISON/CoverData";

const CorePerformanceComparison = () => {
  const coverData = CoverData();
  const { search } = useLocation();
  return (
    <div
      className="container-fluid lightblueBG oh pr mb-5"
      id="CorePerformanceComparisonTable"
    >
      <div className="container">
        {/* This only shows for desktop */}
        <h3 className="text-center pt-4">
          Differences in <span className="blueFont">our cover levels</span>
        </h3>
        <p className="text-center font-17 mb-5">
          If you’re unsure which cover level is best for you, don't worry. Our
          table below compares all the features included in both options to help
          you make your decision, and if you have any questions, our team are
          always <a href="/contact">on hand to help</a>.
        </p>
        <div className="wrapper">
          <table className="paddingBetweenCols ">
            <tbody>
              {coverData.CoverLevels.map((row) => (
                <ComparisonTableRowAlt
                  row={row}
                  theme="#00a8ff"
                  themeClass="blueFont"
                  key={row.id}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="footWrapper">
          <div className="row">
            <div className="col-12  text-center ">
              <p className="center-on-mobile font-12 coreSmallprint">
                * Cycle rescue excludes electronically assisted cycles weighing
                40kg or over, or an output exceeding 200w/15mph
              </p>
            </div>
          </div>
        </div>
        <div className="mb-5 mt-3">
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
  );
};

export default CorePerformanceComparison;
