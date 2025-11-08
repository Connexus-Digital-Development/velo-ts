interface ComparisonTableRowMobileProps {
  row: {
    id: number;
    c1: any;
    c2: any;
    c3: any;
    c4: any;
    c5: any;
    c6: any;
    c7: any;
    c8?: any;
  };
  theme: string;
  themeClass: string;
  selectedCol: number;
  corePerformance: boolean;
}

const ComparisonTableRowMobile = (props: ComparisonTableRowMobileProps) => {
  const headerIds = [1, 47, 18, 30];
  const data = props.row;
  const fillColour = props.theme;
  const selected = props.selectedCol;
  const comparisonClass = headerIds.includes(data.id)
    ? "comparisonCell"
    : "comparisonCell lufga-light";
  const veloComparisonClass = headerIds.includes(data.id)
    ? `comparisonCell ${props.themeClass} lufga`
    : `comparisonCell ${props.themeClass} lufga-light`;

  const formatCol = (text: number | string) => {
    switch (text) {
      case 0:
        return "-";
      case 1:
        return (
          <div className="widthCC">
            <svg width="43" height="43" viewBox="0 0 43 43">
              <g transform="translate(-1125 -526)">
                <circle
                  cx="11.5"
                  cy="11.5"
                  r="11.5"
                  transform="translate(1125 526)"
                  fill={fillColour}
                />
                <path
                  id="Path_1875"
                  d="M217.815,191.824l3.062,3.062.306-.306,7.246-7.246"
                  transform="translate(913.176 346.189)"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                />
              </g>
            </svg>
          </div>
        );
      case 2:
        return "-";
      case 1000:
        return (
          <div className="widthCC paddingCC">
            <svg width="43" height="43" viewBox="0 0 43 43">
              <g transform="translate(-1125 -526)">
                <circle
                  cx="11.5"
                  cy="11.5"
                  r="11.5"
                  transform="translate(1125 526)"
                  fill={fillColour}
                />
                <path
                  id="Path_1875"
                  d="M217.815,191.824l3.062,3.062.306-.306,7.246-7.246"
                  transform="translate(913.176 346.189)"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                />
              </g>
            </svg>
            <p className={`smallPrint1000 ${fillColour}`}></p>
          </div>
        );
      case 250:
        return (
          <div className="widthCC paddingCC">
            <svg width="43" height="43" viewBox="0 0 43 43">
              <g transform="translate(-1125 -526)">
                <circle
                  cx="11.5"
                  cy="11.5"
                  r="11.5"
                  transform="translate(1125 526)"
                  fill={fillColour}
                />
                <path
                  id="Path_1875"
                  d="M217.815,191.824l3.062,3.062.306-.306,7.246-7.246"
                  transform="translate(913.176 346.189)"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                />
              </g>
            </svg>
            <p className={`smallPrint250 ${fillColour}`}></p>
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
                paddingTop: "20px",
              }}
            >
              Optional
            </p>
            <p style={{fontSize:"10px"}} className={`${fillColour}}`}>up to £2000</p>
          </div>
        );
      case 500000:
        return (
          <div style={{ paddingTop: "20px", marginLeft: "-20px" }}>
            <svg width="23" height="23" viewBox="0 0 23 23">
              <g transform="translate(-1125 -526)">
                <circle
                  cx="11.5"
                  cy="11.5"
                  r="11.5"
                  transform="translate(1125 526)"
                  fill={fillColour}
                />
                <path
                  id="Path_1875"
                  d="M217.815,191.824l3.062,3.062.306-.306,7.246-7.246"
                  transform="translate(913.176 346.189)"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                />
              </g>
            </svg>
            {/* <p  className={`${fillColour}}`}>up to £500k</p> */}
            <p style={{marginTop:"2px"}} className={`${fillColour}`}>up to £500k</p>
          </div>
        );
      default:
        return text;
    }
  };

  const getSelectedBrand = () => {
    switch (selected) {
      case 1:
        return data.c4;
      case 2:
        return data.c5;
      case 3:
        return data.c6;
      case 4:
        return data.c7;
      case 5:
        return data.c8;
    }
  };

  return (
    <tr>
      <td>
        <div className="tr">
          <div className="comparisonCellLeft t">{formatCol(data.c1)}</div>
        </div>
      </td>
      <td>
        <div className="tr">
          <div className={`${comparisonClass}`}>
            {formatCol(getSelectedBrand())}{" "}
          </div>
        </div>
      </td>
      <td>
        <div className="tr">
          <div className={`${veloComparisonClass}`}>
            {formatCol(props.corePerformance ? data.c2 : data.c3)}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ComparisonTableRowMobile;
