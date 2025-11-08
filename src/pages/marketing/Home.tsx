import TopNavBar from "@/components/shared/TopNavBar";
import HeroBanner from "@/components/shared/HeroBanner";
import IntroBlock from "@/components/marketing/Home/IntroBlock";
import React, { useEffect, Suspense } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";
const Home = () => {
  sessionStorage.removeItem("context");

  useEffect(() => {
    seoTags(
      "Home",
      "Looking for the best cycle insurance in the UK? Look no further than Velosure cycle insurance. Comprehensive yet cheap bike insurance in the UK.",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);

  const WhatOurCustomersSay = React.lazy(
    () => import("../../components/shared/WhatOurCustomersSay"),
  );
  const BlueBikesWeCoverSection = React.lazy(
    () => import("../../components/marketing/Home/BlueBikesWeCoverSection"),
  );
  //console.log(JSON.stringify(process.env));
  const PitstopPreview = React.lazy(
    () => import("../../components/marketing/Home/PitstopPreview"),
  );
  // const TrustedByTheBest = React.lazy(() => import("./TrustedByTheBest"));
  return (
    <div className="container-fluid">
      <Helmet>
        <link rel="canonical" href="https://www.velosure.co.uk" />
      </Helmet>
      <TopNavBar theme={"transparent"} />
      <HeroBanner
        heading1={"Cycle insurance"}
        heading2={"at the right price"}
        subHeading={
          "Simple, comprehensive cycle insurance for the whole household, without the inflated price tag."
        }
        image={1}
      />

      <IntroBlock />
      <Suspense fallback={<div>Loading...</div>}>
        <BlueBikesWeCoverSection />
        {/* <TrustedByTheBest /> */}
        <WhatOurCustomersSay />
        <PitstopPreview />
      </Suspense>
      <div className="blueBorderBott" />
    </div>
  );
};

export default Home;
