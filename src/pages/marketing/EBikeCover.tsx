import TopNavBar from "@/components/shared/TopNavBar";
import BenefitsOfEBike from "@/components/marketing/OurCover/BenefitsOfEBike";
import WhyChooseVelosure from "@/components/marketing/OurCover/WhyChooseVelosure";
import HeroBanner from "@/components/shared/HeroBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

const EBikeCover = () => {
  useEffect(() => {
    seoTags(
      "Electric bike cover",
      "Electric bike insurance covering against theft, accidental damage,and battery protection.",
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
          href="https://www.velosure.co.uk/electric-bicycle-insurance"
        />
      </Helmet>
      <TopNavBar theme={"transparent"} />
      <HeroBanner
        heading1={"E-bike cover"}
        heading2={""}
        subHeading={
          "Accessible, versatile and fun for all ages, e-bikes are perfect for commuters, those wishing to build their fitness and thrill-seekers alike."
        }
        image={3}
      />
      <BenefitsOfEBike />
      <WhyChooseVelosure />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={3} />
    </div>
  );
};

export default EBikeCover;
