import DocumentData from "./DocumentData";

const DownloadDocuments = () => {
  const data = DocumentData().DocumentList;

  // JI. Removed as part of #90
  // const [expanded, setExpanded] = useState("");

  // const expand = (e, id) => {
  //   console.log({ id });
  //   e.preventDefault();
  //   if (expanded === id) {
  //     setExpanded("");
  //     return;
  //   }
  //   setExpanded(id);
  // };

  return (
    <div className="container-fluid lightblueBG">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12">
            <h3 className="text-left pt-4 pb-4">
              Download your
              <span className="blueFont">
                <br />
                insurance documents
              </span>
            </h3>
          </div>
          <div className="col-12 col-sm-12 col-md-12 pb-3">
            <div className="row" >
              {data.map((doc, index) => (
                <div
                  className="col-12 col-lg-6"
                  key={`doc-${index}-${doc.header}`}
                  id={doc.header}
                >
                  <div
                    className={`col-12 col-lg-12 px-sm-5 px-2 py-4 expandedStyle expandingBox`}
                    key={doc.header}
                    id={doc.header}
                    // onClick={(e) => {
                    //   expand(e, doc.id);
                    // }}
                  >
                    <div className="row mb-4">
                      <div className="col-4 col-sm-3  col-lg-3 oh">
                        <svg
                          id="Group_2199"
                          data-name="Group 2199"
                          width="79.115"
                          height="77"
                          viewBox="0 0 79.115 77"
                        >
                          <g
                            id="Group_2199-2"
                            data-name="Group 2199"
                            transform="translate(0 0)"
                          >
                            <path
                              id="Path_2197"
                              data-name="Path 2197"
                              d="M79.017,60.912a1.288,1.288,0,0,0-1.193-.8H72.671V45.949a1.292,1.292,0,0,0-1.291-1.29H64.943l.005-27.01a1.437,1.437,0,0,0-.253-.8,1.5,1.5,0,0,0-.148-.181L48.3.416A1.4,1.4,0,0,0,48,.192L47.924.151A1.381,1.381,0,0,0,47.56.026,1.445,1.445,0,0,0,47.295,0H16.924a5.915,5.915,0,0,0-5.908,5.908V24.754H3.844A3.849,3.849,0,0,0,0,28.6V46.089a3.85,3.85,0,0,0,3.844,3.846h7.172V62.484a5.915,5.915,0,0,0,5.908,5.908H54.377l8.232,8.23a1.291,1.291,0,0,0,1.826,0l14.3-14.3a1.287,1.287,0,0,0,.28-1.406M71.38,62.7h3.327L63.522,73.883,56.1,66.462a1.379,1.379,0,0,0-.314-.5l-3.134-3.134h3.016A1.424,1.424,0,0,0,57.091,61.4V47.372h6.43a1.38,1.38,0,0,0,.588-.132h5.981V61.4A1.292,1.292,0,0,0,71.38,62.7M49.013,28.6V46.089a1,1,0,0,1-1,1H3.844a1,1,0,0,1-1-1V28.6a1,1,0,0,1,1-1H48.016a1,1,0,0,1,1,1M13.863,49.936H48.017a3.849,3.849,0,0,0,3.844-3.846V28.6a3.849,3.849,0,0,0-3.844-3.844H13.863V5.908a3.065,3.065,0,0,1,3.062-3.062H45.871V14.91a4.166,4.166,0,0,0,4.162,4.161H62.1V44.526H55.668a1.424,1.424,0,0,0-1.423,1.423V59.982H49.216a1.423,1.423,0,0,0-1.006,2.429l3.134,3.134H16.924a3.065,3.065,0,0,1-3.062-3.061ZM48.718,14.91V4.859L60.084,16.225H50.033a1.316,1.316,0,0,1-1.315-1.315"
                              transform="translate(0 0)"
                              fill="#00a8ff"
                            />
                            <path
                              id="Path_2198"
                              data-name="Path 2198"
                              d="M12.674,56.04a1.736,1.736,0,1,0,0,3.464,1.735,1.735,0,1,0,0-3.464"
                              transform="translate(-2.902 -15.021)"
                              fill="#00a8ff"
                            />
                            <path
                              id="Path_2199"
                              data-name="Path 2199"
                              d="M23.155,42.578H20.564a1.713,1.713,0,0,0-1.741,1.635V54.366a1.6,1.6,0,0,0,3.2,0v-2.86h1.132c3,0,4.861-1.7,4.861-4.438,0-2.812-1.817-4.491-4.861-4.491m1.662,4.473c0,1.027-.512,1.485-1.662,1.485H22.023V45.548h1.132c1.149,0,1.662.464,1.662,1.5"
                              transform="translate(-5.045 -11.413)"
                              fill="#00a8ff"
                            />
                            <path
                              id="Path_2200"
                              data-name="Path 2200"
                              d="M37.488,42.554H35.5a1.714,1.714,0,0,0-1.741,1.635V54.1A1.714,1.714,0,0,0,35.5,55.731h1.992c5.166,0,5.724-3.6,5.724-5.143V47.555c0-1.5-.558-5-5.724-5m2.525,8.034a1.933,1.933,0,0,1-2.225,2.172h-.833V45.525h.833c1.477,0,2.225.683,2.225,2.03Z"
                              transform="translate(-9.047 -11.406)"
                              fill="#00a8ff"
                            />
                            <path
                              id="Path_2201"
                              data-name="Path 2201"
                              d="M55.765,45.525a1.518,1.518,0,0,0,1.6-1.459,1.579,1.579,0,0,0-1.6-1.512H50.988a1.718,1.718,0,0,0-1.724,1.618V54.4a1.6,1.6,0,0,0,3.2,0V50.619H55.43a1.524,1.524,0,0,0,1.582-1.495,1.552,1.552,0,0,0-1.582-1.476H52.463V45.525Z"
                              transform="translate(-13.205 -11.406)"
                              fill="#00a8ff"
                            />
                          </g>
                        </svg>
                      </div>
                      <div className="col-8 col-sm-9  col-lg-9">
                        <p>{doc.header}</p>
                      </div>
                    </div>

                    {/* {expanded === doc.id && ( */}
                    <div className="row ">
                      {doc.docs.map((innerDoc, innerIndex) => (
                        <div
                          className="row "
                          key={`inner-doc-${index}-${innerIndex}-${
                            innerDoc.key || innerDoc.title
                          }`}
                        >
                          {/* <hr className="mt-3" /> */}
                          <div className="col-sm-9 col-8">
                            <p>{innerDoc.title}</p>
                          </div>
                          <div className="col-sm-3 col-4">
                            <a
                              className="btn btn-primary zIndex"
                              href={innerDoc.url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* )} */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadDocuments;
