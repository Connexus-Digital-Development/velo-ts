export function HomeSecurityIcon({
  isHome,
  isHomeHover,
}: {
  isHome: boolean;
  isHomeHover: boolean;
}) {
  return (
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
          fill={isHome === true || isHomeHover ? "#fff" : "#7a7a7a"}
        />
        <path
          id="Path_2129"
          data-name="Path 2129"
          d="M49.467,56.111a.876.876,0,0,0-.875.875V72.558H31.446V56.986a.876.876,0,0,0-.875-.875H23.222a.876.876,0,0,0-.875.875V72.558h-5.6V56.986a.875.875,0,1,0-1.75,0V73.432a.876.876,0,0,0,.875.875h7.348a.876.876,0,0,0,.875-.875V57.861h5.6V73.432a.876.876,0,0,0,.875.875h18.9a.876.876,0,0,0,.875-.875V56.986a.876.876,0,0,0-.875-.875"
          transform="translate(-9.75 -36.476)"
          fill={isHome === true || isHomeHover ? "#fff" : "#7a7a7a"}
        />
        <path
          id="Path_2130"
          data-name="Path 2130"
          d="M45.536,19.109,23.578.213a.871.871,0,0,0-1.139,0L.306,19.107a.877.877,0,0,0-.1,1.234.9.9,0,0,0,1.233.1L23,2.029l21.39,18.407a.875.875,0,0,0,1.141-1.327"
          transform="translate(0 0)"
          fill={isHome === true || isHomeHover ? "#fff" : "#7a7a7a"}
        />
        <path
          id="Path_2131"
          data-name="Path 2131"
          d="M80.922,64.159a.876.876,0,0,0,.875-.875v-6.3a.876.876,0,0,0-.875-.875H72.874a.876.876,0,0,0-.875.875v6.3a.876.876,0,0,0,.875.875Zm-7.173-6.3h6.3V62.41h-6.3Z"
          transform="translate(-46.805 -36.476)"
          fill={isHome === true || isHomeHover ? "#fff" : "#7a7a7a"}
        />
      </g>
    </svg>
  );
}
