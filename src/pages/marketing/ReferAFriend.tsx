import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import IntroBlock from "@/components/marketing/REFER_A_FRIEND/IntroBlock";
import ForgotYourPolicy from "@/components/marketing/REFER_A_FRIEND/ForgotYourPolicy";
import HowDoesItWork from "@/components/marketing/REFER_A_FRIEND/HowDoesItWork";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

const ReferAFriend = () => {
  useEffect(() => {
    seoTags(
      "Refer a Friend Scheme",
      "If you love feeling secure with your cycle insurance, why not refer a friend and receive a gift voucher?",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);
  return (
    <div className="container-fluid">
      <Helmet>
        <link rel="canonical" href="https://www.velosure.co.uk/ReferAFriend" />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Refer a"}
        headlineLine2={"friend scheme"}
        subheadlineLine1={
          "If you've loved feeling secure with your cycle insurance cover, why not spread the joy and refer a friend to us? "
        }
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
        requiresSpacer={true}
      />
      <IntroBlock />
      <HowDoesItWork />
      <ForgotYourPolicy />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default ReferAFriend;
