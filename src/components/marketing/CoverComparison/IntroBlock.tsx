import Biker from "@/assets/images/biker-w1000.png";

const IntroBlock = () => {
  return (
    <div className="container-fluid whiteBG  pr oh">
      <img src={Biker} alt="biker" className="bikerImage d-none d-md-block" />
      <div className="container">
        <div className="row ">
          <div id="right" className="col-12  col-md-6 offset-md-6 mt-5 mb-5">
            <h3>
              Here at Velosure we're
              <br /> serious about{" "}
              <span className="blueFont">
                protecting
                <br /> cyclists
              </span>
              .
            </h3>
            <p className="pr-3">
              Our bicycle insurance has been designed to ensure our valued
              members get a fantastic deal at highly competitive prices,
              offering specialist cycle cover where it’s needed most.
            </p>
            <p className="pr-3">
              We have listened to the feedback of our customers and are able to
              offer greater cycle cover and a more competitive insurance quote
              for both single cycle and multi bicycle alike, with essential
              cover features such as Theft & Accidental Damage and Cycle Rescue
              coming as standard for all our policie
            </p>
            <p className="pr-3">
              We have created this helpful comparison chart of leading cycle
              insurance providers to enable you to make an in-depth comparison
              before purchase. Ours is one of the best on the market for depth
              of cover and price.
            </p>
          </div>
          <div className="bikeImageContainer2 col-12 d-block d-md-none">
            <img src={Biker} alt="biker" className="bikerImage" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroBlock;
