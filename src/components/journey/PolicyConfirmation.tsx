import TopNavBlank from "@/components/shared/TopNavBlank";
import RegularBanner from "@/components/shared/RegularBanner";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import { initialJourneyState } from "@/context/journeyStore";
import currency from "currency.js";
import CompletedBreadcrumbs from "@/components/shared/CompletedBreadcrumbs";
import type { JourneyState } from "@/models";

import policyConfirmationSuccessIcon from "@/assets/svgs/policy-confirmation-success-icon.svg?url";

const PolicyConfirmation = () => {
  const [gState, setGState] = useSafeContext({
    componentName: "PolicyConfirmation",
  });
  const [state, setState] = useState<JourneyState | null>(null);
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const policyReference = params.get("policyReference");

  useEffect(() => {
    if (state === null) {
      setState(gState);
    }
    setGState(initialJourneyState);
    sessionStorage.removeItem("context");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!policyReference) {
    navigate(`/`);
  }
  if (state === null) {
    return <></>;
  }
  if (state !== null && state.annualGrossPremium < 1) {
    navigate(`/`);
  }
  return (
    <>
      <div className="container-fluid mb-5 blueBorderBott">
        <TopNavBlank />
        <RegularBanner
          headlineLine1={"Your bike insurance quote"}
          headlineLine2={""}
          subheadlineLine1={"Tell us about you, your bike and cover you need."}
          subheadlineLine2={""}
          hasCTA={"false"}
          CTAText={"Get a quote"}
        />
        <CompletedBreadcrumbs />
        <section
          className="container container_narrow mb-4"
          id="confirmation-section"
        >
          <div className="content_section mt-3 ">
            <div className="greenBox">
              <div className="row">
                <div className="col-12">
                  <h2></h2>
                  <h2>
                    {state.paymentTypeIsAnnual
                      ? "Thank you! Your payment was successful."
                      : "Thank you! Your Direct Debit has been successfully setup."}
                  </h2>
                  <img
                    src={policyConfirmationSuccessIcon}
                    alt="Success"
                    className="mt-5 mb-5"
                  />
                  <h1>You're all set!</h1>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-sm-6 mt-5 whatNext">
                <h2 className="blueFont">So, what next?</h2>
                <p>
                  You should shortly receive an email confirming your details
                  and cover.
                </p>
                <p>
                  In the meantime, why not check out what's been happening in
                  the cycling world and drop by our{" "}
                  <Link to="/Pitstop">blog</Link> page.
                </p>
              </div>
              <div className="col-12 col-sm-6 mt-5">
                <div className="bordered">
                  <h4>
                    Policy <span className="blueFont">details</span>.
                  </h4>
                  <div className="row d-none d-lg-block">
                    <div className="row">
                      <div className="col-6 align-left">
                        <p>Policy reference</p>
                        <p>Name</p>
                        <p>Payment type</p>
                        <p hidden={!state.paymentTypeIsAnnual}>Paid</p>
                        <p hidden={state.paymentTypeIsAnnual}>Deposit Paid</p>
                        <p hidden={state.paymentTypeIsAnnual}>
                          First Instalment
                        </p>
                        <p hidden={state.paymentTypeIsAnnual}>
                          Subsequent Payments
                        </p>
                      </div>
                      <div className="col-6 blueFont align-right">
                        <p>{policyReference}</p>
                        <p>
                          {state.forename} {state.surname}
                        </p>
                        <p>
                          {state.paymentTypeIsAnnual ? "Annual" : "Monthly"}
                        </p>
                        <p hidden={!state.paymentTypeIsAnnual}>
                          £
                          {currency(state.annualGrossPremium, {
                            symbol: "",
                            separator: ",",
                          }).format()}
                        </p>
                        <p hidden={state.paymentTypeIsAnnual}>
                          £
                          {currency(state.deposit, {
                            symbol: "",
                            separator: ",",
                          }).format()}
                        </p>
                        <p hidden={state.paymentTypeIsAnnual}>
                          £
                          {currency(state.instalmentsFirstPayment, {
                            symbol: "",
                            separator: ",",
                          }).format()}
                        </p>
                        <p hidden={state.paymentTypeIsAnnual}>
                          £
                          {currency(state.instalmentsSubsequentPayments, {
                            symbol: "",
                            separator: ",",
                          }).format()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row d-block d-lg-none">
                    <div className="col-12 align-left">
                      <p>Policy reference</p>
                      <p className="blueFont">{policyReference}</p>
                      <p>Name</p>
                      <p className="blueFont">
                        {state.forename} {state.surname}
                      </p>
                      <p>Payment type</p>
                      <p className="blueFont">
                        {state.paymentTypeIsAnnual ? "Annual" : "Monthly"}
                      </p>
                      <p hidden={!state.paymentTypeIsAnnual}>Paid</p>
                      <p
                        className="blueFont"
                        hidden={!state.paymentTypeIsAnnual}
                      >
                        £
                        {state.paymentTypeIsAnnual
                          ? currency(state.annualGrossPremium, {
                              symbol: "",
                              separator: ",",
                            }).format()
                          : currency(state.instalmentsFirstPayment, {
                              symbol: "",
                              separator: ",",
                            }).format()}
                      </p>
                      <p hidden={state.paymentTypeIsAnnual}>Deposit Paid</p>
                      <p
                        className="blueFont"
                        hidden={state.paymentTypeIsAnnual}
                      >
                        £
                        {currency(state.deposit, {
                          symbol: "",
                          separator: ",",
                        }).format()}
                      </p>
                      <p hidden={state.paymentTypeIsAnnual}>First Instalment</p>
                      <p
                        className="blueFont"
                        hidden={state.paymentTypeIsAnnual}
                      >
                        £
                        {currency(state.instalmentsFirstPayment, {
                          symbol: "",
                          separator: ",",
                        }).format()}
                      </p>
                      <p hidden={state.paymentTypeIsAnnual}>
                        Subsequent Payments
                      </p>
                      <p
                        className="blueFont"
                        hidden={state.paymentTypeIsAnnual}
                      >
                        £
                        {currency(state.instalmentsSubsequentPayments, {
                          symbol: "",
                          separator: ",",
                        }).format()}
                      </p>
                    </div>
                    <div className="col-6 blueFont align-right"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PolicyConfirmation;
