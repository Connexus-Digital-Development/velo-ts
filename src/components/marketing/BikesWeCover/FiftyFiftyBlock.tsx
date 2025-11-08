interface Props {
  data: {
    href: string;
    backgroundCol: string;
    textAlign: string;
    imageURL: string;
    heading: string;
    paragragh1: string;
    paragragh2: string;
  };
}

const FiftyFiftyBlock = (props: Props) => {
  return (
    <div
      id={props.data.href}
      className={`container-fluid  oh pr ${props.data.backgroundCol}`}
    >
      <div className="container">
        {props.data.textAlign === "left" && (
          <div className="row mt-5 mb-5">
            <div className="d-none d-sm-block col-sm-6">
              <img
                src={props.data.imageURL}
                className="typesOfBikeImgLEFT  d-sm-block"
                alt="Bike in Bike list"
              />
            </div>
            <div className="col-12 col-sm-4">
              <h3>{props.data.heading}</h3>
              <p className="justify">{props.data.paragragh1}</p>
              <p className="justify">{props.data.paragragh2}</p>
            </div>
            {/* This block is only for mobile view so that image diaplays under the text */}
            <div className="col-12 d-sm-none">
              <img
                src={props.data.imageURL}
                className="typesOfBikeImgLEFT d-sm-block"
                alt="Bike in Bike list"
              />
            </div>
          </div>
        )}

        {props.data.textAlign === "right" && (
          <div className="row mt-5 mb-5">
            <div className="col-12 col-sm-4 offset-sm-2">
              <h3>{props.data.heading}</h3>
              <p className="justify">{props.data.paragragh1}</p>
              <p className="justify">{props.data.paragragh2}</p>
            </div>
            <div className="col-12 col-sm-6">
              <img
                src={props.data.imageURL}
                className="typesOfBikeImgRIGHT d-sm-block"
                alt=""
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiftyFiftyBlock;
