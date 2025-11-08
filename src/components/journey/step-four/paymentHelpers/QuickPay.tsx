import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import GooglePayButton from "@google-pay/button-react";
import ApplePayments from "./ApplePayments";
import GooglePayments from "./GooglePayments";
import PaypalPayments from "./PaypalPayments";
import { useState } from "react";
import { type QuickPayProps } from "@/models/JourneyComponentTypes";

const QuickPay = ({
  PaymentData,
  successMethod,
  failureMethod,
  uiLock,
  gState,
  errorMessage,
  ddPayment,
}: QuickPayProps) => {
  const [applePayErrored, setApplePayErrored] = useState(false);
  function getPaymentValue() {
    return gState !== null
      ? ddPayment === true
        ? gState.deposit
        : gState.annualGrossPremium
      : "0.00";
  }

  const getApplePaySession = async (urlSession) => {
    try {
      // Call your own server to request a new merchant session.
      const response = await ApplePayments.validateSession(urlSession);
      return response.token;
    } catch (error) {
      errorMessage(
        "Something went wrong processing your apple pay request please try again",
      );
      failureMethod(
        "Something went wrong processing your apple pay " +
          JSON.stringify(error),
      );
      ApplePayments.logError(JSON.stringify(error), gState.quoteReference, {
        payment: {
          card: {},
          amount: getPaymentValue(),
          currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
        },
      });
    }
  };

  function onApplePayButtonClicked() {
    try {
      if (!window.ApplePaySession) {
        errorMessage("Apple pay not support on this device");
        failureMethod("Apple pay not support on this device");
        return;
      }

      // Define ApplePayPaymentRequest
      const request = {
        countryCode: "GB",
        currencyCode: "GBP",
        merchantCapabilities: ["supports3DS"],
        supportedNetworks: ["visa", "masterCard", "amex", "discover"],
        total: {
          label: "Velosure Payment",
          type: "final",
          amount: getPaymentValue(),
        },
      };

      // Create ApplePaySession
      const session = new window.ApplePaySession(3, request);

      session.onvalidatemerchant = async (event) => {
        // Call your own server to request a new merchant session.
        const merchantSession = await getApplePaySession(event.validationURL);
        session.completeMerchantValidation(JSON.parse(merchantSession));
      };

      session.onpaymentauthorized = async (event) => {
        const paymentInfo = event.payment;
        processApplePayment(
          gState.quoteReference,
          paymentInfo,
          {
            payment: {
              card: {},
              amount: getPaymentValue(),
              currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
            },
          },
          session,
        );
      };

      session.oncancel = () => {
        if (applePayErrored) {
          setApplePayErrored(false);
          return;
        }
        errorMessage("Apple pay Window Closed by User");
        ApplePayments.logCancellation(gState.quoteReference, {
          payment: {
            card: {},
            amount: getPaymentValue(),
            currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
          },
        });
      };

      session.begin();
    } catch (error) {
      errorMessage(
        "Something went wrong processing your apple pay request please try again",
      );
      failureMethod(
        "Something went wrong processing your apple pay " +
          JSON.stringify(error),
      );
      ApplePayments.logError(JSON.stringify(error), gState.quoteReference, {
        payment: {
          card: {},
          amount: getPaymentValue(),
          currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
        },
      });
    }
  }

  /**
   * To finalize the transaction, you need to pass the encrypted payment token
   * to your payment processor using their API.
   */
  const processApplePayment = (orderRef, tokenData, PaymentData, session) => {
    try {
      ApplePayments.processPayment(orderRef, tokenData, PaymentData)
        .then((json) => {
          if (json.responseCode == "SUCCESS") {
            const result = {
              status: window.ApplePaySession.STATUS_SUCCESS,
            };
            session.completePayment(result);
            successMethod(json);
          } else {
            const result = {
              status: window.ApplePaySession.STATUS_FAILURE,
            };
            setApplePayErrored(true);
            errorMessage(
              "Something went wrong processing your apple pay request please try again",
            );
            failureMethod(
              "Something went wrong processing your apple pay " +
                JSON.stringify(json),
            );
            ApplePayments.logError(
              JSON.stringify(json),
              gState.quoteReference,
              {
                payment: {
                  card: {},
                  amount: getPaymentValue(),
                  currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
                },
              },
            );
            session.completePayment(result);
          }
        })
        .catch((err) => {
          const result = {
            status: window.ApplePaySession.STATUS_FAILURE,
          };
          setApplePayErrored(true);
          errorMessage(
            "Something went wrong processing your apple pay request please try again",
          );
          failureMethod(
            "Something went wrong processing your apple pay " +
              JSON.stringify(err),
          );
          ApplePayments.logError(JSON.stringify(err), gState.quoteReference, {
            payment: {
              card: {},
              amount: getPaymentValue(),
              currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
            },
          });
          session.completePayment(result);
        });
    } catch (error) {
      const result = {
        status: window.ApplePaySession.STATUS_FAILURE,
      };
      setApplePayErrored(true);
      errorMessage(
        "Something went wrong processing your apple pay request please try again",
      );
      failureMethod(
        "Something went wrong processing your apple pay " +
          JSON.stringify(error),
      );
      ApplePayments.logError(JSON.stringify(error), gState.quoteReference, {
        payment: {
          card: {},
          amount: getPaymentValue(),
          currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
        },
      });
      session.completePayment(result);
    }
  };

  return (
    <div className=" row">
      <div className=" col-md-6">
        <p>Quick Pay Options:</p>
      </div>
      <div className=" col-md-6">
        {import.meta.env.VITE_Enable_GPAY === "true" && (
          <GooglePayButton
            environment={
              import.meta.env.VITE_PAYMENTS_TEST_MODE === "false"
                ? "PRODUCTION"
                : "TEST"
            }
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "globalpayments",
                      gatewayMerchantId: import.meta.env
                        .VITE_GOOGLEPAY_GATEWAYMERCHANTID,
                    },
                  },
                },
              ],

              merchantInfo: {
                merchantId: import.meta.env.VITE_PAYMENTS_MERCHANT_ID,
                merchantName: import.meta.env.VITE_PAYMENTS_SITE_NAME,
              },
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPriceLabel: "Total",
                totalPrice: getPaymentValue(),
                currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
                countryCode: import.meta.env.VITE_PAYMENTS_COUNTRY_CODE,
              },
            }}
            onLoadPaymentData={(paymentRequest) => {
              uiLock(true);
              GooglePayments.processPayment(
                gState.quoteReference,
                paymentRequest,
                {
                  payment: {
                    card: {},
                    amount: getPaymentValue(),
                    currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
                  },
                },
              )
                .then((json) => {
                  if (json.responseCode == "SUCCESS") {
                    successMethod(json);
                  } else {
                    errorMessage(
                      "Something went wrong processing your google pay request please try again",
                    );
                    failureMethod(
                      "Something went wrong processing your google pay " +
                        JSON.stringify(json),
                    );
                    GooglePayments.logError(
                      JSON.stringify(json),
                      gState.quoteReference,
                      {
                        payment: {
                          card: {},
                          amount: getPaymentValue(),
                          currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
                        },
                      },
                    );
                    uiLock(false);
                  }
                })
                .catch((err) => {
                  errorMessage(
                    "Something went wrong processing your google pay request please try again",
                  );
                  GooglePayments.logError(
                    JSON.stringify(err),
                    gState.quoteReference,
                    {
                      payment: {
                        card: {},
                        amount: getPaymentValue(),
                        currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
                      },
                    },
                  );
                  failureMethod(
                    "Something went wrong processing your google pay " +
                      JSON.stringify(err),
                  );
                  uiLock(false);
                });
            }}
            onCancel={(_reason) => {
              errorMessage("Google Window Closed by User");
              GooglePayments.logCancellation(gState.quoteReference, {
                payment: {
                  card: {},
                  amount: getPaymentValue(),
                  currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
                },
              });
              uiLock(false);
            }}
          />
        )}
        {import.meta.env.VITE_Enable_PAYPAL === "true" && (
          <PayPalScriptProvider
            options={{
              "client-id": import.meta.env.VITE_PAYPAL_CLIENT,
              currency: PaymentData.payment.currencyCode,
            }}
          >
            <PayPalButtons
              style={{ layout: "horizontal", tagline: "false" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: getPaymentValue(),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  uiLock(true);
                  PaypalPayments.processPayment(
                    details,
                    gState.quoteReference,
                    PaymentData.payment.amount,
                  )
                    .then((json) => {
                      if (json.responseCode == "SUCCESS") {
                        successMethod(json);
                      } else {
                        errorMessage(
                          "Something went wrong processing your paypal request please try again",
                        );
                        failureMethod(
                          "Something went wrong processing your paypal " +
                            JSON.stringify(json),
                        );
                      }
                    })
                    .catch((err) => {
                      errorMessage(
                        "Something went wrong processing your paypal request please try again",
                      );
                      failureMethod(
                        "Something went wrong processing your paypal " +
                          JSON.stringify(err),
                      );
                    });
                });
              }}
              onCancel={(_reason) => {
                errorMessage("Paypal Window Closed by User");
                PaypalPayments.logCancellation(
                  gState.quoteReference,
                  PaymentData.payment.amount,
                );
                uiLock(false);
              }}
              onError={(reason) => {
                errorMessage(
                  "Something went wrong processing your paypal request please try again",
                );
                failureMethod(
                  "Something went wrong processing your paypal " +
                    JSON.stringify(reason),
                );
                PaypalPayments.logError(
                  reason,
                  gState.quoteReference,
                  PaymentData.payment.amount,
                );
                uiLock(false);
              }}
            />
          </PayPalScriptProvider>
        )}

        {import.meta.env.VITE_Enable_APPLEPAY === "true" &&
          window.ApplePaySession && (
            <div class="apple-pay">
              <button
                lang="US"
                class="apple-pay buy"
                onClick={onApplePayButtonClicked}
              ></button>
            </div>
          )}
      </div>
    </div>
  );
};

export default QuickPay;
