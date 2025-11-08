import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import IntroBlock from "@/components/marketing/ABOUT_US/IntroBlock";
import HowItStarted from "@/components/marketing/ABOUT_US/HowItStarted";
import WhyInsureWithVelosure from "@/components/marketing/ABOUT_US/WhyInsureWithVelosure";
import NeedAQuote from "@/components/marketing/ABOUT_US/NeedAQuote";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  useEffect(() => {
    seoTags(
      "About Us",
      "11 years since inception, we're still providing the most comprehensive bicycle insurance to amateur and professional cyclists. ",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);
  return (
    <div className="container-fluid">
      <Helmet>
        <link rel="canonical" href="https://www.velosure.co.uk/about" />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"About us"}
        headlineLine2={""}
        subheadlineLine1={
          "Offering the best value product on the market, while providing you with a cover that fully meets your needs.  "
        }
        subheadlineLine2={""}
        hasCTA={"true"}
        CTAText={"Get a quote"}
        requiresSpacer={true}
      />
      <IntroBlock />
      <HowItStarted />
      <WhyInsureWithVelosure />
      <NeedAQuote />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default AboutUs;
