import leisureBike from "@/assets/images/leisureBike-w1200.jpg";
import CTAButton from "@/components/shared/CTAButton";
import { useLocation } from "react-router-dom";

const OurSingleBikeCover = () => {
  const { search } = useLocation();
  return (
    <div className="container-fluid whiteBG oh pr">
      <div className="container">
        <div className="row">
          <div id="left" className="col-12 col-md-5  pt-3">
            <h3 className="pt-4 pb-4 ">
              Our <span className="blueFont">single bike cover</span>, tailored
              to your needs.
            </h3>
            <p className="blueFont">
              With many of our team members being cyclists themselves, we like
              to think we're in a good position to understand what cyclists need
              and want; comprehensive protection at great value for money. And
              we have to say, we don't blame you!
            </p>
            {/* <div className="singleBikeImageContainer oh d-block d-md-none">
              <img
                src="/static/media/leisureBike-w1200.d01ed1d6ef6cafd61233.png"
                className="leisureBikeSingle"
                alt="Leisure bike"
              />
            </div> */}

            <div className="singleBikeImageMobileOnly"></div>

            <img
              src={leisureBike}
              className="singleBikeLeisure d-none d-md-block"
              alt="Leisure bike"
            />
          </div>

          <div
            id="right"
            className="col-12 col-md-5 offset-md-1 mt-2 mt-md-5 center-on-mobile"
          >
            <p>
              Our team understand all too well that cycling does come with
              risks, and care needs to be taken in order to enjoy the fun and
              freedom that comes with riding a bike. Whether you enjoy a
              mid-week commute to work or prefer a weekend adventure away from
              all the hustle and bustle, we get the addiction to cycling and we
              want to make sure you can enjoy yourself... free from worry.
            </p>
            <p>
              We've done the research and hard work to completely understand
              where cyclists come undone and require cycle insurance to avoid
              paying large sums of money... and then we've applied this cover as
              standard.
            </p>
            <p>
              We offer optional extras so you don't pay for what you don't want
              but have the option of a comprehensive policy.
            </p>
            <h4 className="mt-5">Do I need cycle insurance?</h4>
            <p>
              In order to be completely protected, is essential you have cycle
              insurance that covers you where you need it most.
            </p>
            <p>
              Although several forms of insurance such as home insurance provide
              some cycle cover, policies are usually insufficient for what the
              cyclist actually needs. For example, cyclists are not usually
              covered when taking their bicycle away from the home address. As
              you can imagine, this is a critical time to be covered by cycle
              insurance as theft and damage occurs predominantly in public.
            </p>
            <p>
              If you are looking for peace of mind that you and your cycle is
              protected around the clock, despite where you are in the UK, then
              cycle insurance is for you.
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
              {/* <div className="col-xxl-6 col-xl-6 col-lg-7 col-md-6 col-sm-6 col-4 negMargin">
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
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurSingleBikeCover;
