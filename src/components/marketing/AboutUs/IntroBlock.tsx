import Bikers from "@/assets/images/tall-bike-man copy.png";

const IntroBlock = () => {
  //console.log(Bikers);
  return (
    <div className="container-fluid whiteBG  pr oh">
      <div className="container">
        <img
          src={Bikers}
          alt="biker image"
          className="bikeCoupleAboutUs d-none d-lg-block"
        />
        <div className="row ">
          <div id="left" className="col-12 col-lg-6"></div>
          <div id="right" className="col-12 col-lg-6 mt-5 mb-5">
            <h3>
              By cyclists,
              <span className="blueFont"> for cyclists</span>.
            </h3>
            <p className="pr-4">
              At Velosure many of us are cyclists and recognise the issues which
              we face every day – not enough secure roads, the risk of cycle
              accidents or cycle theft, and the challenges we face from other
              road users.
            </p>
            <p className="pr-4">
              We understand that you want an insurance policy that is there when
              you need it with a stress-free approach. It is for this reason
              that at Velosure we insist on dealing with your claim in-house via
              our specialist claims team. Unlike our competitors, we put you
              first when it comes to paying your claim, dealing with your
              accident, theft or vandalism. We will be there to manage your
              incident with professionalism, care and sympathy.
            </p>
            <p className="pr-4">
              At the heart of everything we do is to ensure that you purchase
              the cover that meets your needs fully and is the best value for
              money. We regularly check our competitors to ensure we live up to
              this promise.
              {/* You can see how we compare at a range of values via{" "}
              <span>
                <Link to="/bike-insurance-comparison-chart">our comparison chart</Link>{"."}
              </span> */}
            </p>
          </div>
        </div>
      </div>
      <img
        src={Bikers}
        alt="biker image"
        className="bikeCoupleAboutUs d-block d-lg-none"
      />
    </div>
  );
};

export default IntroBlock;
