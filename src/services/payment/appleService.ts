// import PaymentSupport from "@/components/journey/step-four/paymentHelpers/PaymentSupport";
//

import { paymentsApi, type PaymentAuthData } from "@/services/api/payments";

export const appleService = {
  processPayment: (authData: PaymentAuthData, tokenData: any, orderRef: string, paymentData: any) => {
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

  logCancellation: (authData: PaymentAuthData, orderRef: string, paymentData: any) => {
    return paymentsApi.cancelApple({
      authData,
      paymentRef: orderRef,
      payment: paymentData.payment,
    });
  },

  logError: (authData: PaymentAuthData, message: string, orderRef: string, paymentData: any) => {
    return paymentsApi.errorApple({
      authData,
      paymentRef: orderRef,
      payment: paymentData.payment,
      errorMessage: message,
    });
  },
};
