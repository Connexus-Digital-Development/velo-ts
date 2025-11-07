import { Route, Routes as RouterRoutes } from "react-router-dom";
import Home from "@pages/marketing/Home";
// import MakeAComplaint from "@pages/marketing/MakeAComplaint";
// import OurCoverLevels from "@pages/marketing/OurCoverLevels";
// import FullBlog from "@pages/marketing/FullBlog";
// import Pitstop from "@pages/marketing/Pitstop";
// import PolicyInformation from "@pages/marketing/PolicyInformation";
// import ReferAFriend from "@pages/marketing/ReferAFriend";
// import RetailerAffiliate from "@pages/marketing/RetailerAffiliate";
// import Reviews from "@pages/marketing/Reviews";
// import SecurityRequirements from "@pages/marketing/SecurityRequirements";
// import SubmitAClaim from "@pages/marketing/SubmitAClaim";
// // import BrandAmbassador from "@pages/BRAND_AMBASSADOR/BrandAmbassador";
// import "./CSS/site.css";
// import Payment from "@/components/journey/aggregator/Payment";
// import QuoteSummary from "@pages/journey/QuoteSummary";
// import InceptFailed from "@/components/journey/InceptFailed";
// import PaymentError from "@/components/journey/PaymentError";
// import PolicyConfirmation from "@/components/journey/PolicyConfirmation";
// import QuoteReferred from "@/components/journey/QuoteReferred";
// import QRLandingPage from "@pages/journey/QRLandingPage";
// import QRPayment from "@/components/journey/quote-retrieval/QRPayment";
// import QRQuoteSummary from "@/components/journey/quote-retrieval/QRQuoteSummary";
// import StepFour from "@pages/journey/StepFour";
// import StepOne from "@pages/journey/StepOne";
// import StepThree from "@pages/journey/StepThree";
// import StepTwo from "@pages/journey/StepTwo";
// import AccessoryCover from "@pages/marketing/AccessoryCover";
// import CookiePolicy from "@pages/legal/CookiePolicy";
// import EBikeCover from "@pages/marketing/EBikeCover";
// import MultiBikeCover from "@pages/marketing/MultiBikeCover";
// import SingleBikeCover from "@pages/marketing/SingleBikeCover";
// import Privacy from "@pages/legal/Privacy";
// import TermsAndConditions from "@pages/legal/TermsAndConditions";
// import Travel from "@pages/marketing/Travel";
// import VulnerabilityPolicy from "@pages/legal/VulnerabilityPolicy";
// import Redirector from "@/redirector";
// import AboutUs from "@pages/marketing/AboutUs";

const AppRoutes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      {/* =======================================JOURNEY ROUTES =============================*/}

      {/*<Route exact path="/get-a-quote">
        <journeyStore>
          <StepOne />
        </journeyStore>
      </Route>
      <Route exact path="/StepOne">
        <journeyStore>
          <StepOne />
        </journeyStore>
      </Route>
      <Route exact path="/StepTwo">
        <journeyStore>
          <StepTwo />
        </journeyStore>
      </Route>
      <Route exact path="/StepThree">
        <journeyStore>
          <StepThree />
        </journeyStore>
      </Route>
      <Route exact path="/StepFour">
        <journeyStore>
          <StepFour />
        </journeyStore>
      </Route>
      <Route exact path="/PolicyConfirmation">
        <journeyStore>
          <PolicyConfirmation />
        </journeyStore>
      </Route>
      <Route exact path="/QuoteReferred">
        <journeyStore>
          <QuoteReferred />
        </journeyStore>
      </Route>
      <Route exact path="/PaymentError">
        <journeyStore>
          <PaymentError />
        </journeyStore>
      </Route>
      <Route exact path="/InceptFailed">
        <InceptFailed />
      </Route>*/}

      {/* =======================================Aggregator ROUTES =============================*/}
      {/*<Route exact path="/aggregator/:id">
        <journeyStore>
          <QuoteSummary />
        </journeyStore>
      </Route>

      <Route exact path="/payment">
        <journeyStore>
          <Payment />
        </journeyStore>
      </Route>*/}
      {/* =======================================QR ROUTES =============================*/}
      {/*
      <Route exact path="/QuoteRetrieval">
        <journeyStore>
          <QRLandingPage />
        </journeyStore>
      </Route>
      <Route exact path="/QuoteRetrievalSummary">
        <journeyStore>
          <QRQuoteSummary />
        </journeyStore>
      </Route>

      <Route exact path="/QuoteRetrievalPayment">
        <journeyStore>
          <QRPayment />
        </journeyStore>
      </Route>*/}
      {/* =======================================MAIN SITE ROUTES =============================*/}
      {/*<Route exact path="/about">
        <AboutUs />
      </Route>
      <Route exact path="/contact">
        <ContactUs />
      </Route>
      <Route exact path="/SubmitAClaim">
        <SubmitAClaim />
      </Route>
      <Route exact path="/MakeAComplaint">
        <MakeAComplaint />
      </Route>
      <Route exact path="/ReferAFriend">
        <ReferAFriend />
      </Route>*/}
      {/* <Route exact path="/BrandAmbassador">
        <BrandAmbassador />
      </Route> */}
      {/*<Route exact path="/policy-information">
        <PolicyInformation />
      </Route>
      <Route exact path="/security-requirements">
        <SecurityRequirements />
      </Route>
      <Route exact path="/bicycle-insurance-faqs">
        <FAQ />
      </Route>
      <Route exact path="/OurCoverLevels">
        <OurCoverLevels />
      </Route>
      <Route exact path="/Reviews">
        <Reviews />
      </Route>
      {
        <Route exact path="/bike-insurance-comparison-chart">
          <CoverComparison />
        </Route>
      }
      <Route exact path="/types-we-cover">
        <BikesWeCover />
      </Route>
      <Route exact path="/bicycle-travel-insurance">
        <Travel />
      </Route>
      <Route exact path="/Pitstop">
        <Pitstop />
      </Route>
      <Route path="/FullBlog/:id">
        <FullBlog />
      </Route>

      <Route exact path="/affiliate-scheme">
        <RetailerAffiliate />
      </Route>

      <Route exact path="/single-bike-insurance">
        <SingleBikeCover />
      </Route>
      <Route exact path="/multi-bike-insurance">
        <MultiBikeCover />
      </Route>
      <Route exact path="/electric-bicycle-insurance">
        <EBikeCover />
      </Route>
      <Route exact path="/accessories-we-cover">
        <AccessoryCover />
      </Route>
      <Route exact path="/our-cover-levels">
        <OurCoverLevels />
      </Route>
      <Route exact path="/Privacy">
        <Privacy />
      </Route>
      <Route exact path="/Cookies">
        <CookiePolicy />
      </Route>
      <Route exact path="/Terms">
        <TermsAndConditions />
      </Route>
      <Route exact path="/VulnerabilityPolicy">
        <VulnerabilityPolicy />
      </Route>
      <Route component={Redirector} />*/}
    </RouterRoutes>
  );
};

export default AppRoutes;
