import { Route, Routes as RouterRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load all components for code splitting
const Home = lazy(() => import("@/pages/marketing/Home"));
const MakeAComplaint = lazy(() => import("@/pages/marketing/MakeAComplaint"));
const OurCoverLevels = lazy(() => import("@/pages/marketing/OurCoverLevels"));
const FullBlog = lazy(() => import("@/pages/marketing/FullBlog"));
const Pitstop = lazy(() => import("@/pages/marketing/Pitstop"));
const PolicyInformation = lazy(() => import("@/pages/marketing/PolicyInformation"));
const ReferAFriend = lazy(() => import("@/pages/marketing/ReferAFriend"));
const RetailerAffiliate = lazy(() => import("@/pages/marketing/RetailerAffiliate"));
const Reviews = lazy(() => import("@/pages/marketing/Reviews"));
const SecurityRequirements = lazy(() => import("@/pages/marketing/SecurityRequirements"));
const SubmitAClaim = lazy(() => import("@/pages/marketing/SubmitAClaim"));
const Payment = lazy(() => import("@/components/journey/aggregator/Payment"));
const QuoteSummary = lazy(() => import("@/pages/journey/QuoteSummary"));
const InceptFailed = lazy(() => import("@/components/journey/InceptFailed"));
const PaymentError = lazy(() => import("@/components/journey/PaymentError"));
const PolicyConfirmation = lazy(() => import("@/components/journey/PolicyConfirmation"));
const QuoteReferred = lazy(() => import("@/components/journey/QuoteReferred"));
const QRLandingPage = lazy(() => import("@/pages/journey/QRLandingPage"));
const QRPayment = lazy(() => import("@/components/journey/quote-retrieval/QRPayment"));
const QRQuoteSummary = lazy(() => import("@/components/journey/quote-retrieval/QRQuoteSummary"));
const StepFour = lazy(() => import("@/pages/journey/StepFour"));
const StepOne = lazy(() => import("@/pages/journey/StepOne"));
const StepThree = lazy(() => import("@/pages/journey/StepThree"));
const StepTwo = lazy(() => import("@/pages/journey/StepTwo"));
const AccessoryCover = lazy(() => import("@/pages/marketing/AccessoryCover"));
const EBikeCover = lazy(() => import("@/pages/marketing/EBikeCover"));
const MultiBikeCover = lazy(() => import("@/pages/marketing/MultiBikeCover"));
const SingleBikeCover = lazy(() => import("@/pages/marketing/SingleBikeCover"));
const Travel = lazy(() => import("@/pages/marketing/Travel"));
const Redirector = lazy(() => import("./redirector"));
const AboutUs = lazy(() => import("@/pages/marketing/AboutUs"));
const ContactUs = lazy(() => import("@/pages/marketing/ContactUs"));
const BrandAmbassador = lazy(() => import("@/components/marketing/BrandAmbassador/BrandAmbassador"));
const FAQ = lazy(() => import("@/pages/marketing/FAQ"));
const CoverComparison = lazy(() => import("@/pages/marketing/CoverComparison"));
const BikesWeCover = lazy(() => import("@/pages/marketing/BikesWeCover"));
import { JourneyStore } from "@/context/journeyStore";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default AppRoutes;
