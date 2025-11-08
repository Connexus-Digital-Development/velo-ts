import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import AccessoryCategories from "@/components/marketing/ACCESSORY_COVER/AccessoryCategories";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

const AccessoryCover = () => {
  useEffect(() => {
    seoTags(
      "Accessories We Cover",
      "We know that during a bicycle accident, it's not just your bike that may get damaged. That's why we include accessory cover as standard. ",
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
          href="https://www.velosure.co.uk/accessories-we-cover"
        />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Accessories"}
        headlineLine2={"we cover"}
        subheadlineLine1={
          "Below is a comprehensive list of the accessories that we cover"
        }
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
        requiresSpacer={true}
      />
      <AccessoryCategories />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default AccessoryCover;
