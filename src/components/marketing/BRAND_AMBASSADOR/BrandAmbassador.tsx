import TopNavBar from "@/components/shared/TopNavBar";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import HeroBanner from "@/components/shared/HeroBanner";
import IntroBlock from "./IntroBlock";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import WhyJonnyChoseVelo from "./WhyJonnyChoseVelo";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

const BrandAmbassador = () => {
  useEffect(() => {
    seoTags(
      "Jonny Brownlee ",
      "Velosure is trusted by cyclists of all levels, that's why it made sense for Jonny Brownlee to join us. ",
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
          href="https://www.velosure.co.uk/BrandAmbassador"
        />
      </Helmet>
      <TopNavBar theme={"transparent"} />
      <HeroBanner
        heading1={"Our brand ambassador"}
        heading2={"Jonny Brownlee"}
        subHeading={
          "Velosure is trusted by all of our customers, from cycling enthusiasts all the way to the pros competing at the highest level."
        }
        image={5}
      />
      <IntroBlock />
      <WhyJonnyChoseVelo />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default BrandAmbassador;
