import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import IntroBlock from "@/components/marketing/MAKE_A_COMPLAINT/IntroBlock";
import ComplaintDetails from "@/components/marketing/MAKE_A_COMPLAINT/ComplaintDetails";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet";

const MakeAComplaint = () => {
  useEffect(() => {
    seoTags(
      "Make a Complaint",
      "We're sorry to hear you’re not completely satisfied. To make a complaint, you can call us at 0800 731 3942 or email  customerrelations@lawshield-uk.com.",
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
          href="https://www.velosure.co.uk/MakeAComplaint"
        />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Make a"}
        headlineLine2={"complaint"}
        subheadlineLine1={
          "If you’re not happy with our service you can submit a complaint to our compliance team and it will be dealt with accordingly."
        }
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
        requiresSpacer={true}
      />
      <IntroBlock />
      <ComplaintDetails />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default MakeAComplaint;
