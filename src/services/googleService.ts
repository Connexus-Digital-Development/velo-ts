import PaymentSupport from "@/components/journey/step-four/paymentHelpers/PaymentSupport";
import { paymentsApi } from "@/services/api/payments";

export const googleService = {
  processPayment: (tokenData: any, orderRef: string, paymentData: any) => {
    const paymentToken = tokenData.paymentMethodData.tokenizationData.token;
    return paymentsApi.processGoogle({
      authData: PaymentSupport.AuthData,
      token: paymentToken,
      paymentRef: orderRef,
      payment: paymentData.payment
    });
  },

  logCancellation: (orderRef: string, paymentData: any) => {
    return paymentsApi.cancelGoogle({
      authData: PaymentSupport.AuthData,
      paymentRef: orderRef,
      payment: paymentData.payment
    });
  },

  logError: (message: string, orderRef: string, paymentData: any) => {
    return paymentsApi.errorGoogle({
      authData: PaymentSupport.AuthData,
      paymentRef: orderRef,
      payment: paymentData.payment,
      errorMessage: message
    });
  }
};