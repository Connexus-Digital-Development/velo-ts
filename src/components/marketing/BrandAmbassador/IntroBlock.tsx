import CTAButton from "@/components/shared/CTAButton";
import { useLocation } from "react-router-dom";

const IntroBlock = () => {
  const { search } = useLocation();
  return (
    <div className="container-fluid oh pr whiteBG">
      <div className="container">
        <div className="row mt-5">
          <div id="left" className="col-12 col-sm-6">
            <h1 className="text-left pt-4 pb-4 pr-5 lh-5 ">
              Trusted
              <span className="blueFont"> by the best</span>
            </h1>
            <p className="blueFont pr-5 ">
              With Velosure's in-depth cover providing a high-level of
              protection on the road and during events, it made a perfect fit
              for Olympic Gold Medalist, Jonny Brownlee, MBE.
            </p>

            <div className="d-block d-sm-none">
              <img
                src="/static/media/Brownlee-Right-Side.c417b1ffee7752f28c26.png"
                className="jonnyMobile"
                alt="Jonny Brownlee"
              />
            </div>

            <img
              src="/static/media/Brownlee-Right-Side.c417b1ffee7752f28c26.png"
              className="jonnyIntroBlock d-none d-sm-block"
              alt="Jonny Brownlee"
            />
          </div>

          <div className="col-12 d-block d-sm-none"></div>

          <div
            id="right"
            className="col-12 col-sm-6 pt-4 mb-3 center-on-mobile"
          >
            <p className="pr-5 center-on-mobile"></p>

            <p className="pr-5 center-on-mobile">
              Jonny Brownlee is a British professional duathlete and triathlete.
              He is a six-time world champion and has also won Gold at the
              Olympics at Tokyo 2020.
            </p>
            <p className="pr-5 center-on-mobile">
              You may recognise Jonny from that iconic moment at the London 2012
              Olympics where Jonny and his brother Alister both crossed the
              finish line together, both winning medals for their efforts.{" "}
            </p>
            <p className="pr-5 center-on-mobile">
              Cycling is one of Jonny’s preferred elements of a triathlon and
              when he’s not travelling around the world competing, he can be
              found in the Yorkshire dales on his bicycle training.
            </p>

            <h2 className=" mt-5 center-on-mobile">
              Why get covered if you’re competing?
            </h2>
            <p className="pr-5 center-on-mobile">
              If you’re competing, getting the right insurance cover makes
              sense. With Velosure's policy you are protected for all elements
              during an event as well as everything else cycling throws at you.
            </p>
            <p className="pr-5 center-on-mobile">
              During events you are covered for any accidents that may happen,
              and if you are liable for damages during an event, public
              liability is included in your policy. If you’re competing in
              triathlons, the transition area can be where a race is won or
              lost. With Velosure, you can leave your bicycle in the transition
              area, unlocked, and it will be fully covered under our policy,
              meaning you can stay focused on the race.
            </p>
            <p className="pr-5 center-on-mobile">
              Most people competing will often be training as well, meaning the
              risks of the public roads come into play. You are protected for
              this and we include elements such as 24/7 cycle rescue, road rage
              cover, accessory cover, personal accident and much more!{" "}
            </p>
            <CTAButton
              align="left"
              colour="blue"
              CTAText="Get a quote"
              onClick={() => {
                sessionStorage.removeItem("context");
              }}
              Url={`/get-a-quote${search}`}
            />
          </div>
        </div>
      </div>
      <img src="" className="introBlocKBike d-none d-sm-block" alt="" />
    </div>
  );
};

export default IntroBlock;
