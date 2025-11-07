import TopNavBar from "@/components/shared/TopNavBar";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import NeedATravelQuote from "@/components/marketing/TRAVEL/NeedATravelQuote";
import KeyFeatures from "@/components/marketing/TRAVEL/KeyFeatures";
import WhyDoINeedTravelInsurance from "@/components/marketing/TRAVEL/WhyDoINeedTravelInsurance";
import HeroBanner from "@/components/shared/HeroBanner";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet";

const Travel = () => {
  useEffect(() => {
    seoTags(
      "Travel Cover",
      "Ensuring you have complete protection wherever you're traveling from Lisbon to the Alp D'Huez!",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);
  return (
    <div className="container-fluid">
      <Helmet>
        <link
          rel="canonical"
          href="https://www.velosure.co.uk/bicycle-travel-insurance"
        />
      </Helmet>
      <TopNavBar theme={"transparent"} />
      <HeroBanner
        heading1={"Travel insurance"}
        heading2={"designed for cyclists"}
        subHeading={
          "With Velosure cycle travel insurance, customers can be certain they are fully covered for cycling abroad."
        }
        image={4}
      />
      <WhyDoINeedTravelInsurance />
      <KeyFeatures />
      <NeedATravelQuote />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={4} />
    </div>
  );
};

export default Travel;
