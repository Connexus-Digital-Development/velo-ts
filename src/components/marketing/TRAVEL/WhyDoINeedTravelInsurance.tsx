import CTAButton from "@/components/shared/CTAButton";
import BikeBox from "@/assets/images/bikeBox.png";

const WhyDoINeedTravelInsurance = () => {
  return (
    <div className="container-fluid whiteBG oh pr whyTI">
      <div className="container">
        <div className="row">
          <div id="left" className="col-12 col-lg-6  pt-3">
            <h3 className=" pt-4 pb-4 ">
              Why <span className="mustardFont">do I need cycle specific </span>
              travel insurance?
            </h3>
            <p className="mustardFont ">
              Have you already taken out travel insurance? Are you still
              deciding on the best option for you and your family?
            </p>
            <div className="bikeBoxImageContainer">
              <img
                src={BikeBox}
                className="bikeBox  d-none d-lg-block"
                alt="Bike storage box for travel"
              />
            </div>
          </div>

          <div
            id="right"
            className="col-12 col-lg-6 pt-sm-5 pb-lg-5 center-on-mobile"
          >
            <h4 className="">Why do I need a specialised cover?</h4>
            <p>
              Although you’ll need to have your cycle insured separately to
              maintain full cover whilst you’re in Europe, some travel insurers
              will refuse claims for medical expenses if you do not declare that
              you will be undertaking cycling activity.
            </p>
            <p>
              If cycling is incidental to the trip, please request ‘Hazardous
              Activite B’.{" "}
              <strong>
                Please note that if the reason for the trip is solely to
                undertake cycling pursuits, please contact the office on{" "}
                <a href="tel:08000833035">0800 0833 035</a> so we may refer this
                to the underwriters.
              </strong>
            </p>

            <p>
              Velosure Travel Insurance has been designed specifically with you,
              the cyclist, in mind. Whether you’re heading to a duathlon in
              Lisbon or slogging it up the Alp D’Huez in France, you can enjoy
              your cycle adventure free from worry.{" "}
            </p>
            <p>
              If you’re travelling abroad to take part in cycling expeditions,
              events or charity tours, please contact us on 0800 0833 035 and
              we’ll arrange specific individual insurance for these events.{" "}
            </p>
            <h4 className="mt-4">Why choose Velosure Travel Cover?</h4>

            <p>
              Velosure Travel Insurance works seamlessly alongside our Cycle
              Insurance to give you complete protection specific to your
              requirements. Featuring cover for thousands of medical conditions,
              cycling & racing worldwide* and emergency medical costs.*{" "}
            </p>

            <p className="small">
              * Optional covers which are only available where the appropriate
              additional premium has been paid.
            </p>

            <CTAButton
              align="left"
              colour="mustard"
              CTAText="Get a travel quote"
              onClick={() => {
                sessionStorage.removeItem("context");
              }}
              externalLink={true}
              Url={
                "https://lawshieldvelosure.justtravelcover.com/quote/trip-details"
              }
            />
            <div className="bikeBoxImageContainerMobile">
              <img
                src={BikeBox}
                className="bikeBox  d-block d-sm-block d-md-block d-lg-none"
                alt="Bike storage box for travel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyDoINeedTravelInsurance;
