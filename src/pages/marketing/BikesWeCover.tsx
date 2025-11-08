import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import TypesOfBikes from "@/components/marketing/BIKES_WE_COVER/TypesOfBikes";
import FiftyFiftyBlock from "@/components/marketing/BIKES_WE_COVER/FiftyFiftyBlock";
import BikesWeCoverData from "@/components/marketing/BIKES_WE_COVER/BikesweCoverData";
import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";

import { useLocation } from "react-router-dom";

const BikesWeCover = () => {
  const data = BikesWeCoverData();
  useEffect(() => {
    seoTags(
      "Bikes We Cover",
      "No matter what bicycle you ride, we have you covered. Our insurance covers electric, road, mountain, urban, sports, and leisure bicycles.",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);

  const { hash } = useLocation();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [hash]); // do this on route change
  return (
    <div className="container-fluid">
      <Helmet>
        <link
          rel="canonical"
          href="https://www.velosure.co.uk/types-we-cover"
        />
      </Helmet>
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Bikes we cover"}
        headlineLine2={""}
        subheadlineLine1={
          "Road bikes, mountain bikes, triathlon bikes, electric bikes or hybrid"
        }
        subheadlineLine2={
          "bikes, we make sure your bike is getting the protection it needs."
        }
        hasCTA={"true"}
        CTAText={"Get a quote"}
        requiresSpacer={true}
      />

      <TypesOfBikes />

      {data.map((block) => (
        <FiftyFiftyBlock data={block} key={block.id} />
      ))}

      <WhatOurCustomersSay />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default BikesWeCover;
