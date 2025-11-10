import coreGirlImg from "@/assets/images/CoreGirlNoAnklesblue.png";
import CoreBikeGirlMobile from "@/assets/images/CoreBikeGirlMobileBlue.jpg";
const HowItStarted = () => {
  return (
    <div className="container-fluid oh pr mb-5 mt-5 bgLightBlue">
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-12 col-lg-6">
            <h3>
              How it all
              <span className="blueFont"> started?</span>
            </h3>
            <p className="pr-5">
              As part of Lawshield, we have been in the insurance market for
              over 20 years, mainly offering commercial, motor and legal cover.
            </p>
            <p className="pr-5">
              When trying to insure our own bicycles, we noticed the distinct
              lack of standard-level cover on the market. Every element of cover
              we believed we needed tended not to be included as standard or not
              available at all. This often left us looking at a large premium
              once these options had been added.
            </p>

            <p className="pr-5">
              As a result, we created our own dedicated policy which includes
              all the essential elements of cover as standard. We even include
              elements which other insurers don’t offer but we believe are
              necessary, such as physio treatment and triage.
            </p>
            <p className="pr-5">
              11 years since inception, we’re still providing a product to
              cyclists that protects their bicycle and them as a rider, all at
              the best value for money.
            </p>
          </div>
          <div className="col-12 col-lg-6 coreGirlMargin">
            <img
              src={coreGirlImg}
              className="d-none d-md-block coreGirlImgBlue"
              alt=""
            />
            <img
              src={CoreBikeGirlMobile}
              alt="Girl with road bike"
              className="d-block d-md-none coreBikeGirlMobileBlue"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItStarted;
