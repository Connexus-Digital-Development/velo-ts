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
          </div>
        );
      case 2:
        return <div className="greyFont">$</div>;
      case 1000:
        return (
          <div>
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
            <p className={`smallPrint1000 ${fillColour}`}></p>
          </div>
        );
      case 250:
        return (
          <div>
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
            <p className={`smallPrint250 ${fillColour}`}></p>
          </div>
        );
      case 3:
        return (
          <div>
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
