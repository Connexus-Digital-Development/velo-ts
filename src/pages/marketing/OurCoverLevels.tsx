import TopNavBar from "@/components/shared/TopNavBar";

import WhatOurCustomersSay from "@/components/shared/WhatOurCustomersSay";
import ProtectYourBike from "@/components/shared/ProtectYourBike";
import { useEffect } from "react";
import { seoTags } from "@/components/shared/SeoEdit";
import RegularBanner from "@/components/shared/RegularBanner";
import VelosureCore from "@/components/marketing/OurCoverLevels/VelosureCore";
import VelosurePerformance from "@/components/marketing/OurCoverLevels/VelosurePerformance";
import CorePerformanceComparison from "@/components/marketing/OurCoverLevels/CorePerformanceComparison";
import CorePerformanceIntro from "@/components/marketing/OurCoverLevels/CorePerformanceIntro";
import WhatWeDontCover from "@/components/marketing/OurCoverLevels/WhatWeDontCover";

const OurCoverLevels = () => {
  useEffect(() => {
    seoTags(
      "Cover levels",
      "Comprehensive bicycle cover, created by cyclists, for cyclists. Our cycle insurance keep syou covered when you need it most.",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);
  return (
    <div className="container-fluid">
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Our cover"}
        headlineLine2={"levels"}
        subheadlineLine1={""}
        subheadlineLine2={""}
        hasCTA={"true"}
        CTAText={"Get a quote"}
        requiresSpacer={false}
      />{" "}
      <WhatOurCustomersSay />
      <CorePerformanceIntro />
      <VelosureCore />
      <VelosurePerformance />
      <CorePerformanceComparison />
      <WhatWeDontCover />
      <ProtectYourBike variant={1} />
    </div>
  );
};

export default OurCoverLevels;
