export function CheckmarkIcon({ currentColor }: { currentColor: string }) {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23">
      <g transform="translate(-1125 -526)">
        <circle
          cx="11.5"
          cy="11.5"
          r="11.5"
          transform="translate(1125 526)"
          fill={currentColor}
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
  );
}
