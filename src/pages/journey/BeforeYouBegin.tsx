import { useState } from "react";
import TopNavBlank from "@/components/shared/TopNavBlank";
import RegularBanner from "@/components/shared/RegularBanner";
import ImportantInformation from "@/components/journey/before-you-begin/ImportantInformation";
import JourneyCheck from "@/components/journey/before-you-begin/JourneyCheck";

const BeforeYouBegin = () => {
  const [rotate, _setRotate] = useState(false);

  return (
    <div className="container-fluid mb-5 blueBorderBott oh">
      <TopNavBlank />
      <RegularBanner
        headlineLine1={"Before you begin"}
        headlineLine2={""}
        subheadlineLine1={"Some important information."}
        subheadlineLine2={""}
        hasCTA={"false"}
        rotate={rotate}
        CTAText={""}
      />

      <ImportantInformation />
      <JourneyCheck />
    </div>
  );
};

export default BeforeYouBegin;
