import { paymentsApi } from "@/services/api/payments";
import type { AuthData } from "@/models/api-payments";

export const paypalService = {
  processPayment: (
    authData: AuthData,
    details: any,
    orderRef: string,
    paymentAmount: string | number,
  ) => {
    return paymentsApi.processPaypal({
      authData,
      paypalResponse: details,
      orderId: orderRef,
      amount: typeof paymentAmount === 'string' ? parseFloat(paymentAmount) : paymentAmount,
      success: true,
    });
  },

  logCancellation: (
    authData: AuthData,
    orderRef: string,
    paymentAmount: string | number,
  ) => {
    return paymentsApi.cancelPaypal({
      authData,
      paypalResponse: undefined,
      orderId: orderRef,
      amount: typeof paymentAmount === 'string' ? parseFloat(paymentAmount) : paymentAmount,
      success: false,
    });
  },

  logError: (
    authData: AuthData,
    message: string,
    orderRef: string,
  ) => {
    return paymentsApi.errorPaypal({
      authData,
      paypalResponse: undefined,
      orderId: orderRef,
      errorMessage: message,
      success: false,
    });
  },
};
