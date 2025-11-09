// import PaymentSupport from "@/components/journey/step-four/paymentHelpers/PaymentSupport";
//

import { paymentsApi } from "@/services/api/payments";
import type { AuthData } from "@/models/api-payments";

export const appleService = {
  processPayment: (
    authData: AuthData,
    tokenData: any,
    orderRef: string,
    paymentData: any,
  ) => {
    return paymentsApi.processApple({
      authData,
      token: JSON.stringify(tokenData.token.paymentData),
      paymentRef: orderRef,
      payment: paymentData.payment,
    });
  },

  validateSession: (validateUrl: string) => {
    return paymentsApi.validateAppleSession({
      appleUrl: validateUrl,
      store: "Velosure",
      host: window.location.host,
    });
  },

  logCancellation: (
    authData: AuthData,
    orderRef: string,
    paymentData: any,
  ) => {
    return paymentsApi.cancelApple({
      authData,
      paymentRef: orderRef,
      payment: paymentData.payment,
    });
  },

  logError: (
    authData: AuthData,
    message: string,
    orderRef: string,
    paymentData: any,
  ) => {
    return paymentsApi.errorApple({
      authData,
      paymentRef: orderRef,
      payment: paymentData.payment,
      errorMessage: message,
    });
  },
};
