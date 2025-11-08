import TopNavBar from "@/components/shared/TopNavBar";
import KeyBenefitsOfMultiBikeCover from "@/components/marketing/OUR_COVER/KeyBenefitsOfMultiBikeCover";
import MultiBikeComparison from "@/components/marketing/OUR_COVER/MultiBikeComparison";
import HeroBanner from "@/components/shared/HeroBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

const MultiBikeCover = () => {
  useEffect(() => {
    seoTags(
      "Multi bike cover",
      "Save up to 50% with multi-bike insurance. We understand that (most) people only ride one bike at a time!",
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
          href="https://www.velosure.co.uk/multi-bike-insurance"
        />
      </Helmet>
      <TopNavBar theme={"transparent"} />
      <HeroBanner
        heading1={"Multi-bike cover"}
        heading2={""}
        subHeading={
          "The best value Multi-bike cover on the market. Leading protection for all your cycles."
        }
        image={2}
      />
      <KeyBenefitsOfMultiBikeCover />
      <MultiBikeComparison />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={2} />
    </div>
  );
};

export default MultiBikeCover;
