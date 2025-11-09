import { CheckmarkIcon } from "@/components/icons/CheckmarkIcon";

interface ComparisonTableRowProps {
  row: {
    c1: any;
    c2: any;
    c3: any;
    c4: any;
    c5: any;
    c6: any;
    c7: any;
  };
  theme: string;
  themeClass: string;
}

const ComparisonTableRow = (props: ComparisonTableRowProps) => {
  const data = props.row;
  //console.log("desktop");
  const fillColour = props.theme;
  const themeClass = props.themeClass;

  const formatCol = (text: number | string) => {
    switch (text) {
      case 0:
        return "-";
      case 1:
        return <CheckmarkIcon currentColor={fillColour} />;
      case 2:
        return "-";
      case 1000:
        return (
          <div>
            <CheckmarkIcon currentColor={fillColour} />
            <p className={`smallPrint1000 ${themeClass}`}></p>
          </div>
        );
      case 250:
        return (
          <div>
            <CheckmarkIcon currentColor={fillColour} />
            {/* <p className={`smallPrint250 ${themeClass}`}></p> */}
            <p style={{ marginTop: "2px" }} className={`${themeClass}`}>
              up to £250
            </p>
          </div>
        );
      case 3:
        return <span className="optional-text lufga-medium">Optional</span>;
      case 10000:
        return (
          <div>
            <CheckmarkIcon currentColor={fillColour} />
            {/* <p className={`smallPrint250 ${themeClass}`}></p> */}
            <p style={{ marginTop: "2px" }} className={`${themeClass}`}>
              up to £10k
            </p>
          </div>
        );
      case 100001:
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
            <p style={{ marginTop: "2px" }} className={`${themeClass}`}>
              up to £10k
            </p>
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
                paddingTop: "25px",
              }}
            >
              Optional
            </p>
            <p className={`${themeClass}`}>up to £2000</p>
          </div>
        );
      case 25000:
        return (
          <div>
            <CheckmarkIcon currentColor={fillColour} />
            {/* <p className={`smallPrint250 ${themeClass}`}></p> */}
            <p style={{ marginTop: "2px" }} className={`${themeClass}`}>
              up to £25k
            </p>
          </div>
        );
      case 500000:
        return (
          <div>
            <CheckmarkIcon currentColor={fillColour} />
            <p style={{ marginTop: "2px" }} className={`${themeClass}`}>
              up to £500k
            </p>
          </div>
        );
      default:
        return text;
    }
  };

  return (
    <tr>
      <td>
        <div className="titleCell">{formatCol(data.c1)}</div>
      </td>
      <td>
        <div className={`comparisonCell ${themeClass}`}>
          {formatCol(data.c2)}
        </div>
      </td>
      <td>
        <div className={`comparisonCell ${themeClass}`}>
          {formatCol(data.c3)}
        </div>
      </td>
      <td>
        <div className={`comparisonCell`}>{formatCol(data.c4)}</div>
      </td>
      <td>
        <div className={`comparisonCell`}>{formatCol(data.c5)}</div>
      </td>
      <td>
        <div className={`comparisonCell`}>{formatCol(data.c6)}</div>
      </td>
      <td>
        <div className={`comparisonCell`}>{formatCol(data.c7)}</div>
      </td>
    </tr>
  );
};

export default ComparisonTableRow;
