import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import HowDoesThisBenefit from "@/components/marketing/RETAILER_AFFILIATE/HowDoesThisBenefit";
import RepairReplace from "@/components/marketing/RETAILER_AFFILIATE/RepairReplace";
import AlreadyAnAffiliate from "@/components/marketing/RETAILER_AFFILIATE/AlreadyAnAffiliate";
import CustomerLoyalty from "@/components/marketing/RETAILER_AFFILIATE/CustomerLoyalty";
import LastingRelationship from "@/components/marketing/RETAILER_AFFILIATE/LastingRelationship";
import ReadyToSignUp from "@/components/marketing/RETAILER_AFFILIATE/ReadyToSignUp";
import { createRef } from "react";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

const RetailerAffiliate = () => {
  const signupRef = createRef<HTMLElement>() as React.RefObject<HTMLElement>;
  useEffect(() => {
    seoTags(
      "Retailer Affiliate Scheme",
      "Velosure cycle insurance work with retailers to enable better protection for their customers. ",
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
          href="https://www.velosure.co.uk/affiliate-scheme"
        />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Retailer"}
        headlineLine2={"affiliate scheme"}
        subheadlineLine1={
          "Our affiliate scheme supports both cyclists and local cycle shops"
        }
        subheadlineLine2={""}
        hasCTA={"false"}
        hasScrollCTA={true}
        scrollCTARef={signupRef}
        CTAText={"Sign up"}
      />

      <HowDoesThisBenefit />
      <RepairReplace />
      <AlreadyAnAffiliate />
      <LastingRelationship signupRef={signupRef} />
      <CustomerLoyalty />
      <ReadyToSignUp signupRef={signupRef} />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default RetailerAffiliate;
