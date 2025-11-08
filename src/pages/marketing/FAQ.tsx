import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import FAQSection from "@/components/marketing/Faq/FAQSection";
import CantSeeAnswer from "@/components/marketing/Faq/CantSeeAnswer";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

const FAQ = () => {
  useEffect(() => {
    seoTags(
      "FAQ",
      "Frequently asked questions about the most commonly used cycle insurance terms. ",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);
  return (
    <div className=" oh">
      <Helmet>
        <link
          rel="canonical"
          href="https://www.velosure.co.uk/bicycle-insurance-faqs"
        />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Frequently"}
        headlineLine2={"asked questions"}
        subheadlineLine1={
          "All the information you need to decide if our cover meets your needs"
        }
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
        requiresSpacer={true}
      />
      <FAQSection />
      <CantSeeAnswer />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default FAQ;
