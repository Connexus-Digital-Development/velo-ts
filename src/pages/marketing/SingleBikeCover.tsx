import TopNavBar from "@/components/shared/TopNavBar";
import OurSingleBikeCover from "@/components/marketing/OUR_COVER/OurSingleBikeCover";
import WhyChooseSingleBikeCover from "@/components/marketing/OUR_COVER/WhyChooseSingleBikeCover";
import HeroBanner from "@/components/shared/HeroBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

const SingleBikeCover = () => {
  useEffect(() => {
    seoTags(
      "Single bike cover",
      "Comprehensive single bicycle cover, created by cyclists, for cyclists. Our cycle insurance keep syou covered when you need it most.",
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
          href="https://www.velosure.co.uk/single-bike-insurance"
        />
      </Helmet>
      <TopNavBar theme={"transparent"} />
      <HeroBanner
        heading1={"Single bike cover"}
        heading2={""}
        subHeading={
          "Whether you use your bike for commuting, shopping or road racing, comprehensive protection at great value."
        }
        image={1}
      />
      <OurSingleBikeCover />
      <WhyChooseSingleBikeCover />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default SingleBikeCover;
