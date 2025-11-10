interface ComparisonTableRowAltProps {
  row: {
    c1: any;
    c2: any;
    c3: any;
    c4?: any;
    c5?: any;
    c6?: any;
    c7?: any;
  };
  theme: string;
  themeClass: string;
}

import { CheckmarkIcon } from "../../icons/CheckmarkIcon";

const ComparisonTableRowAlt = (props: ComparisonTableRowAltProps) => {
  const data = props.row;
  const fillColour = props.theme;
  const themeClass = props.themeClass;
  const formatCol = (text: number | string) => {
    switch (text) {
      case 0:
        return "-";
      case 1:
        return (
          <div>
            <CheckmarkIcon currentColor={fillColour} />
          </div>
        );
      case 2:
        return <div className="greyFont">$</div>;
      case 1000:
        return (
          <div>
            <CheckmarkIcon currentColor={fillColour} />
            <p className={`smallPrint1000 ${fillColour}`}></p>
          </div>
        );
      case 250:
        return (
          <div>
            <CheckmarkIcon currentColor={fillColour} />
            <p className={`smallPrint250 ${fillColour}`}></p>
          </div>
        );
      case 3:
        return (
          <div>
            <CheckmarkIcon currentColor={fillColour} />
            <p className="smallPrintOptional"></p>
          </div>
        );
      case 2000:
        return (
          <div>
            <p
              style={{
                color: "#7a7a7a",
                fontSize: "1em",
                lineHeight: "0",
                paddingTop: "10px",
              }}
            >
              Optional
            </p>
            <p className={`${themeClass}`}>up to £2000</p>
          </div>
        );
      case 500000:
        return (
          <div>
            <CheckmarkIcon currentColor={fillColour} />
            <p className={`${themeClass}`}>up to £500k</p>
          </div>
        );
      default:
        return text;
    }
  };

  return (
    <tr>
      <td>
        <div className="titleCell coreOverrideTitle lighterGreyFont">
          {formatCol(data.c1)}
        </div>
      </td>
      <td>
        <div className={`comparisonCell coreOverrideCol ${themeClass}`}>
          {formatCol(data.c2)}
        </div>
      </td>
      <td>
        <div className={`comparisonCell coreOverrideCol ${themeClass}`}>
          {formatCol(data.c3)}
        </div>
      </td>
    </tr>
  );
};

export default ComparisonTableRowAlt;
