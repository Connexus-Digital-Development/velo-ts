import { paymentsApi } from "@/services/api/payments";
import type { AuthData } from "@/models/api-payments";

export const googleService = {
  processPayment: (
    authData: AuthData,
    tokenData: any,
    orderRef: string,
    paymentData: any,
  ) => {
    const paymentToken = tokenData.paymentMethodData.tokenizationData.token;
    return paymentsApi.processGoogle({
      authData,
      token: paymentToken,
      paymentRef: orderRef,
      payment: paymentData.payment,
    });
  },

  logCancellation: (
    authData: AuthData,
    orderRef: string,
    paymentData: any,
  ) => {
    return paymentsApi.cancelGoogle({
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
    return paymentsApi.errorGoogle({
      authData,
      paymentRef: orderRef,
      payment: paymentData.payment,
      errorMessage: message,
    });
  },
};
