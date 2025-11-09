import { paymentsApi, type PaymentAuthData } from "@/services/api/payments";

export const googleService = {
  processPayment: (authData: PaymentAuthData, tokenData: any, orderRef: string, paymentData: any) => {
    const paymentToken = tokenData.paymentMethodData.tokenizationData.token;
    return paymentsApi.processGoogle({
      authData,
      token: paymentToken,
      paymentRef: orderRef,
      payment: paymentData.payment,
    });
  },

  logCancellation: (authData: PaymentAuthData, orderRef: string, paymentData: any) => {
    return paymentsApi.cancelGoogle({
      authData,
      paymentRef: orderRef,
      payment: paymentData.payment,
    });
  },

  logError: (authData: PaymentAuthData, message: string, orderRef: string, paymentData: any) => {
    return paymentsApi.errorGoogle({
      authData,
      paymentRef: orderRef,
      payment: paymentData.payment,
      errorMessage: message,
    });
  },
};
