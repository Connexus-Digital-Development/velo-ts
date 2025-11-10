import AccessoryCoverIcon from "@/assets/svgs/accessory-cover-icon.svg?url";
import WorldwideCoverIcon from "@/assets/svgs/worldwide-cover-icon.svg?url";
import OrganisedRacesEventsIcon from "@/assets/svgs/organised-races-events-icon.svg?url";

const WhyJonnyChoseVelo = () => {
  return (
    <div className="container-fluid bg-lightblue pt-4 pb-5  pr oh">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="pt-4 pb-3">
              Why Jonny chose
              <span className="blueFont"> Velosure</span>.
            </h3>
          </div>
          <div className="col-12 col-sm-9">
            <p>
              “Whether you’re an elite athlete or an amateur cyclist, Velosure
              insurance delivers comprehensive cover for high value and multiple
              cycles, without an inflated price tag, giving you the peace of
              mind to focus on your riding. The elements of cover that appeal to
              me the most are…”
            </p>

            <div className="row">
              <div id="left" className="col-12 col-sm-6 mb-5">
                <div className="iconBlockBlueLeft centerIcons mb-3 mb-3">
                  <img src={AccessoryCoverIcon} alt="Accessory cover icon" />
                </div>

                <h4>
                  Accessory <br /> cover
                </h4>
                <p className="mb-5 ">
                  “Accessories are often expensive so it is great to have the
                  peace of mind I won’t be out of pocket if I have an accident.
                  It is great that Velosure cover specific triathlon accessories
                  such as wet suits, navigation, hydration system etc.”
                </p>

                <div className="iconBlockBlueLeft centerIcons mb-3">
                  <img src={OrganisedRacesEventsIcon} alt="Organised races & events icon" />
                </div>
                <h4>
                  Organised
                  <br />
                  races & events
                </h4>
                <p>
                  “As a professional athlete, the events cover is a no brainer
                  for me. During a triathlon, I can leave my bicycle in the
                  transition area and not worry about it as I know it will be
                  covered if anything happens such as theft or damage.”
                </p>
              </div>

              <div id="right" className="col-12 col-sm-6">
                <div className="iconBlockBlueLeft centerIcons mb-3 mb-3">
                  <img src={WorldwideCoverIcon} alt="Worldwide cover icon" />
                </div>
                <h4>
                  Worldwide <br />
                  cover
                </h4>
                <p className="pr-3">
                  “The worldwide cover is perfect for me with the travelling I
                  do to different events. Velosure also cover my cycle during
                  flights if it gets damaged or goes missing. I’ve had that
                  happen on a couple of occasions!”
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*  end row */}

        <div className="col-12 col-sm-6 d-block d-md-none oh pr">
          <img
            src="/static/media/Brownlee-Front-Full-Bike.91881c74eb6f366e37ae.png"
            className="whyJonnyChoseVeloImage"
            alt="why Jonny Chose Velo Image"
          />
        </div>
      </div>
      <img
        src="/static/media/Brownlee-Front-Full-Bike.91881c74eb6f366e37ae.png"
        className="whyJonnyChoseVeloImage d-none d-sm-block"
        alt=""
      />
    </div>
  );
};

export default WhyJonnyChoseVelo;
