import { useContext, useState } from "react";
import { JourneyContext } from "@/context/journeyStore";
import TopNavBlank from "@/components/shared/TopNavBlank";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import RegularBanner from "@/components/shared/RegularBanner";
import Payments from "@/components/journey/step-four/Payments";
import Assumptions from "@/components/journey/step-four/Assumptions";
import Declarations from "@/components/journey/step-four/Declarations";
import DocumentPreferences from "@/components/journey/step-three/DocumentPreferences";
import PaymentMethodSelector from "@/components/journey/step-four/PaymentMethodSelector";
import { type StepFourProps } from "@/models/JourneyComponentTypes";

const StepFour = (_props: StepFourProps) => {
  const [gState] = useContext(JourneyContext);
  const [rotate, setRotate] = useState(false);
  const [showPaymentWindow, setShowPaymentWindow] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <div className="container-fluid mb-5 blueBorderBott oh">
      <TopNavBlank theme={"white"} />
      <RegularBanner
        headlineLine1={"Your bike "}
        headlineLine2={"insurance quote"}
        subheadlineLine1={"Tell us about you, your bike and cover you need."}
        subheadlineLine2={""}
        hasCTA={"false"}
        rotate={rotate}
        CTAText={"Get a quote"}
      />
      <Breadcrumbs />

      <div hidden={!pending}>
        <div
          id="incepting-overlay"
          className={pending ? "overlay" : "overlay_hidden"}
        >
          <h1>Incepting your policy...</h1>{" "}
        </div>
      </div>

      <PaymentMethodSelector setShowPaymentWindow={setShowPaymentWindow} />

      {gState.paymentSuccessful === false && (
        <>
          <Assumptions setShowPaymentWindow={setShowPaymentWindow} />
          <Declarations setShowPaymentWindow={setShowPaymentWindow} />
          <DocumentPreferences />
        </>
      )}

      {gState.paymentSuccessful === false && (
        <Payments
          setRotate={setRotate}
          showPaymentWindow={showPaymentWindow}
          setShowPaymentWindow={setShowPaymentWindow}
          setPending={setPending}
        />
      )}
    </div>
  );
};

export default StepFour;
