import { Route, Routes as RouterRoutes } from "react-router-dom";
import Home from "@/pages/marketing/Home";
import MakeAComplaint from "@/pages/marketing/MakeAComplaint";
import OurCoverLevels from "@/pages/marketing/OurCoverLevels";
import FullBlog from "@/pages/marketing/FullBlog";
import Pitstop from "@/pages/marketing/Pitstop";
import PolicyInformation from "@/pages/marketing/PolicyInformation";
import ReferAFriend from "@/pages/marketing/ReferAFriend";
import RetailerAffiliate from "@/pages/marketing/RetailerAffiliate";
import Reviews from "@/pages/marketing/Reviews";
import SecurityRequirements from "@/pages/marketing/SecurityRequirements";
import SubmitAClaim from "@/pages/marketing/SubmitAClaim";
// import BrandAmbassador from "@/pages/BRAND_AMBASSADOR/BrandAmbassador";
// import "./CSS/site.css";
import Payment from "@/components/journey/aggregator/Payment";
import QuoteSummary from "@/pages/journey/QuoteSummary";
import InceptFailed from "@/components/journey/InceptFailed";
import PaymentError from "@/components/journey/PaymentError";
import PolicyConfirmation from "@/components/journey/PolicyConfirmation";
import QuoteReferred from "@/components/journey/QuoteReferred";
import QRLandingPage from "@/pages/journey/QRLandingPage";
import QRPayment from "@/components/journey/quote-retrieval/QRPayment";
import QRQuoteSummary from "@/components/journey/quote-retrieval/QRQuoteSummary";
import StepFour from "@/pages/journey/StepFour";
import StepOne from "@/pages/journey/StepOne";
import StepThree from "@/pages/journey/StepThree";
import StepTwo from "@/pages/journey/StepTwo";
import AccessoryCover from "@/pages/marketing/AccessoryCover";
import EBikeCover from "@/pages/marketing/EBikeCover";
import MultiBikeCover from "@/pages/marketing/MultiBikeCover";
import SingleBikeCover from "@/pages/marketing/SingleBikeCover";
// import CookiePolicy from "@/pages/legal/CookiePolicy";
// import Privacy from "@/pages/legal/Privacy";
// import TermsAndConditions from "@/pages/legal/TermsAndConditions";
import Travel from "@/pages/marketing/Travel";
// import VulnerabilityPolicy from "@/pages/legal/VulnerabilityPolicy";
import Redirector from "./redirector";
import AboutUs from "@/pages/marketing/AboutUs";
import ContactUs from "@/pages/marketing/ContactUs";
import BrandAmbassador from "@/components/marketing/BrandAmbassador/BrandAmbassador";
import FAQ from "@/pages/marketing/FAQ";
import CoverComparison from "@/pages/marketing/CoverComparison";
import BikesWeCover from "@/pages/marketing/BikesWeCover";
import { JourneyStore } from "@/context/journeyStore";

const AppRoutes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      {/* =======================================JOURNEY ROUTES =============================*/}

      <Route path="/get-a-quote" element={
        <JourneyStore>
          <StepOne />
        </JourneyStore>
      } />
      <Route path="/StepOne" element={
        <JourneyStore>
          <StepOne />
        </JourneyStore>
      } />
      <Route path="/StepTwo" element={
        <JourneyStore>
          <StepTwo />
        </JourneyStore>
      } />
      <Route path="/StepThree" element={
        <JourneyStore>
          <StepThree />
        </JourneyStore>
      } />
      <Route path="/StepFour" element={
        <JourneyStore>
          <StepFour />
        </JourneyStore>
      } />
      <Route path="/PolicyConfirmation" element={
        <JourneyStore>
          <PolicyConfirmation />
        </JourneyStore>
      } />
      <Route path="/QuoteReferred" element={
        <JourneyStore>
          <QuoteReferred />
        </JourneyStore>
      } />
      <Route path="/PaymentError" element={
        <JourneyStore>
          <PaymentError />
        </JourneyStore>
      } />
      <Route path="/InceptFailed" element={<InceptFailed />} />

      {/* =======================================Aggregator ROUTES =============================*/}
      <Route path="/aggregator/:id" element={
        <JourneyStore>
          <QuoteSummary />
        </JourneyStore>
      } />

      <Route path="/payment" element={
        <JourneyStore>
          <Payment />
        </JourneyStore>
      } />
      {/* =======================================QR ROUTES =============================*/}

      <Route path="/QuoteRetrieval" element={
        <JourneyStore>
          <QRLandingPage />
        </JourneyStore>
      } />
      <Route path="/QuoteRetrievalSummary" element={
        <JourneyStore>
          <QRQuoteSummary />
        </JourneyStore>
      } />

      <Route path="/QuoteRetrievalPayment" element={
        <JourneyStore>
          <QRPayment />
        </JourneyStore>
      } />
      {/* =======================================MAIN SITE ROUTES =============================*/}
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/SubmitAClaim" element={<SubmitAClaim />} />
      <Route path="/MakeAComplaint" element={<MakeAComplaint />} />
      <Route path="/ReferAFriend" element={<ReferAFriend />} />
      <Route path="/BrandAmbassador" element={<BrandAmbassador />} />
      <Route path="/policy-information" element={<PolicyInformation />} />
      <Route path="/security-requirements" element={<SecurityRequirements />} />
      <Route path="/bicycle-insurance-faqs" element={<FAQ />} />
      <Route path="/OurCoverLevels" element={<OurCoverLevels />} />
      <Route path="/Reviews" element={<Reviews />} />
      {
        <Route path="/bike-insurance-comparison-chart" element={<CoverComparison />} />
      }
      <Route path="/types-we-cover" element={<BikesWeCover />} />
      <Route path="/bicycle-travel-insurance" element={<Travel />} />
      <Route path="/Pitstop" element={<Pitstop />} />
      <Route path="/FullBlog/:id" element={<FullBlog />} />

      <Route path="/affiliate-scheme" element={<RetailerAffiliate />} />

      <Route path="/single-bike-insurance" element={<SingleBikeCover />} />
      <Route path="/multi-bike-insurance" element={<MultiBikeCover />} />
      <Route path="/electric-bicycle-insurance" element={<EBikeCover />} />
      <Route path="/accessories-we-cover" element={<AccessoryCover />} />
      <Route path="/our-cover-levels" element={<OurCoverLevels />} />
      {/*<Route path="/Privacy" element={<Privacy />} />
      <Route path="/Cookies" element={<CookiePolicy />} />
      <Route path="/Terms" element={<TermsAndConditions />} />
      <Route path="/VulnerabilityPolicy" element={<VulnerabilityPolicy />} />*/}
      <Route path="*" element={<Redirector />} />
    </RouterRoutes>
  );
};

export default AppRoutes;
