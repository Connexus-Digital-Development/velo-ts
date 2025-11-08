import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import WhatOurCustomersSayList from "@/components/marketing/REVIEWS/WhatOurCustomersSayList";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

const Reviews = () => {
  useEffect(() => {
    seoTags(
      "Reviews",
      "Hear what Velosure cycle insurance customers have had to say about their policy and their claims.",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);
  return (
    <div className="container-fluid">
      <Helmet>
        <link rel="canonical" href="https://www.velosure.co.uk/Reviews" />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"What our"}
        headlineLine2={"customers say..."}
        subheadlineLine1={
          "We love to hear the feedback from our customers so we can always keep improving"
        }
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
        requiresSpacer={true}
      />

      <WhatOurCustomersSayList />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default Reviews;
