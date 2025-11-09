import PaymentSupport from "@/components/journey/step-four/paymentHelpers/PaymentSupport";
import { paymentsApi } from "@/services/api/payments";

export const paypalService = {
  processPayment: (details: any, orderRef: string, paymentAmount: string | number) => {
    return paymentsApi.processPaypal({
      authData: PaymentSupport.AuthData,
      paypalResponse: details,
      orderId: orderRef,
      amount: paymentAmount
    });
  },

  logCancellation: (orderRef: string, paymentAmount: string | number) => {
    return paymentsApi.cancelPaypal({
      authData: PaymentSupport.AuthData,
      paypalResponse: null,
      orderId: orderRef,
      amount: paymentAmount
    });
  },

  logError: (message: string, orderRef: string, paymentAmount: string | number) => {
    return paymentsApi.errorPaypal({
      authData: PaymentSupport.AuthData,
      paypalResponse: null,
      orderId: orderRef,
      amount: paymentAmount,
      errorMessage: message
    });
  }
};