import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import IntroBlock from "@/components/marketing/SUBMIT_A_CLAIM/IntroBlock";
import WhatCanIClaimFor from "@/components/marketing/SUBMIT_A_CLAIM/WhatCanIClaimFor";
import HowToMakeAClaim from "@/components/marketing/SUBMIT_A_CLAIM/HowToMakeAClaim";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

const SubmitAClaim = () => {
  useEffect(() => {
    seoTags(
      "Submit a Claim",
      "We have specialist in-house claims to deal with your claim in a quick and stress-free fashion. Call us at 01925 422 733 or email claims@lawshield-uk.com.",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);
  return (
    <div className="container-fluid">
      <Helmet>
        <link rel="canonical" href="https://www.velosure.co.uk/SubmitAClaim" />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Submit"}
        headlineLine2={"a claim"}
        subheadlineLine1={
          "Should the worst happen, we’re here to make your claim quick and stress-free. "
        }
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
        requiresSpacer={true}
      />
      <IntroBlock />
      <WhatCanIClaimFor />
      <HowToMakeAClaim />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default SubmitAClaim;
