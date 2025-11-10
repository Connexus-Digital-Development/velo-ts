import { useLocation } from "react-router";
import CTAButton from "@/components/shared/CTAButton";
import coreGirlImg from "@/assets/images/CoreGirlNoAnkles.jpg";
import CoreBikeGirlMobile from "@/assets/images/CoreBikeGirlMobile.jpg";
import { HashLink } from "react-router-hash-link";

const VelosureCore = () => {
  const infoIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="17"
      viewBox="0 0 24 17"
    >
      <circle
        id="Ellipse_81"
        data-name="Ellipse 81"
        cx="8"
        cy="8"
        r="8"
        transform="translate(8 1)"
        fill="#00a8ff"
      />
      <text
        id="i"
        transform="translate(14 13)"
        fill="#fff"
        fontSize="10"
        fontFamily="SegoeUI, Segoe UI"
      >
        <tspan x="1" y="0">
          i
        </tspan>
      </text>
    </svg>
  );
  const { search } = useLocation();
  return (
    <div className="container-fluid whiteBG  pr oh mb-5 ">
      <div className="container mt-5 mb-5">
        <img
          src={coreGirlImg}
          className="d-none d-md-block coreGirlImg"
          alt=""
        />
        {/* only show this at MD and bigger  */}
        <div className="row">
          <div className="col-12 col-xl-8">
            <h3 className="lufga-medium font-44">
              Velosure <span className="blueFont">Core</span>.
            </h3>
            <p className="blueFont font-23 lufga-medium">
              Focussed features for fundamental cover
            </p>
            {/* Image only to show here on sizes upto and including SM, otherwise show the other image        */}
            <img
              src={CoreBikeGirlMobile}
              alt="Girl with road bike"
              className="d-block d-md-none coreBikeGirlMobile"
            />

            <p className="font-17">
              Just as a strong core provides the foundation for efficient and
              stable cycling, our Core policy gives you all the fundamental
              features that are important for day-to-day biking without the
              added extras that you may not want, or be ready, to invest in.
            </p>
            <p className="font-17">
              It’s ideal for beginners, commuters, hobbyists and enthusiasts who
              aren’t planning on competing or cycling abroad but want to make
              sure they have the perfect protection in place.
            </p>

            <h3 className="lufga-medium font-35 mt-2">
              Key elements <span className="blueFont">included in Core</span>.
            </h3>
          </div>
          {/* hide this version for mobile */}
          <div className="d-none d-md-block col-xl-8">
            <div className="row">
              <div className="col-6">
                <article className="bikeBucket text-left ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="135"
                    height="135"
                    viewBox="0 0 135 135"
                    className="CoreIcon"
                  >
                    <defs>
                      <filter
                        id="Rectangle_748"
                        x="0"
                        y="0"
                        width="135"
                        height="135"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dy="2" in="SourceAlpha" />
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feFlood floodOpacity="0.2" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                      <clipPath id="clipPath99">
                        <rect
                          id="Rectangle_980"
                          data-name="Rectangle 980"
                          width="98.496"
                          height="55.209"
                          fill="#fff"
                        />
                      </clipPath>
                    </defs>
                    <g
                      id="Group_1808"
                      data-name="Group 1808"
                      transform="translate(-401.5 -727.5)"
                    >
                      <g
                        id="Group_1795"
                        data-name="Group 1795"
                        transform="translate(0 55)"
                      >
                        <g id="Group_1789" data-name="Group 1789">
                          <g
                            transform="matrix(1, 0, 0, 1, 401.5, 672.5)"
                            filter="url(#Rectangle_748)"
                          >
                            <rect
                              id="Rectangle_748-2"
                              data-name="Rectangle 748"
                              width="126"
                              height="126"
                              rx="32"
                              transform="translate(4.5 2.5)"
                              fill="#00a8ff"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                    <g
                      id="Group_2184"
                      data-name="Group 2184"
                      transform="translate(18.252 37.895)"
                      clipPath="url(#clipPath99)"
                    >
                      <path
                        id="Path_2194"
                        data-name="Path 2194"
                        d="M98.492,40.619a21.108,21.108,0,0,0-17.8-19.738c-2.993-.472-5.1,1.286-6.8,2.7-.25.208-.494.413-.739.607L67.1,7.165,76.2,8.6a1.812,1.812,0,1,1-.565,3.58l-1.94-.306a1.873,1.873,0,0,0-.583,3.7l1.941.306A5.558,5.558,0,1,0,76.777,4.9L64.643,2.988a1.871,1.871,0,0,0-2.069,2.438l2.713,7.858-.168-.013-23.506-3.7c-.071-.214-1.344-4.113-1.523-4.663l2.6.41A1.884,1.884,0,1,0,43.279,1.6L33.293.023a1.884,1.884,0,0,0-.586,3.722l3.206.5,2.15,6.581c-.15.167-4.269,4.775-4.5,5.037A21,21,0,1,0,41.4,37.842l5.615.884a3.545,3.545,0,0,0,3.123-.546l.019-.014c16.053-19.295,16.067-19.22,16.746-20.037.071.214,1.3,3.637,2.814,7.842a34.355,34.355,0,0,0-7.77,3.852,12.655,12.655,0,0,0-5.391,8.626c-.418,2.653.919,5.405,2.1,7.832A22.846,22.846,0,0,1,59.849,49a6.619,6.619,0,0,0,2.581,3.914,6.776,6.776,0,0,0,3.42.842,10.35,10.35,0,0,1,3.99.855,3.807,3.807,0,0,0,3.1-.214,17.76,17.76,0,0,0,2.1-1.214,11.213,11.213,0,0,1,1.9-1.064,5.238,5.238,0,0,1,1.986,1.209,9.819,9.819,0,0,0,2.013,1.367,4.548,4.548,0,0,0,3.217.289,6.383,6.383,0,0,1,2.846.029c1.638.262,3.882.621,5.986-1.566A8.75,8.75,0,0,0,95.11,50.26a10.455,10.455,0,0,0,.466-2.983,25.287,25.287,0,0,1,.239-2.522,7.146,7.146,0,0,1,.721-.7A4.518,4.518,0,0,0,98.5,40.784c0-.054,0-.11,0-.165M30.526,47.11A17.247,17.247,0,1,1,23.7,15.684a17.022,17.022,0,0,1,7.334,3.007L19.616,31.47a1.884,1.884,0,0,0,1.11,3.116l16.936,2.667a17.208,17.208,0,0,1-7.136,9.856m7.721-13.577L24.728,31.4l9.113-10.2a17.268,17.268,0,0,1,3.393,5.65,17.033,17.033,0,0,1,1.013,6.677m3.742.588a20.756,20.756,0,0,0-1.215-8.558,21.034,21.034,0,0,0-4.409-7.182l3.049-3.411,6.451,19.761Zm7.394-.754c-.221-.678-6.258-19.166-6.457-19.777l20.229,3.185L49.383,33.367M93.917,41.1a5.079,5.079,0,0,0-1.986,2.915,28.961,28.961,0,0,0-.3,3.035,7.223,7.223,0,0,1-.25,1.9,4.878,4.878,0,0,1-1.236,1.753c-.619.644-.976.651-2.517.4a10.015,10.015,0,0,0-4.516.063c-.354.1-.638-.057-1.7-.915A8.237,8.237,0,0,0,77.449,48.2c-1.547-.243-3.061.723-4.525,1.658a13.438,13.438,0,0,1-1.778,1.021,14.353,14.353,0,0,0-5.057-1.061,4.311,4.311,0,0,1-1.552-.24c-.169-.107-.516-.48-.926-1.77a25.175,25.175,0,0,0-1.4-3.249c-.839-1.728-1.78-3.664-1.78-5.076a2.67,2.67,0,0,1,.031-.418,8.783,8.783,0,0,1,3.807-6.042,30.428,30.428,0,0,1,6.792-3.333C73.294,35.9,75.6,42.3,75.6,42.3a1.875,1.875,0,0,0,1.526,1.233,1.9,1.9,0,0,0,.881-.094,1.882,1.882,0,0,0,1.139-2.408l-4.61-12.956c.685-.462,1.3-.979,1.883-1.459,1.554-1.294,2.49-2.017,3.66-1.833a17.139,17.139,0,0,1,14.45,15.749c-.153.166-.419.4-.612.574"
                        transform="translate(0 0)"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                  <h4 className="CoreIconLabels">Accidental damage</h4>
                  <p className="font-16 coreIconText">
                    Your bicycle is fully covered following a sudden or
                    unexpected event where it suffers accidental damage.{" "}
                  </p>
                </article>
              </div>
              <div className="col-6">
                <article className="bikeBucket text-left mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="135"
                    height="135"
                    viewBox="0 0 135 135"
                    className="CoreIcon"
                  >
                    <defs>
                      <filter
                        id="Rectangle_748"
                        x="0"
                        y="0"
                        width="135"
                        height="135"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dy="2" in="SourceAlpha" />
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feFlood floodOpacity="0.2" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                    </defs>
                    <g
                      id="Group_1789"
                      data-name="Group 1789"
                      transform="translate(-401.5 -672.5)"
                    >
                      <g
                        transform="matrix(1, 0, 0, 1, 401.5, 672.5)"
                        filter="url(#Rectangle_748)"
                      >
                        <rect
                          id="Rectangle_748-2"
                          data-name="Rectangle 748"
                          width="126"
                          height="126"
                          rx="32"
                          transform="translate(4.5 2.5)"
                          fill="#00a8ff"
                        />
                        <g
                          id="Group_2134"
                          data-name="Group 2134"
                          transform="translate(0 0)"
                        >
                          <g
                            id="Group_2134-2"
                            data-name="Group 2134"
                            transform="translate(30 30) scale(1.3 1.3)"
                            clipPath="url(#clipPath3)"
                          >
                            <path
                              id="Path_2145"
                              data-name="Path 2145"
                              d="M56.162,23.869A28.315,28.315,0,0,0,43.406,5.728C37.46,1.981,29.957,0,21.708,0,5.886,0,.362,9.793.135,10.21a1.085,1.085,0,0,0-.12.7A12.447,12.447,0,0,0,1.4,14.55L7.267,29.06a1.211,1.211,0,0,0,1.128.735c.047,0,4.107.006,6.1,0l5.259,9.611V50.7a1.178,1.178,0,0,0,1.21,1.142h6.452a1.178,1.178,0,0,0,1.21-1.142V33.588a31.751,31.751,0,0,0,4.791-2.905,32.1,32.1,0,0,1,3.776-2.367,40.491,40.491,0,0,1,9.7-3.062l8.088-.006a1.237,1.237,0,0,0,.939-.424,1.094,1.094,0,0,0,.243-.955M26.2,49.562H22.171V39.13a1.094,1.094,0,0,0-.135-.524l-2.737-5a10.5,10.5,0,0,0,4.69,1.051,10.943,10.943,0,0,0,2.214-.243ZM36.061,26.3a34.445,34.445,0,0,0-4.075,2.543c-2.593,1.79-5.043,3.481-7.808,3.531-3.064.056-5.235-1.143-8-4.43a1.238,1.238,0,0,0-.947-.431h-.009c-1.058.006-4.413,0-5.988,0L6.215,20.054c3.518,2.659,9.309,5.17,18.646,5.194,3.413.006,13.159.009,13.559.009-.793.311-1.589.656-2.358,1.039M24.866,22.963c-8.373-.021-14.909-2.176-18.9-6.233a13.531,13.531,0,0,1-3.472-5.8C3.563,9.3,8.94,2.286,21.708,2.286c12.743,0,27.56,5.465,31.743,20.679-1.429,0-22.612.01-28.585,0"
                              transform="translate(0 -0.001)"
                              fill="#fff"
                            />
                            <path
                              id="Path_2146"
                              data-name="Path 2146"
                              d="M55.467,16.078c-4.882-3.076-11.146-4.7-18.116-4.7a1.144,1.144,0,1,0,0,2.285c6.49,0,12.291,1.493,16.773,4.318a20.341,20.341,0,0,1,4.818,4.183h-6.08a1.144,1.144,0,1,0,0,2.285l8.4,0a1.225,1.225,0,0,0,1.056-.586A1.087,1.087,0,0,0,62.29,22.7a22.227,22.227,0,0,0-6.824-6.623"
                              transform="translate(-15.643 -5.284)"
                              fill="#fff"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>

                  <h4 className="CoreIconLabels">Accessory cover</h4>
                  <p className="font-16 coreIconText">
                    If your bicycle is damaged or stolen, we provide cover for
                    accessories up £1,000 following a claim.
                  </p>
                </article>
              </div>
            </div>
            {/* second row */}
            <div className="row">
              <div className="col-6 col-md-12 col-xl-6">
                {" "}
                <article className="bikeBucket text-left mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="135"
                    height="135"
                    viewBox="0 0 135 135"
                    className="CoreIcon"
                  >
                    <defs>
                      <filter
                        id="Rectangle_748"
                        x="0"
                        y="0"
                        width="135"
                        height="135"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dy="2" in="SourceAlpha" />
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feFlood floodOpacity="0.2" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                    </defs>
                    <g
                      id="Group_1789"
                      data-name="Group 1789"
                      transform="translate(-401.5 -672.5)"
                    >
                      <g
                        transform="matrix(1, 0, 0, 1, 401.5, 672.5)"
                        filter="url(#Rectangle_748)"
                      >
                        <rect
                          id="Rectangle_748-2"
                          data-name="Rectangle 748"
                          width="126"
                          height="126"
                          rx="32"
                          transform="translate(4.5 2.5)"
                          fill="#00a8ff"
                        />
                      </g>
                    </g>
                    <path
                      id="Path_2097"
                      data-name="Path 2097"
                      d="M71.235,18.925c-.029-4.8-.057-9.608-.057-14.408a2.331,2.331,0,0,0-4.107-1.51C64.446,6.1,58.9,8.092,52.941,8.092c-8.02,0-13.7-3.37-15.161-6.7a2.331,2.331,0,0,0-4.268,0c-1.464,3.329-7.142,6.7-15.161,6.7-5.959,0-11.506-2-14.13-5.085A2.331,2.331,0,0,0,.114,4.516c0,4.8-.029,9.605-.057,14.408S0,28.543,0,33.347C0,52.338,13.3,69.894,34.719,79.163a2.333,2.333,0,0,0,1.851,0c21.417-9.27,34.721-26.825,34.721-45.817,0-4.8-.029-9.612-.057-14.422M35.645,74.477C16.5,65.864,4.662,50.18,4.662,33.347c0-4.794.028-9.594.057-14.394q.028-4.788.048-9.574a27.3,27.3,0,0,0,13.585,3.375c7.279,0,13.72-2.426,17.295-6.286,3.575,3.861,10.016,6.286,17.3,6.286A27.3,27.3,0,0,0,66.525,9.378q.015,4.786.048,9.574c.028,4.8.057,9.6.057,14.394,0,16.833-11.844,32.517-30.985,41.13"
                      transform="translate(31 24.823)"
                      fill="#fff"
                    />
                    <path
                      id="Path_2098"
                      data-name="Path 2098"
                      d="M57.167,44.719H24.834a1.157,1.157,0,0,0-1.158,1.157V62.739A1.158,1.158,0,0,0,24.834,63.9H57.167a1.158,1.158,0,0,0,1.158-1.158V45.876a1.157,1.157,0,0,0-1.158-1.157M25.991,47.033h3.533a3.9,3.9,0,0,1-3.533,3.47Zm0,14.549v-3.47a3.9,3.9,0,0,1,3.533,3.47Zm30.019,0H52.477a3.9,3.9,0,0,1,3.533-3.47Zm0-5.8a6.231,6.231,0,0,0-5.868,5.8H31.858a6.23,6.23,0,0,0-5.867-5.8V52.834a6.231,6.231,0,0,0,5.867-5.8H50.142a6.232,6.232,0,0,0,5.868,5.8Zm0-5.279a3.9,3.9,0,0,1-3.533-3.47H56.01Z"
                      transform="translate(23.219 12.848)"
                      fill="#fff"
                    />
                    <path
                      id="Path_2099"
                      data-name="Path 2099"
                      d="M44.533,48.942c-2.768,0-5.021,2.83-5.021,6.308s2.252,6.308,5.021,6.308,5.02-2.83,5.02-6.308-2.252-6.308-5.02-6.308m0,10.3c-1.467,0-2.706-1.829-2.706-3.993s1.239-3.994,2.706-3.994,2.706,1.829,2.706,3.994S46,59.243,44.533,59.243"
                      transform="translate(18.687 11.906)"
                      fill="#fff"
                    />
                    <path
                      id="Path_2100"
                      data-name="Path 2100"
                      d="M41.617,38.5c1.05-.8,2.942-.176,4.13,1.375a4.8,4.8,0,0,1,.865,1.8h2.121a6.7,6.7,0,0,0-1.328-3.067c-1.91-2.492-5.076-3.283-7.058-1.763a4.522,4.522,0,0,0-1.336,4.829H41.2a2.709,2.709,0,0,1,.413-3.172"
                      transform="translate(19.841 14.776)"
                      fill="#fff"
                    />
                    <path
                      id="Path_2101"
                      data-name="Path 2101"
                      d="M30.5,38.108,43.6,28.073a5.623,5.623,0,0,0,7.387.935L52.6,31.119a5.622,5.622,0,0,0-1.019,7.375l-.155.119h3.433L57.883,36.3a1.045,1.045,0,0,0,.193-1.465L48.821,22.755a1.044,1.044,0,0,0-1.464-.194L26.408,38.613H30.8a5.635,5.635,0,0,0-.3-.505m23.38-5.32,1.9,2.485-2.531,1.939a3.516,3.516,0,0,1,.626-4.424M47.8,24.853l1.9,2.485a3.518,3.518,0,0,1-4.435-.546Z"
                      transform="translate(22.609 17.838)"
                      fill="#fff"
                    />
                  </svg>

                  <h4 className="CoreIconLabels">Public liability</h4>
                  <p className="font-16 coreIconText coreiconSecondRow">
                    We will cover you up to £500,000 if you become liable for
                    any injury or damage which arises from the use of your
                    bicycle.
                  </p>
                </article>
              </div>
              <div className="col-6 col-md-12 col-xl-6">
                <article className="bikeBucket text-left mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="135"
                    height="135"
                    viewBox="0 0 135 135"
                    className="CoreIcon"
                  >
                    <defs>
                      <filter
                        id="Rectangle_748"
                        x="0"
                        y="0"
                        width="135"
                        height="135"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dy="2" in="SourceAlpha" />
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feFlood floodOpacity="0.2" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                      <clipPath id="clipPath888">
                        <rect
                          id="Rectangle_794"
                          data-name="Rectangle 794"
                          width="73.639"
                          height="77.12"
                          fill="#fff"
                        />
                      </clipPath>
                    </defs>
                    <g
                      id="Group_1808"
                      data-name="Group 1808"
                      transform="translate(-401.5 -727.5)"
                    >
                      <g
                        id="Group_1795"
                        data-name="Group 1795"
                        transform="translate(0 55)"
                      >
                        <g id="Group_1789" data-name="Group 1789">
                          <g
                            transform="matrix(1, 0, 0, 1, 401.5, 672.5)"
                            filter="url(#Rectangle_748)"
                          >
                            <rect
                              id="Rectangle_748-2"
                              data-name="Rectangle 748"
                              width="126"
                              height="126"
                              rx="32"
                              transform="translate(4.5 2.5)"
                              fill="#00a8ff"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                    <g
                      id="Group_2185"
                      data-name="Group 2185"
                      transform="translate(30.681 26.94)"
                    >
                      <g
                        id="Group_1759"
                        data-name="Group 1759"
                        transform="translate(0 0)"
                        clipPath="url(#clipPath888)"
                      >
                        <path
                          id="Path_2082"
                          data-name="Path 2082"
                          d="M10.851,23.262H66.528a1.748,1.748,0,0,0,0-3.5H59.856L56.711,9.85C55.016,4.507,53.35,1.739,51.141.6S46.782.16,44.49.9a18.318,18.318,0,0,1-5.8,1.149A18.331,18.331,0,0,1,32.883.9C30.594.16,28.431-.536,26.236.6S22.363,4.507,20.667,9.85l-3.145,9.915H10.851a1.748,1.748,0,0,0,0,3.5m10.34-3.5L24,10.909c1.332-4.2,2.588-6.555,3.839-7.2.9-.465,2.187-.053,3.975.522a21.511,21.511,0,0,0,6.874,1.317,21.533,21.533,0,0,0,6.889-1.322c1.773-.57,3.056-.984,3.96-.516,1.252.647,2.508,3,3.84,7.2l2.809,8.856Z"
                          transform="translate(-1.87 0)"
                          fill="#fff"
                        />
                        <path
                          id="Path_2083"
                          data-name="Path 2083"
                          d="M24.594,34.131a1.75,1.75,0,0,0-1.749,1.749A9.058,9.058,0,0,0,40.79,37.629h1.444A9.058,9.058,0,0,0,60.18,35.88a1.75,1.75,0,0,0-1.748-1.749Zm31.807,3.5a5.56,5.56,0,0,1-10.556,0Zm-19.221,0a5.56,5.56,0,0,1-10.555,0Z"
                          transform="translate(-4.693 -7.011)"
                          fill="#fff"
                        />
                        <path
                          id="Path_2084"
                          data-name="Path 2084"
                          d="M73.513,69.833a1.733,1.733,0,0,0-.933-.958l-16.748-7.2,2.542-8.061a1.748,1.748,0,0,0-1.668-2.273H16.931a1.748,1.748,0,0,0-1.668,2.274l2.543,8.06-16.747,7.2A1.749,1.749,0,0,0,1.11,72.11a1.719,1.719,0,0,0,1.331-.022l18.2-7.83a1.742,1.742,0,0,0,.976-2.13l-2.3-7.293H35.07V85.917a1.749,1.749,0,1,0,3.5,0V54.835H54.321l-2.3,7.293A1.743,1.743,0,0,0,53,64.259l18.2,7.827a1.789,1.789,0,0,0,2.3-.914,1.738,1.738,0,0,0,.017-1.339"
                          transform="translate(0 -10.546)"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="CoreIconLabels">Theft</h4>
                  <p className="font-16 coreIconText coreiconSecondRow">
                    Should your bicycle be stolen at home or away from home, you
                    will be covered for the full value specified in your policy.
                  </p>
                </article>
              </div>
            </div>
            <p className="font-14 mb-5 coreExtraPadding">
              <span className="infoIconBlue">{infoIcon} </span> All elements of
              our Core policy can be{" "}
              <span className="blueFont">
                <HashLink
                  scroll={(el) =>
                    el.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  to="/OurCoverLevels#CorePerformanceComparisonTable"
                >
                  found here
                </HashLink>
              </span>
              .
            </p>
            <CTAButton
              align="left"
              colour="green"
              CTAText="Get a quote"
              onClick={() => {
                sessionStorage.removeItem("context");
              }}
              Url={`/get-a-quote${search}`}
            />
          </div>
          {/* hide this version for MD and above */}
          <div className="col-12 d-block d-md-none">
            <div className="row">
              <div className="col-2">
                <article className="bikeBucket">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="135"
                    height="135"
                    viewBox="0 0 135 135"
                    className="CoreIcon"
                  >
                    <defs>
                      <filter
                        id="Rectangle_748"
                        x="0"
                        y="0"
                        width="135"
                        height="135"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dy="2" in="SourceAlpha" />
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feFlood floodOpacity="0.2" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                      <clipPath id="clipPath99">
                        <rect
                          id="Rectangle_980"
                          data-name="Rectangle 980"
                          width="98.496"
                          height="55.209"
                          fill="#fff"
                        />
                      </clipPath>
                    </defs>
                    <g
                      id="Group_1808"
                      data-name="Group 1808"
                      transform="translate(-401.5 -727.5)"
                    >
                      <g
                        id="Group_1795"
                        data-name="Group 1795"
                        transform="translate(0 55)"
                      >
                        <g id="Group_1789" data-name="Group 1789">
                          <g
                            transform="matrix(1, 0, 0, 1, 401.5, 672.5)"
                            filter="url(#Rectangle_748)"
                          >
                            <rect
                              id="Rectangle_748-2"
                              data-name="Rectangle 748"
                              width="126"
                              height="126"
                              rx="32"
                              transform="translate(4.5 2.5)"
                              fill="#00a8ff"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                    <g
                      id="Group_2184"
                      data-name="Group 2184"
                      transform="translate(18.252 37.895)"
                      clipPath="url(#clipPath99)"
                    >
                      <path
                        id="Path_2194"
                        data-name="Path 2194"
                        d="M98.492,40.619a21.108,21.108,0,0,0-17.8-19.738c-2.993-.472-5.1,1.286-6.8,2.7-.25.208-.494.413-.739.607L67.1,7.165,76.2,8.6a1.812,1.812,0,1,1-.565,3.58l-1.94-.306a1.873,1.873,0,0,0-.583,3.7l1.941.306A5.558,5.558,0,1,0,76.777,4.9L64.643,2.988a1.871,1.871,0,0,0-2.069,2.438l2.713,7.858-.168-.013-23.506-3.7c-.071-.214-1.344-4.113-1.523-4.663l2.6.41A1.884,1.884,0,1,0,43.279,1.6L33.293.023a1.884,1.884,0,0,0-.586,3.722l3.206.5,2.15,6.581c-.15.167-4.269,4.775-4.5,5.037A21,21,0,1,0,41.4,37.842l5.615.884a3.545,3.545,0,0,0,3.123-.546l.019-.014c16.053-19.295,16.067-19.22,16.746-20.037.071.214,1.3,3.637,2.814,7.842a34.355,34.355,0,0,0-7.77,3.852,12.655,12.655,0,0,0-5.391,8.626c-.418,2.653.919,5.405,2.1,7.832A22.846,22.846,0,0,1,59.849,49a6.619,6.619,0,0,0,2.581,3.914,6.776,6.776,0,0,0,3.42.842,10.35,10.35,0,0,1,3.99.855,3.807,3.807,0,0,0,3.1-.214,17.76,17.76,0,0,0,2.1-1.214,11.213,11.213,0,0,1,1.9-1.064,5.238,5.238,0,0,1,1.986,1.209,9.819,9.819,0,0,0,2.013,1.367,4.548,4.548,0,0,0,3.217.289,6.383,6.383,0,0,1,2.846.029c1.638.262,3.882.621,5.986-1.566A8.75,8.75,0,0,0,95.11,50.26a10.455,10.455,0,0,0,.466-2.983,25.287,25.287,0,0,1,.239-2.522,7.146,7.146,0,0,1,.721-.7A4.518,4.518,0,0,0,98.5,40.784c0-.054,0-.11,0-.165M30.526,47.11A17.247,17.247,0,1,1,23.7,15.684a17.022,17.022,0,0,1,7.334,3.007L19.616,31.47a1.884,1.884,0,0,0,1.11,3.116l16.936,2.667a17.208,17.208,0,0,1-7.136,9.856m7.721-13.577L24.728,31.4l9.113-10.2a17.268,17.268,0,0,1,3.393,5.65,17.033,17.033,0,0,1,1.013,6.677m3.742.588a20.756,20.756,0,0,0-1.215-8.558,21.034,21.034,0,0,0-4.409-7.182l3.049-3.411,6.451,19.761Zm7.394-.754c-.221-.678-6.258-19.166-6.457-19.777l20.229,3.185L49.383,33.367M93.917,41.1a5.079,5.079,0,0,0-1.986,2.915,28.961,28.961,0,0,0-.3,3.035,7.223,7.223,0,0,1-.25,1.9,4.878,4.878,0,0,1-1.236,1.753c-.619.644-.976.651-2.517.4a10.015,10.015,0,0,0-4.516.063c-.354.1-.638-.057-1.7-.915A8.237,8.237,0,0,0,77.449,48.2c-1.547-.243-3.061.723-4.525,1.658a13.438,13.438,0,0,1-1.778,1.021,14.353,14.353,0,0,0-5.057-1.061,4.311,4.311,0,0,1-1.552-.24c-.169-.107-.516-.48-.926-1.77a25.175,25.175,0,0,0-1.4-3.249c-.839-1.728-1.78-3.664-1.78-5.076a2.67,2.67,0,0,1,.031-.418,8.783,8.783,0,0,1,3.807-6.042,30.428,30.428,0,0,1,6.792-3.333C73.294,35.9,75.6,42.3,75.6,42.3a1.875,1.875,0,0,0,1.526,1.233,1.9,1.9,0,0,0,.881-.094,1.882,1.882,0,0,0,1.139-2.408l-4.61-12.956c.685-.462,1.3-.979,1.883-1.459,1.554-1.294,2.49-2.017,3.66-1.833a17.139,17.139,0,0,1,14.45,15.749c-.153.166-.419.4-.612.574"
                        transform="translate(0 0)"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                </article>
              </div>
              <div className="col-4">
                <p className="lufga-medium font-15 mt-5 prExtraSmall">
                  Accidental damage
                </p>
              </div>
              <div className="col-2">
                <article className="bikeBucket">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="135"
                    height="135"
                    viewBox="0 0 135 135"
                    className="CoreIcon"
                  >
                    <defs>
                      <filter
                        id="Rectangle_748"
                        x="0"
                        y="0"
                        width="135"
                        height="135"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dy="2" in="SourceAlpha" />
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feFlood floodOpacity="0.2" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                    </defs>
                    <g
                      id="Group_1789"
                      data-name="Group 1789"
                      transform="translate(-401.5 -672.5)"
                    >
                      <g
                        transform="matrix(1, 0, 0, 1, 401.5, 672.5)"
                        filter="url(#Rectangle_748)"
                      >
                        <rect
                          id="Rectangle_748-2"
                          data-name="Rectangle 748"
                          width="126"
                          height="126"
                          rx="32"
                          transform="translate(4.5 2.5)"
                          fill="#00a8ff"
                        />
                        <g
                          id="Group_2134"
                          data-name="Group 2134"
                          transform="translate(0 0)"
                        >
                          <g
                            id="Group_2134-2"
                            data-name="Group 2134"
                            transform="translate(30 30) scale(1.3 1.3)"
                            clipPath="url(#clipPath3)"
                          >
                            <path
                              id="Path_2145"
                              data-name="Path 2145"
                              d="M56.162,23.869A28.315,28.315,0,0,0,43.406,5.728C37.46,1.981,29.957,0,21.708,0,5.886,0,.362,9.793.135,10.21a1.085,1.085,0,0,0-.12.7A12.447,12.447,0,0,0,1.4,14.55L7.267,29.06a1.211,1.211,0,0,0,1.128.735c.047,0,4.107.006,6.1,0l5.259,9.611V50.7a1.178,1.178,0,0,0,1.21,1.142h6.452a1.178,1.178,0,0,0,1.21-1.142V33.588a31.751,31.751,0,0,0,4.791-2.905,32.1,32.1,0,0,1,3.776-2.367,40.491,40.491,0,0,1,9.7-3.062l8.088-.006a1.237,1.237,0,0,0,.939-.424,1.094,1.094,0,0,0,.243-.955M26.2,49.562H22.171V39.13a1.094,1.094,0,0,0-.135-.524l-2.737-5a10.5,10.5,0,0,0,4.69,1.051,10.943,10.943,0,0,0,2.214-.243ZM36.061,26.3a34.445,34.445,0,0,0-4.075,2.543c-2.593,1.79-5.043,3.481-7.808,3.531-3.064.056-5.235-1.143-8-4.43a1.238,1.238,0,0,0-.947-.431h-.009c-1.058.006-4.413,0-5.988,0L6.215,20.054c3.518,2.659,9.309,5.17,18.646,5.194,3.413.006,13.159.009,13.559.009-.793.311-1.589.656-2.358,1.039M24.866,22.963c-8.373-.021-14.909-2.176-18.9-6.233a13.531,13.531,0,0,1-3.472-5.8C3.563,9.3,8.94,2.286,21.708,2.286c12.743,0,27.56,5.465,31.743,20.679-1.429,0-22.612.01-28.585,0"
                              transform="translate(0 -0.001)"
                              fill="#fff"
                            />
                            <path
                              id="Path_2146"
                              data-name="Path 2146"
                              d="M55.467,16.078c-4.882-3.076-11.146-4.7-18.116-4.7a1.144,1.144,0,1,0,0,2.285c6.49,0,12.291,1.493,16.773,4.318a20.341,20.341,0,0,1,4.818,4.183h-6.08a1.144,1.144,0,1,0,0,2.285l8.4,0a1.225,1.225,0,0,0,1.056-.586A1.087,1.087,0,0,0,62.29,22.7a22.227,22.227,0,0,0-6.824-6.623"
                              transform="translate(-15.643 -5.284)"
                              fill="#fff"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </article>
              </div>
              <div className="col-4">
                <p className="lufga-medium font-15 mt-5 prExtraSmall">
                  Accessory cover
                </p>
              </div>

              <div className="col-2">
                <article className="bikeBucket">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="135"
                    height="135"
                    viewBox="0 0 135 135"
                    className="CoreIcon"
                  >
                    <defs>
                      <filter
                        id="Rectangle_748"
                        x="0"
                        y="0"
                        width="135"
                        height="135"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dy="2" in="SourceAlpha" />
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feFlood floodOpacity="0.2" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                    </defs>
                    <g
                      id="Group_1789"
                      data-name="Group 1789"
                      transform="translate(-401.5 -672.5)"
                    >
                      <g
                        transform="matrix(1, 0, 0, 1, 401.5, 672.5)"
                        filter="url(#Rectangle_748)"
                      >
                        <rect
                          id="Rectangle_748-2"
                          data-name="Rectangle 748"
                          width="126"
                          height="126"
                          rx="32"
                          transform="translate(4.5 2.5)"
                          fill="#00a8ff"
                        />
                      </g>
                    </g>
                    <path
                      id="Path_2097"
                      data-name="Path 2097"
                      d="M71.235,18.925c-.029-4.8-.057-9.608-.057-14.408a2.331,2.331,0,0,0-4.107-1.51C64.446,6.1,58.9,8.092,52.941,8.092c-8.02,0-13.7-3.37-15.161-6.7a2.331,2.331,0,0,0-4.268,0c-1.464,3.329-7.142,6.7-15.161,6.7-5.959,0-11.506-2-14.13-5.085A2.331,2.331,0,0,0,.114,4.516c0,4.8-.029,9.605-.057,14.408S0,28.543,0,33.347C0,52.338,13.3,69.894,34.719,79.163a2.333,2.333,0,0,0,1.851,0c21.417-9.27,34.721-26.825,34.721-45.817,0-4.8-.029-9.612-.057-14.422M35.645,74.477C16.5,65.864,4.662,50.18,4.662,33.347c0-4.794.028-9.594.057-14.394q.028-4.788.048-9.574a27.3,27.3,0,0,0,13.585,3.375c7.279,0,13.72-2.426,17.295-6.286,3.575,3.861,10.016,6.286,17.3,6.286A27.3,27.3,0,0,0,66.525,9.378q.015,4.786.048,9.574c.028,4.8.057,9.6.057,14.394,0,16.833-11.844,32.517-30.985,41.13"
                      transform="translate(31 24.823)"
                      fill="#fff"
                    />
                    <path
                      id="Path_2098"
                      data-name="Path 2098"
                      d="M57.167,44.719H24.834a1.157,1.157,0,0,0-1.158,1.157V62.739A1.158,1.158,0,0,0,24.834,63.9H57.167a1.158,1.158,0,0,0,1.158-1.158V45.876a1.157,1.157,0,0,0-1.158-1.157M25.991,47.033h3.533a3.9,3.9,0,0,1-3.533,3.47Zm0,14.549v-3.47a3.9,3.9,0,0,1,3.533,3.47Zm30.019,0H52.477a3.9,3.9,0,0,1,3.533-3.47Zm0-5.8a6.231,6.231,0,0,0-5.868,5.8H31.858a6.23,6.23,0,0,0-5.867-5.8V52.834a6.231,6.231,0,0,0,5.867-5.8H50.142a6.232,6.232,0,0,0,5.868,5.8Zm0-5.279a3.9,3.9,0,0,1-3.533-3.47H56.01Z"
                      transform="translate(23.219 12.848)"
                      fill="#fff"
                    />
                    <path
                      id="Path_2099"
                      data-name="Path 2099"
                      d="M44.533,48.942c-2.768,0-5.021,2.83-5.021,6.308s2.252,6.308,5.021,6.308,5.02-2.83,5.02-6.308-2.252-6.308-5.02-6.308m0,10.3c-1.467,0-2.706-1.829-2.706-3.993s1.239-3.994,2.706-3.994,2.706,1.829,2.706,3.994S46,59.243,44.533,59.243"
                      transform="translate(18.687 11.906)"
                      fill="#fff"
                    />
                    <path
                      id="Path_2100"
                      data-name="Path 2100"
                      d="M41.617,38.5c1.05-.8,2.942-.176,4.13,1.375a4.8,4.8,0,0,1,.865,1.8h2.121a6.7,6.7,0,0,0-1.328-3.067c-1.91-2.492-5.076-3.283-7.058-1.763a4.522,4.522,0,0,0-1.336,4.829H41.2a2.709,2.709,0,0,1,.413-3.172"
                      transform="translate(19.841 14.776)"
                      fill="#fff"
                    />
                    <path
                      id="Path_2101"
                      data-name="Path 2101"
                      d="M30.5,38.108,43.6,28.073a5.623,5.623,0,0,0,7.387.935L52.6,31.119a5.622,5.622,0,0,0-1.019,7.375l-.155.119h3.433L57.883,36.3a1.045,1.045,0,0,0,.193-1.465L48.821,22.755a1.044,1.044,0,0,0-1.464-.194L26.408,38.613H30.8a5.635,5.635,0,0,0-.3-.505m23.38-5.32,1.9,2.485-2.531,1.939a3.516,3.516,0,0,1,.626-4.424M47.8,24.853l1.9,2.485a3.518,3.518,0,0,1-4.435-.546Z"
                      transform="translate(22.609 17.838)"
                      fill="#fff"
                    />
                  </svg>
                </article>
              </div>
              <div className="col-4">
                {" "}
                <p className="lufga-medium font-15 mt-5 prExtraSmall">
                  Public liability
                </p>{" "}
              </div>
              <div className="col-2">
                <article className="bikeBucket">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="135"
                    height="135"
                    viewBox="0 0 135 135"
                    className="CoreIcon"
                  >
                    <defs>
                      <filter
                        id="Rectangle_748"
                        x="0"
                        y="0"
                        width="135"
                        height="135"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dy="2" in="SourceAlpha" />
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feFlood floodOpacity="0.2" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                      <clipPath id="clipPath777">
                        <rect
                          id="Rectangle_794"
                          data-name="Rectangle 794"
                          width="73.639"
                          height="77.12"
                          fill="#fff"
                        />
                      </clipPath>
                    </defs>
                    <g
                      id="Group_1808"
                      data-name="Group 1808"
                      transform="translate(-401.5 -727.5)"
                    >
                      <g
                        id="Group_1795"
                        data-name="Group 1795"
                        transform="translate(0 55)"
                      >
                        <g id="Group_1789" data-name="Group 1789">
                          <g
                            transform="matrix(1, 0, 0, 1, 401.5, 672.5)"
                            filter="url(#Rectangle_748)"
                          >
                            <rect
                              id="Rectangle_748-2"
                              data-name="Rectangle 748"
                              width="126"
                              height="126"
                              rx="32"
                              transform="translate(4.5 2.5)"
                              fill="#00a8ff"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                    <g
                      id="Group_2185"
                      data-name="Group 2185"
                      transform="translate(30.681 26.94)"
                    >
                      <g
                        id="Group_1759"
                        data-name="Group 1759"
                        transform="translate(0 0)"
                        clipPath="url(#clipPath777)"
                      >
                        <path
                          id="Path_2082"
                          data-name="Path 2082"
                          d="M10.851,23.262H66.528a1.748,1.748,0,0,0,0-3.5H59.856L56.711,9.85C55.016,4.507,53.35,1.739,51.141.6S46.782.16,44.49.9a18.318,18.318,0,0,1-5.8,1.149A18.331,18.331,0,0,1,32.883.9C30.594.16,28.431-.536,26.236.6S22.363,4.507,20.667,9.85l-3.145,9.915H10.851a1.748,1.748,0,0,0,0,3.5m10.34-3.5L24,10.909c1.332-4.2,2.588-6.555,3.839-7.2.9-.465,2.187-.053,3.975.522a21.511,21.511,0,0,0,6.874,1.317,21.533,21.533,0,0,0,6.889-1.322c1.773-.57,3.056-.984,3.96-.516,1.252.647,2.508,3,3.84,7.2l2.809,8.856Z"
                          transform="translate(-1.87 0)"
                          fill="#fff"
                        />
                        <path
                          id="Path_2083"
                          data-name="Path 2083"
                          d="M24.594,34.131a1.75,1.75,0,0,0-1.749,1.749A9.058,9.058,0,0,0,40.79,37.629h1.444A9.058,9.058,0,0,0,60.18,35.88a1.75,1.75,0,0,0-1.748-1.749Zm31.807,3.5a5.56,5.56,0,0,1-10.556,0Zm-19.221,0a5.56,5.56,0,0,1-10.555,0Z"
                          transform="translate(-4.693 -7.011)"
                          fill="#fff"
                        />
                        <path
                          id="Path_2084"
                          data-name="Path 2084"
                          d="M73.513,69.833a1.733,1.733,0,0,0-.933-.958l-16.748-7.2,2.542-8.061a1.748,1.748,0,0,0-1.668-2.273H16.931a1.748,1.748,0,0,0-1.668,2.274l2.543,8.06-16.747,7.2A1.749,1.749,0,0,0,1.11,72.11a1.719,1.719,0,0,0,1.331-.022l18.2-7.83a1.742,1.742,0,0,0,.976-2.13l-2.3-7.293H35.07V85.917a1.749,1.749,0,1,0,3.5,0V54.835H54.321l-2.3,7.293A1.743,1.743,0,0,0,53,64.259l18.2,7.827a1.789,1.789,0,0,0,2.3-.914,1.738,1.738,0,0,0,.017-1.339"
                          transform="translate(0 -10.546)"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </svg>
                </article>
              </div>
              <div className="col-4">
                {" "}
                <p className="lufga-medium font-15 mt-5 prExtraSmall">
                  Theft
                </p>{" "}
              </div>
            </div>
            <p className="font-14 mb-4 coreExtraPadding">
              <span className="infoIconBlue">{infoIcon} </span> All elements of
              our Core policy can be{" "}
              <span className="blueFont">
                <HashLink
                  scroll={(el) =>
                    el.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  to="/OurCoverLevels#CorePerformanceComparisonTable"
                >
                  found here
                </HashLink>
              </span>
              .
            </p>
            <CTAButton
              align="left"
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
  );
};

export default VelosureCore;
