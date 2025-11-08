import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import IntroBlock from "@/components/marketing/SecurityRequirements/IntroBlock";
import NeedToPurchase from "@/components/marketing/SecurityRequirements/NeedToPurchase";
import StorageRequirements from "@/components/marketing/SecurityRequirements/StorageRequirements";
import Stolen from "@/components/marketing/SecurityRequirements/Stolen";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

const SecurityRequirements = () => {
  useEffect(() => {
    seoTags(
      "Security Requirements",
      "We recommend using a secure and approved cycle lock. There are three ratings of lock, bronze, silver, and gold, depending on your cycle's value.",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);
  return (
    <div className="container-fluid whiteBG oh">
      <Helmet>
        <link
          rel="canonical"
          href="https://www.velosure.co.uk/security-requirements"
        />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Security"}
        headlineLine2={"requirements"}
        subheadlineLine1={
          "All the information you need to decide if our cover meets your needs"
        }
        subheadlineLine2={""}
        hasCTA={"true"}
        CTAText={"Get a quote"}
      />

      <IntroBlock />

      <NeedToPurchase />
      <StorageRequirements />
      <Stolen />
      <WhatOurCustomersSay />
      <div className="bg-lightblue">
        <ProtectYourBike variant={1} />
      </div>
    </div>
  );
};

export default SecurityRequirements;
