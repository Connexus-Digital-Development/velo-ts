import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import IntroBlock from "@/components/marketing/POLICY_INFORMATION/IntroBlock";
import DownloadDocuments from "@/components/marketing/POLICY_INFORMATION/DownloadDocuments";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet";

const PolicyInformation = () => {
  useEffect(() => {
    seoTags(
      "Policy Information",
      "Relevant and important information for our current and future policy holders. We always endeavor to make sure that our policy changes are clear and transparent.",
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
          href="https://www.velosure.co.uk/policy-information"
        />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Policy"}
        headlineLine2={"information"}
        subheadlineLine1={
          "All the information you need to decide if our cover meets your needs"
        }
        subheadlineLine2={""}
        hasCTA={"true"}
        CTAText={"Get a quote"}
      />

      <IntroBlock />
      <DownloadDocuments />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default PolicyInformation;
