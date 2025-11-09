import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import GooglePayButton from "@google-pay/button-react";
// import ApplePayments from "./ApplePayments";
// import PaymentSupport from "./PaymentSupport";
import {
  useProcessPaypalPayment,
  useCancelPaypalPayment,
  useLogPaypalError,
  useProcessGooglePayment,
  useCancelGooglePayment,
  useLogGoogleError,
  useProcessApplePayment,
  useValidateAppleSession,
  useCancelApplePayment,
  useLogAppleError,
} from "@/hooks/queries/usePayments";
import { useState } from "react";

// Auth data object for payment operations
const paymentAuthData = {
  merchant: import.meta.env.VITE_PAYMENTS_MERCHANT,
  account: import.meta.env.VITE_PAYMENTS_ACCOUNT,
  key: import.meta.env.VITE_PAYMENTS_KEY,
  appId: import.meta.env.VITE_PAYMENTS_API_TOKEN,
  appKey: import.meta.env.VITE_PAYMENTS_API_KEY,
  apiPath: `${import.meta.env.VITE_PAYMENTS_API_PATH}/api/payments`,
  testMode: import.meta.env.VITE_PAYMENTS_TEST_MODE === "true"
};

interface QuickPayProps {
  PaymentData: any;
  successMethod: (result: any) => void;
  failureMethod: (error: any) => void;
  uiLock: (lock: boolean) => void;
  gState: any; // TODO: Replace with proper JourneyState type when available
  errorMessage: (message: string) => void;
  ddPayment?: boolean;
}

interface ApplePayValidationEvent {
  validationURL: string;
}

interface ApplePayPaymentEvent {
  payment: any;
}

const typedAppleWindow = window as typeof window & {
  ApplePaySession: any;
};

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

  // Payment hooks
  const processPaypalMutation = useProcessPaypalPayment();
  const cancelPaypalMutation = useCancelPaypalPayment();
  const logPaypalErrorMutation = useLogPaypalError();

  const processGoogleMutation = useProcessGooglePayment();
  const cancelGoogleMutation = useCancelGooglePayment();
  const logGoogleErrorMutation = useLogGoogleError();

  const processAppleMutation = useProcessApplePayment();
  const validateAppleSessionMutation = useValidateAppleSession();
  const cancelAppleMutation = useCancelApplePayment();
  const logAppleErrorMutation = useLogAppleError();

  function getPaymentValue() {
    return gState !== null
      ? ddPayment === true
        ? gState.deposit
        : gState.annualGrossPremium
      : "0.00";
  }

  const getApplePaySession = async (urlSession: string) => {
    try {
      const response = await validateAppleSessionMutation.mutateAsync({
        appleUrl: urlSession,
        store: "Velosure",
        host: window.location.host,
      });
      return response.token;
    } catch (error) {
      errorMessage(
        "Something went wrong processing your apple pay request please try again",
      );
      failureMethod(
        "Something went wrong processing your apple pay " +
          JSON.stringify(error),
      );
      logAppleErrorMutation.mutate({
        authData: paymentAuthData,
        paymentRef: gState.quoteReference,
        payment: {
          card: {},
          amount: getPaymentValue(),
          currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
        },
        errorMessage: JSON.stringify(error),
      });
    }
  };

  function onApplePayButtonClicked() {
    try {
      if (!typedAppleWindow.ApplePaySession) {
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
      const session = new typedAppleWindow.ApplePaySession(3, request);

      session.onvalidatemerchant = async (event: ApplePayValidationEvent) => {
        // Call your own server to request a new merchant session.
        const merchantSession = await getApplePaySession(event.validationURL);
        session.completeMerchantValidation(JSON.parse(merchantSession));
      };

      session.onpaymentauthorized = async (event: ApplePayPaymentEvent) => {
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
        cancelAppleMutation.mutate({
          authData: paymentAuthData,
          paymentRef: gState.quoteReference,
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
      logAppleErrorMutation.mutate({
        authData: paymentAuthData,
        paymentRef: gState.quoteReference,
        payment: {
          card: {},
          amount: getPaymentValue(),
          currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
        },
        errorMessage: JSON.stringify(error),
      });
    }
  }

  /**
   * To finalize the transaction, you need to pass the encrypted payment token
   * to your payment processor using their API.
   */
  const processApplePayment = (
    orderRef: string,
    tokenData: any,
    PaymentData: any,
    session: any,
  ) => {
    try {
      processAppleMutation
        .mutateAsync({
          authData: paymentAuthData,
          token: JSON.stringify(tokenData.token.paymentData),
          paymentRef: orderRef,
          payment: PaymentData.payment,
        })
        .then((json) => {
          if (json.responseCode == "SUCCESS") {
            const result = {
              status: typedAppleWindow.ApplePaySession.STATUS_SUCCESS,
            };
            session.completePayment(result);
            successMethod(json);
          } else {
            const result = {
              status: typedAppleWindow.ApplePaySession.STATUS_FAILURE,
            };
            setApplePayErrored(true);
            errorMessage(
              "Something went wrong processing your apple pay request please try again",
            );
            failureMethod(
              "Something went wrong processing your apple pay " +
                JSON.stringify(json),
            );
            logAppleErrorMutation.mutate({
              authData: paymentAuthData,
              paymentRef: gState.quoteReference,
              payment: {
                card: {},
                amount: getPaymentValue(),
                currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
              },
              errorMessage: JSON.stringify(json),
            });
            session.completePayment(result);
          }
        })
        .catch((err) => {
          const result = {
            status: typedAppleWindow.ApplePaySession.STATUS_FAILURE,
          };
          setApplePayErrored(true);
          errorMessage(
            "Something went wrong processing your apple pay request please try again",
          );
          failureMethod(
            "Something went wrong processing your apple pay " +
              JSON.stringify(err),
          );
          logAppleErrorMutation.mutate({
            authData: paymentAuthData,
            paymentRef: gState.quoteReference,
            payment: {
              card: {},
              amount: getPaymentValue(),
              currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
            },
            errorMessage: JSON.stringify(err),
          });
          session.completePayment(result);
        });
    } catch (error) {
      const result = {
        status: typedAppleWindow.ApplePaySession.STATUS_FAILURE,
      };
      setApplePayErrored(true);
      errorMessage(
        "Something went wrong processing your apple pay request please try again",
      );
      failureMethod(
        "Something went wrong processing your apple pay " +
          JSON.stringify(error),
      );
      logAppleErrorMutation.mutate({
        authData: paymentAuthData,
        paymentRef: gState.quoteReference,
        payment: {
          card: {},
          amount: getPaymentValue(),
          currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
        },
        errorMessage: JSON.stringify(error),
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
            onLoadPaymentData={async (paymentRequest) => {
              uiLock(true);
              try {
                const json = await processGoogleMutation.mutateAsync({
                  authData: paymentAuthData,
                  token:
                    paymentRequest.paymentMethodData.tokenizationData.token,
                  paymentRef: gState.quoteReference,
                  payment: {
                    card: {},
                    amount: getPaymentValue(),
                    currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
                  },
                });

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
                  logGoogleErrorMutation.mutate({
                    authData: paymentAuthData,
                    paymentRef: gState.quoteReference,
                    payment: {
                      card: {},
                      amount: getPaymentValue(),
                      currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
                    },
                    errorMessage: JSON.stringify(json),
                  });
                  uiLock(false);
                }
              } catch (err) {
                errorMessage(
                  "Something went wrong processing your google pay request please try again",
                );
                logGoogleErrorMutation.mutate({
                  authData: paymentAuthData,
                  paymentRef: gState.quoteReference,
                  payment: {
                    card: {},
                    amount: getPaymentValue(),
                    currencyCode: import.meta.env.VITE_PAYMENTS_CURRENCY,
                  },
                  errorMessage: JSON.stringify(err),
                });
                failureMethod(
                  "Something went wrong processing your google pay " +
                    JSON.stringify(err),
                );
                uiLock(false);
              }
            }}
            onCancel={(_reason) => {
              errorMessage("Google Window Closed by User");
              cancelGoogleMutation.mutate({
                authData: paymentAuthData,
                paymentRef: gState.quoteReference,
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
              clientId: import.meta.env.VITE_PAYPAL_CLIENT,
              currency: PaymentData.payment.currencyCode,
            }}
          >
            <PayPalButtons
              style={{ layout: "horizontal", tagline: false }}
              createOrder={(_data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: PaymentData.payment.currencyCode,
                        value: getPaymentValue(),
                      },
                    },
                  ],
                });
              }}
              onApprove={(_data, actions) => {
                if (!actions.order) return Promise.resolve();
                return actions.order.capture().then(async (details) => {
                  uiLock(true);
                  try {
                    const json = await processPaypalMutation.mutateAsync({
                      authData: paymentAuthData,
                      paypalResponse: details,
                      orderId: gState.quoteReference,
                      amount: PaymentData.payment.amount,
                    });

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
                  } catch (err) {
                    errorMessage(
                      "Something went wrong processing your paypal request please try again",
                    );
                    failureMethod(
                      "Something went wrong processing your paypal " +
                        JSON.stringify(err),
                    );
                  }
                });
              }}
              onCancel={(_reason) => {
                errorMessage("Paypal Window Closed by User");
                cancelPaypalMutation.mutate({
                  authData: paymentAuthData,
                  paypalResponse: null,
                  orderId: gState.quoteReference,
                  amount: PaymentData.payment.amount,
                });
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
                logPaypalErrorMutation.mutate({
                  authData: paymentAuthData,
                  paypalResponse: null,
                  orderId: gState.quoteReference,
                  amount: PaymentData.payment.amount,
                  errorMessage: JSON.stringify(reason),
                });
                uiLock(false);
              }}
            />
          </PayPalScriptProvider>
        )}

        {import.meta.env.VITE_Enable_APPLEPAY === "true" &&
          typedAppleWindow.ApplePaySession && (
            <div className="apple-pay">
              <button
                lang="US"
                className="apple-pay buy"
                onClick={onApplePayButtonClicked}
              ></button>
            </div>
          )}
      </div>
    </div>
  );
};

export default QuickPay;
