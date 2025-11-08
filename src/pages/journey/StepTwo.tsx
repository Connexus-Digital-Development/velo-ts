import AboutYou from "@/components/journey/step-two/AboutYou";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import RegularBanner from "@/components/shared/RegularBanner";
import TopNavBlank from "@/components/shared/TopNavBlank";

const StepTwo = () => {
  return (
    <div className="container-fluid mb-5 blueBorderBott oh">
      <TopNavBlank theme={"white"} />
      <RegularBanner
        headlineLine1={"Your bike "}
        headlineLine2={"insurance quote"}
        subheadlineLine1={"Tell us about you, your bike and cover you need."}
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
      />

      <Breadcrumbs />

      <AboutYou />
    </div>
  );
};

export default StepTwo;
