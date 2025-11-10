import eBike2 from "@/assets/images/e-bike-black2.jpg";
import CTAButton from "@/components/shared/CTAButton";
import { useLocation } from "react-router-dom";
const BenefitsOfEBike = () => {
  const { search } = useLocation();
  return (
    <div className="container-fluid whiteBG oh pr">
      <div className="container">
        <div className="row">
          <div id="left" className="col-12 col-md-5   pt-3">
            <h3 className="text-left pt-4 pb-4">
              <span className="greenFont">Benefits</span> of an electric
              bicycle.
            </h3>
            <p className="greenFont">
              Electric bikes, or e-bikes as they're commonly known, are becoming
              increasingly popular throughout the UK and it seems this growth
              will only continue in the coming year.
            </p>

            <p className="greenFont">
              {/* In fact, research by Mintel highlights that 5% of adults and 14%
              of cyclists in the UK say they’re “likely” to buy an e-bike for
              sale over the next 12 months, which is around 2.78 million people. */}
              Overall, 7% of adults have used e-mobility modes over the past 12
              months; 5% have used an e-bike and 4% have used an e-scooter.
              Despite relatively low usage, some 43% of adults say they would be
              interested in test-riding an e-bike and 34% would be interested in
              test-riding an e-scooter
              <sup>
                {" "}
                *
                <a
                  className="superScript greenFont"
                  target="_blank"
                  href="https://www.mintel.com/press-centre/mintel-cost-of-living-puts-brakes-on-e-bike-growth-as-sales-slow-for-the-first-time-in-five-years"
                >
                  source
                </a>
              </sup>
              .
            </p>

            <div className="ebikeImageMobileOnly"></div>
            <img
              src={eBike2}
              className="typesOfBikeImgLEFTbigger d-none d-md-block"
              alt="Black E-bike"
            />
          </div>

          <div
            id="right"
            className="col-12 col-md-5 offset-md-1 mt-2 mt-md-5 center-on-mobile"
          >
            <p>
              E-bikes offer many benefits to cyclists; from cutting the commute
              time and reducing your carbon footprint, to saving money and
              improving your health and well-being no matter what your age or
              fitness level.
            </p>
            <p>
              Many of those who would not otherwise be able to cycle due to poor
              fitness or a physical disability can now do so with confidence
              knowing they have the electric motor ready to go when they need
              it.
            </p>
            <p>
              Similarly, those who wish to cycle in new and challenging terrain
              can now push themselves as much as they like, with the option to
              use that electric motor whenever they want or need that extra
              push.
            </p>
            <p>
              Accessible, versatile and fun for all ages, e-bikes are perfect
              for commuters, those wishing to build their fitness and
              thrill-seekers alike.
            </p>
            <h5 style={{ color: "black" }}>
              Do I need insurance for an e-bike?
            </h5>
            <p>
              Although e-bikes are cheaper than most cars, they can often cost
              thousands of pounds, with specialist pieces of kit such as
              batteries contributing to what can become quite an expensive
              investment.
            </p>
            <p>
              The more you spend on your e-bike, the more you stand to lose due
              to theft and damage. This is why it is essential to arrange an
              e-bike insurance policy that covers you where you need it most.
            </p>
            <p>
              With our e-bike cover, you’ll be covered against theft, aggravated
              theft, accidental damage and more, whether your e-bike is at home
              or away.
            </p>
            <p>
              Importantly, your battery is covered for damage or theft as
              standard and a replacement will be provided so you can get back on
              your e-bike as soon as possible. Insurance for e-bikes is an
              investment you will be glad you had made should you be unfortunate
              enough to experience theft or accidental damage.
            </p>

            <div className="row mt-5 mb-5">
              <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-5 col-sm-6 col-5">
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
              {/* <div className="col-xxl-6 col-xl-6 col-lg-7 col-md-6 col-sm-6 col-4 mb-3 negMargin">
                <CTAButtonHash
                  align="left"
                  colour="blue"
                  CTAText="Compare our cover"
                  onClick={() => {
                    sessionStorage.removeItem("context");
                  }}
                  Url={`/bike-insurance-comparison-chart#chart`}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsOfEBike;
