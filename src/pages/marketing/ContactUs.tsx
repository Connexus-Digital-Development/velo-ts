import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import ContactUsForm from "@/components/marketing/CONTACT_US/ContactUsForm";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet";

const ContactUs = () => {
  useEffect(() => {
    seoTags(
      "Contact us",
      "Get in touch with Velosure cycle insurance if you have any questions. Prefer to talk? Give us a call on 0800 083 3035.",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);
  return (
    <div className="container-fluid">
      <Helmet>
        <link rel="canonical" href="https://www.velosure.co.uk/contact" />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Contact us"}
        headlineLine2={""}
        subheadlineLine1={"Have a question or need an amendment? "}
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
        requiresSpacer={true} // this is for the edge cases where title/sub title are one line each AND no CTA - Cog gets misplaced
        requiresExtraSpacer={true}
      />
      <ContactUsForm />
      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default ContactUs;
