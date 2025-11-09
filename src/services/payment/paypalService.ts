import { paymentsApi, type PaymentAuthData } from "@/services/api/payments";

export const paypalService = {
  processPayment: (
    authData: PaymentAuthData,
    details: any,
    orderRef: string,
    paymentAmount: string | number,
  ) => {
    return paymentsApi.processPaypal({
      authData,
      paypalResponse: details,
      orderId: orderRef,
      amount: paymentAmount,
    });
  },

  logCancellation: (authData: PaymentAuthData, orderRef: string, paymentAmount: string | number) => {
    return paymentsApi.cancelPaypal({
      authData,
      paypalResponse: null,
      orderId: orderRef,
      amount: paymentAmount,
    });
  },

  logError: (
    authData: PaymentAuthData,
    message: string,
    orderRef: string,
    paymentAmount: string | number,
  ) => {
    return paymentsApi.errorPaypal({
      authData,
      paypalResponse: null,
      orderId: orderRef,
      amount: paymentAmount,
      errorMessage: message,
    });
  },
};
