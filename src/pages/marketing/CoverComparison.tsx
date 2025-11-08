import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import IntroBlock from "@/components/marketing/COVER_COMPARISON/IntroBlock";
import CompareOurCover from "@/components/marketing/COVER_COMPARISON/CompareOurCover";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

const CoverComparison = () => {
  useEffect(() => {
    seoTags(
      "Cover Comparison",
      "Compare our coverage with leading insurance providers. Our helpful chart shows you the difference in price between market leaders and Velosure.",
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
          href="https://www.velosure.co.uk/bike-insurance-comparison-chart"
        />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Compare our"}
        headlineLine2={"cover"}
        subheadlineLine1={"See how we compare to our competitors"}
        subheadlineLine2={""}
        hasCTA={"true"}
        CTAText={"Get a quote"}
      />
      <IntroBlock />
      <CompareOurCover />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default CoverComparison;
