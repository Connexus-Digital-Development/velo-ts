// import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import { useContext, useState } from "react";
import { JourneyContext } from "@/context/journeyStore";
import MonthlyPayments from "./MonthlyPayments";
import OneOffPayment from "./OneOffPayment";
import { PaymentMethodSelectorProps } from "@/models/JourneyComponentTypes";

const PaymentMethodSelector = ({
  setShowPaymentWindow,
}: PaymentMethodSelectorProps) => {
  const [state, setState] = useContext(JourneyContext);
  const [isMonthly, setIsMonthly] = useState(!state.paymentTypeIsAnnual);
  const [isAnnual, setIsAnnual] = useState(state.paymentTypeIsAnnual);

  return (
    <section className="container container_narrow ">
      <div className="content_section mt-3" id="paymentButtons">
        <h2 className="blueFont mb-4 lugga-medium font-27">Payment</h2>
        <p className="lufga-light font-17">
          How would you like to pay for your policy?
        </p>
        <div className="row mb-3">
          <div className="col-6 col-md-3">
            <button
              type="button"
              onClick={(_e) => {
                setIsMonthly(true);
                setIsAnnual(false);
                setShowPaymentWindow?.(false);
                setState({ ...state, paymentTypeIsAnnual: false });
              }}
              className={
                isMonthly === true
                  ? "btn btn-secondary btn-100 m-1 primaryFocussed"
                  : "btn btn-secondary btn-100 m-1"
              }
            >
              Monthly
            </button>
          </div>
          <div className="col-6 col-md-3">
            <button
              type="button"
              onClick={(_e) => {
                setIsAnnual(true);
                setIsMonthly(false);
                setShowPaymentWindow?.(false);
                setState({ ...state, paymentTypeIsAnnual: true });
              }}
              className={
                isAnnual === true
                  ? "btn btn-secondary btn-100 m-1 primaryFocussed"
                  : "btn btn-secondary btn-100 m-1"
              }
            >
              Annually
            </button>
          </div>
        </div>
        {state.paymentSuccessful === false && isAnnual && <OneOffPayment />}

        {state.paymentSuccessful === false && isMonthly && <MonthlyPayments />}

        {state.clickedPayNow && state.paymentTypeIsAnnual === null && (
          <small className="redFont mt-1">
            Please select your preferred payment method.
          </small>
        )}
      </div>
    </section>
  );
};

export default PaymentMethodSelector;
