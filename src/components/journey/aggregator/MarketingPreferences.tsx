import { useContext } from "react";
import { JourneyContext } from "@/context/journeyStore";
import { Checkbox } from "@mantine/core";

const MarketingPreferences = () => {
  const context = useContext(JourneyContext);
  const [gState, setGState] = context!;

  const handleThirdPartyEmailClick = (checked: boolean) => {
    setGState({ ...gState, thirdPartyEmail: checked });
  };
  const handleThirdPartyPhoneClick = (checked: boolean) => {
    setGState({ ...gState, thirdPartyPhone: checked });
  };
  const handleAdminEmailClick = (checked: boolean) => {
    setGState({ ...gState, adminEmail: checked });
  };
  const handleAdminPhoneClick = (checked: boolean) => {
    setGState({ ...gState, adminPhone: checked });
  };

  return (
    <section className="container container_narrow">
      <div className="content_section mt-3">
        <h3 className="journey-section-titles  mb-4">
          Marketing<span className="blueFont"> preferences</span>.
        </h3>
        <p className="lufga-light mb-4">
          We’d like to keep you up to date with the latest products, services,
          and exclusive offers and competitions from Velosure.
        </p>
        <div className="row">
          <div className="offset-10 offset-sm-11 col-2 col-sm-1 preferredMethodOfContact ">
            <Checkbox
              radius="md"
              size="lg"
              color="velo-blue"
              onChange={(e) => {
                handleAdminPhoneClick(e.target.checked);
                handleAdminEmailClick(e.target.checked);
              }}
              checked={gState.adminPhone}
            />
          </div>
        </div>
        <h3 className="journey-section-titles ">
          Our<span className="blueFont"> partners</span>
        </h3>
        <p className="lufga-light mt-2">
          We would also like to pass your details to our partners in The
          Connexus Group*.
        </p>
        <div className="row">
          <div className="offset-10 offset-sm-11 col-2 col-sm-1  mb-1 preferredMethodOfContact ">
            <Checkbox
              radius="md"
              size="lg"
              color="velo-blue"
              onChange={(e) => {
                handleThirdPartyPhoneClick(e.target.checked);
                handleThirdPartyEmailClick(e.target.checked);
              }}
              checked={gState.thirdPartyPhone}
            />
          </div>
        </div>
        <p className="lufga-light font-12 ">
          *The Connexus Group includes: Carbon Insurance Brokers who offer a
          wide variety of insurance products. Performance Car Hire who offer
          prestige and executive vehicles for hire. Connexus Medical
          Appointments who arrange medical examinations via our national panel
          of over 1500 members. Connexus Health and Rehabilitation who offer
          bespoke treatment packages to suit businesses and individuals,
          including physiotherapy and counselling services. KLS Law who offer a
          range of legal services.
        </p>
      </div>
    </section>
  );
};

export default MarketingPreferences;
