import { useEffect, useState } from "react";
import CardPay from "./CardPay";
import QuickPay from "./QuickPay";
import { useFormik } from "formik";
import currency from "currency.js";
import * as Yup from "yup";
import valid from "card-validator";
import "./AnnualPayment.css";
import CardPayments from "./CardPayments";
import PaymentData from "./PaymentData";
import { type SinglePaymentProps } from "@/models/JourneyComponentTypes";

const SinglePayment = ({
  successMethod,
  failureMethod,
  gState,
  uiLock,
  threeDS,
  ddPayment,
}: SinglePaymentProps) => {
  const [paymentError, setPaymentError] = useState("");
  const [qPaymentError, setQPaymentError] = useState("");
  const [messageTriggered, setMessageTrigger] = useState(null);

  const paymentData = new PaymentData();

  function lockUI(display) {
    uiLock(display);
  }

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardExpiry: null,
      cardCVN: "",
      cardHolderName: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required("Card Number is required")
        .min(15, "Card Number is too short")
        .max(19, "Card Number is too long")
        .test(
          "test-number",
          "Credit Card number is invalid",
          (value) => valid.number(value).isValid,
        ),
      cardExpiry: Yup.date()
        .nullable()
        .required("Please select the date that you would like cover to start."),
      cardCVN: Yup.string()
        .required("CVV is required")
        .min(3, "CVV is too short")
        .max(4, "CVV is too long"),
      cardHolderName: Yup.string()
        .required("Cardholder Name required")
        .min(2, "Cardholder Name is too short"),
    }),
    onSubmit: (values, { resetForm }) => {
      let expiryMonth = 0;
      let expiryYear = 0;

      if (values.cardExpiry) {
        expiryMonth = values.cardExpiry.getMonth() + 1;
        expiryYear = values.cardExpiry.getFullYear();
      }

      populatePaymentData(
        values.cardNumber,
        expiryMonth,
        expiryYear,
        values.cardCVN,
        values.cardHolderName,
      );

      uiLock(true);
      CardPayments.processPayment(paymentData.forPost())
        .then((result) => {
          if (!CheckForError(result)) {
            if (result.requiresChallenge) {
              CardPayments.trigger3dsChallenge(
                "payment-iframe-payments",
                result,
              );
              threeDS(true);
            } else {
              threeDS(false);
              if (
                result.responseCode === "SUCCESS" &&
                result.isErrored === false
              ) {
                successMethod(result);
              } else {
                uiLock(false);
                paymentData.incrementRetries();
                setPaymentError(result.responseMessage);
                failureMethod(result.responseMessage);
              }
            }
          }
        })
        .catch((err) => {
          resetForm({ values: "" });
          paymentData.incrementRetries();
          uiLock(false);
          threeDS(false);
          failureMethod(err);
          setPaymentError(err.message);
        });
    },
  });

  const CheckForError = (result) => {
    if (result.isErrored) {
      setPaymentError("Something went wrong, please try again");
      uiLock(false);
      failureMethod(result.errorMessage);
      return true;
    }

    setPaymentError("");
    return false;
  };

  useEffect(() => {
    window.addEventListener("message", (e) => messageTrig(e));
    return () => {
      window.removeEventListener("message", (e) => messageTrig(e));
    };
  }, []);

  function messageTrig(e) {
    if (e.origin === import.meta.env.VITE_PAYMENTS_API_PATH) {
      if (e.data.transStatus === "Y") {
        setMessageTrigger(e);
      } else {
        uiLock(false);
        setPaymentError("3DS Auth was not completed");
        paymentData.incrementRetries();
        failureMethod("3DS Auth was not completed");
      }
    } else {
      uiLock(false);
    }
  }

  function populatePaymentData(number, expMonth, expYear, cvn, holder) {
    var lineOne = `${
      gState?.organisation?.length >= 1 ? gState.organisation.trim() : ""
    } ${gState.subHouseName?.length >= 1 ? gState.subHouseName.trim() : ""} ${
      gState.houseName?.length >= 1 ? gState.houseName.trim() : ""
    } ${gState.houseNo?.length >= 1 ? gState.houseNo.trim() : ""} ${
      gState.addressLine1
    } `.trim();

    paymentData.setPaymentData(
      gState.quoteReference,
      gState !== null
        ? currency(
            ddPayment === true ? gState.deposit : gState.annualGrossPremium,
            { symbol: "", separator: "," },
          ).format()
        : "0.00",
      "GBP",
      number,
      expMonth,
      expYear,
      cvn,
      holder,
    );
    paymentData.setAddressData(
      lineOne,
      gState.addressLine2,
      gState.addressLine3,
      gState.addressLine4,
      gState.postcode,
    );
  }

  useEffect(() => {
    let expiryMonth = 0;
    let expiryYear = 0;

    if (formik.values.cardExpiry) {
      expiryMonth = formik.values.cardExpiry.getMonth() + 1;
      expiryYear = formik.values.cardExpiry.getFullYear();
    }

    populatePaymentData(
      formik.values.cardNumber,
      expiryMonth,
      expiryYear,
      formik.values.cardCVN,
      formik.values.cardHolderName,
    );

    if (messageTriggered != null) {
      paymentData.setRetryData(
        messageTriggered.data.transStatus === "Y",
        messageTriggered.data.threeDSServerTransID,
      );
      CardPayments.processPayment(paymentData.forPost())
        .then((result) => {
          if (!CheckForError(result)) {
            if (result.requiresChallenge) {
              CardPayments.trigger3dsChallenge(
                "payment-iframe-payments",
                result,
              );
              threeDS(true);
            } else {
              threeDS(false);
              if (
                result.responseCode === "SUCCESS" &&
                result.isErrored === false
              ) {
                successMethod(result);
              } else {
                uiLock(false);
                paymentData.incrementRetries();
                setPaymentError(result.responseMessage);
                failureMethod(result.responseMessage);
              }
            }
          }
        })
        .catch((err) => {
          formik.resetForm({ values: "" });
          paymentData.incrementRetries();
          uiLock(false);
          threeDS(false);
          failureMethod(err);
          setPaymentError(err.message);
        });

      paymentData.setRetryData(false, "");
    }
  }, [messageTriggered]);

  return (
    <div>
      <div className="d-flex justify-content-center">
        {!ddPayment && (
          <h4>
            {"Card Details "}{" "}
            <span className="blueFont">
              Annual Payment - £{" "}
              {currency(gState.annualGrossPremium, {
                symbol: "",
                separator: ",",
              }).format()}
            </span>
          </h4>
        )}
        {ddPayment && (
          <h4>
            {"Card Details "}{" "}
            <span className="blueFont">
              Deposit - £{" "}
              {currency(gState.deposit, {
                symbol: "",
                separator: ",",
              }).format()}{" "}
            </span>
          </h4>
        )}
      </div>
      {(import.meta.env.VITE_Enable_GPAY === "true" ||
        import.meta.env.VITE_Enable_APPLEPAY === "true" ||
        import.meta.env.VITE_Enable_PAYPAL === "true") && (
        <>
          <QuickPay
            PaymentData={paymentData.forPost()}
            successMethod={successMethod}
            failureMethod={failureMethod}
            uiLock={lockUI}
            gState={gState}
            errorMessage={setQPaymentError}
            ddPayment={ddPayment}
          />
          <div className="row" hidden={qPaymentError === ""}>
            <div className="col-12 mt-3 mb-5">
              <p className="card-error-message">{qPaymentError}</p>
            </div>
          </div>
          <hr className="hr-divider" data-content="OR" />
        </>
      )}
      <CardPay formik={formik} />
      <p className="card-error-message" hidden={paymentError === ""}>
        {paymentError}
      </p>
    </div>
  );
};

export default SinglePayment;
