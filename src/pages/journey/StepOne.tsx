import AboutYourBike from "@/components/journey/step-one/AboutYourBike";
import BikeList from "@/components/journey/step-one/BikeList";
import BikeSecurity from "@/components/journey/step-one/BikeSecurity";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import RegularBanner from "@/components/shared/RegularBanner";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSafeContext, initialJourneyState } from "@/context/journeyStore";
import PreviousClaims from "@/components/journey/step-one/PreviousClaims";
import AwayValue from "@/components/journey/step-one/AwayValue";
import React, { useState } from "react";
import { modelAdaptorHelper } from "@/utils/modelAdaptorHelper";
import { seoTags } from "@/components/shared/SeoEdit";
import { Helmet } from "react-helmet-async";
import TopNavBlank from "@/components/shared/TopNavBlank";
import { Engine, Rule } from "json-rules-engine";
// import { useDisclosure } from "@mantine/hooks";

const StepOne = (): React.JSX.Element => {
  const [gState, setGState] = useSafeContext({
    componentName: "StepOne",
  });
  // const [opened, { close, open }] = useDisclosure(false);
  const { search } = useLocation();
  const [validateNextButton, setValidateNextButton] = useState(false);
  const [locationInvalid, setLocationInvalid] = useState(false);
  const [searched, setSearched] = useState(false);
  const sob = sessionStorage.getItem("sourceOfBusinessId");
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const policyReference = params.get("policyReference");
  const offerRules = sessionStorage.getItem("OfferRules");

  useEffect(() => {
    if (policyReference !== null) {
      sessionStorage.removeItem("context");
      setGState(initialJourneyState);
      sessionStorage.removeItem("context");
      navigate(`/get-a-quote`);
    }
  }, [policyReference, navigate, setGState]);

  useEffect(() => {
    seoTags(
      "Get-a-quote",
      "Receive a Competitive Bike Insurance Quote from Velosure Cycle Insurance | Quick, Comprehensive Bike Insurance Quote to Ensure You're Covered Where You Need it Most.",
      "",
    );
    return () => {
      seoTags("velosure ", "", "");
    };
  }, []);

  useEffect(() => {
    if (locationInvalid || gState.hasPreviousClaim) {
      setGState((prevState) => ({
        ...prevState,
        paymentCrumb: 0,
        generateQuote: true,
        yourQuoteCrumb: 0,
        yourCoverCrumb: 2,
        yourDetailsCrumb: 0,
      }));
    }
  }, [locationInvalid, gState.hasPreviousClaim, setGState]);

  useEffect(() => {
    const updatedState =
      modelAdaptorHelper.resetAssumptionsAndDeclarations(gState);
    setGState({
      ...updatedState,
      paymentCrumb: 0,
      generateQuote: true,
      yourQuoteCrumb: gState.yourQuoteCrumb === 2 ? 1 : gState.yourQuoteCrumb,
      yourCoverCrumb: 2,
      yourDetailsCrumb:
        gState.yourDetailsCrumb === 2 ? 1 : gState.yourDetailsCrumb,
      currentlyEditingABike: false,
      currentlyAddingABike: false,
      selectedCoreScheme: null,
    });
  }, []);

  const handleNextButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setValidateNextButton(true);
    setTimeout(function () {
      setValidateNextButton(false);
    }, 1000);
    if (gState.currentlyAddingABike) {
      const ele = document.getElementById("Add-this-bike");
      if (ele) ele.scrollIntoView({ behavior: "smooth", block: "center" });

      return;
    }
    if (gState.currentlyEditingABike) {
      const ele = document.getElementById("edit-this-bike");
      if (ele) ele.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (
      gState.bikes.length > 1 &&
      (gState.awayValue < 500 ||
        gState.awayValue > modelAdaptorHelper.getHomeValue(gState.bikes))
    ) {
      const ele = document.getElementById("awayValue");
      if (ele) ele.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (gState.hasPreviousClaim === null) {
      const ele = document.getElementById("has-previous-claim");
      ele?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (
      offerRules !== null &&
      offerRules?.length > 1 &&
      offerRules !== "null" &&
      !searched
    ) {
      const engine = new Engine();
      const rule = JSON.parse(offerRules);
      engine.addRule(
        new Rule({
          conditions: {
            all: [rule],
          },
          event: {
            type: "rule-passed",
            params: {
              result: true,
            },
          },
        }),
      );

      engine.run(gState).then((e: any) => {
        if (e.results.some((s: any) => s.result)) {
          setSearched(true);
          if (gState.validatedRules === true) {
            handleNextPage();
            return;
          }
          setGState({
            ...gState,
            marketingReference: null,
            sourceOfBusinessId: null,
            customSource: false,
            disableSOB: false,
            validatedRules: true,
          });
          handleNextPage();
          return;
        } else {
          handleSetSob();
          return;
        }
      });
    } else if (
      sob !== null &&
      !searched &&
      gState.sourceOfBusinessId === null
    ) {
      handleSetSob();
      return;
    } else if (sob !== null) {
      handleNextPage();
      return;
    } else {
      setGState({
        ...gState,
        sourceOfBusinessId: null,
        customSource: false,
        disableSOB: false,
        validatedRules: true,
      });
      handleNextPage();
      return;
    }
  };

  function handleSetSob() {
    setSearched(true);
    setGState({
      ...gState,
      sourceOfBusinessId: sob,
      customSource: false,
      disableSOB: true,
      validatedRules: false,
      marketingReference: "",
    });
    handleNextPage();
  }

  function handleNextPage() {
    navigate(`/stepTwo${search}`);
    setValidateNextButton(false);
    window.scrollTo(0, 0);
  }

  return (
    <div className="pr oh blueBorderBott">
      <Helmet>
        <link rel="canonical" href="https://www.velosure.co.uk/get-a-quote" />
      </Helmet>
      <TopNavBlank />
      <RegularBanner
        headlineLine1={"Your bike "}
        headlineLine2={"insurance quote"}
        subheadlineLine1={"Tell us about you, your bike and cover you need."}
        subheadlineLine2={""}
        hasCTA={"false"}
        CTAText={"Get a quote"}
      />

      <Breadcrumbs
        // currentPage="yourCover"
        navigationAction={() =>
          handleNextButton({} as React.MouseEvent<HTMLButtonElement>)
        }
      />

      <BikeList validateNextButton={validateNextButton} />

      <AboutYourBike validateNextButton={validateNextButton} />

      {gState.bikes.length > 1 && (
        <AwayValue validateNextButton={validateNextButton} />
      )}

      <BikeSecurity setLocationInvalid={setLocationInvalid} />

      <PreviousClaims validateNextButton={validateNextButton} />

      <div className="container container_narrow ">
        <div className="row">
          <div className="col-12 mb-4 mt-5">
            {locationInvalid === false && gState.hasPreviousClaim !== null && (
              <button
                id="move-to-step-two"
                className="btn btn-wider btn-green float-end mb-2 lufga-medium"
                onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                  await handleNextButton(e as any);
                }}
              >
                Next step
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
