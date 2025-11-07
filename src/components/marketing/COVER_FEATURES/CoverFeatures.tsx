import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import IntroBlock from "./IntroBlock";
import StandardFeatures from "./StandardFeatures";
import EBikeFeatures from "./EBikeFeatures";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet";

const CoverFeatures = () => {
  useEffect(() => {
    seoTags(
      "Cover Features",
      "Our cover is designed to protect a cyclist and their bike from theft, accidental damage, accessory damage, and much more.",
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
          href="https://www.velosure.co.uk/bike-insurance-cover-features"
        />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Cover"}
        headlineLine2={"features"}
        subheadlineLine1={
          "All the information you need to decide if our cover meets your needs"
        }
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
        requiresSpacer={true}
      />
      <IntroBlock />
      <StandardFeatures />
      <EBikeFeatures />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default CoverFeatures;
