import { useState } from "react";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import TopNavBar from "@/components/shared/TopNavBar";
import RegularBanner from "@/components/shared/RegularBanner";
import Payments from "@/components/journey/step-four/Payments";
import Assumptions from "@/components/journey/step-four/Assumptions";
import Declarations from "@/components/journey/step-four/Declarations";
import PaymentMethodSelector from "@/components/journey/step-four/PaymentMethodSelector";
import DocumentPreferences from "@/components/journey/step-three/DocumentPreferences";

interface QRPaymentProps {
  setShowPaymentWindow?: (show: boolean) => void;
}

const QRPayment = ({ setShowPaymentWindow: externalSetShowPaymentWindow }: QRPaymentProps) => {
  const [gState] = useSafeContext({
    componentName: "QRPayment",
  });
  const [rotate, setRotate] = useState(false);
  const [showPaymentWindow, setShowPaymentWindow] = useState(false);

  const handleSetShowPaymentWindow = (show: boolean) => {
    setShowPaymentWindow(show);
    if (externalSetShowPaymentWindow) {
      externalSetShowPaymentWindow(show);
    }
  };
  const [pending, setPending] = useState(false);
  return (
    <div className="container-fluid mb-5 oh">
      <TopNavBar theme={"white"} />
      <RegularBanner
        headlineLine1={"Your bike"}
        headlineLine2={"insurance quote"}
        subheadlineLine1={"Tell us about you, your bike and cover you need."}
        subheadlineLine2={""}
        hasCTA={"false"}
        rotate={rotate}
      />

      <div hidden={!pending}>
        <div
          id="incepting-overlay"
          className={pending ? "overlay" : "overlay_hidden"}
        >
          <h1>Incepting your policy...</h1>
        </div>
      </div>
      <PaymentMethodSelector setShowPaymentWindow={handleSetShowPaymentWindow} />

      {gState.paymentSuccessful === false && (
        <>
          <Assumptions setShowPaymentWindow={handleSetShowPaymentWindow} />
          <Declarations />
          <DocumentPreferences />
        </>
      )}

      {gState.paymentSuccessful === false && (
        <Payments
          fromExternalLink={true}
          fromAggregator={false}
          setPending={setPending}
          setRotate={setRotate}
          showPaymentWindow={showPaymentWindow}
          setShowPaymentWindow={handleSetShowPaymentWindow}
        />
      )}
    </div>
  );
};

export default QRPayment;
