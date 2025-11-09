import PaymentSupport from "@/components/journey/step-four/paymentHelpers/PaymentSupport";
import { paymentsApi } from "@/services/api/payments";

export const appleService = {
  processPayment: (tokenData: any, orderRef: string, paymentData: any) => {
    return paymentsApi.processApple({
      authData: PaymentSupport.AuthData,
      token: JSON.stringify(tokenData.token.paymentData),
      paymentRef: orderRef,
      payment: paymentData.payment
    });
  },

  validateSession: (validateUrl: string) => {
    return paymentsApi.validateAppleSession({
      appleUrl: validateUrl,
      store: 'Velosure',
      host: window.location.host
    });
  },

  logCancellation: (orderRef: string, paymentData: any) => {
    return paymentsApi.cancelApple({
      authData: PaymentSupport.AuthData,
      paymentRef: orderRef,
      payment: paymentData.payment
    });
  },

  logError: (message: string, orderRef: string, paymentData: any) => {
    return paymentsApi.errorApple({
      authData: PaymentSupport.AuthData,
      paymentRef: orderRef,
      payment: paymentData.payment,
      errorMessage: message
    });
  }
};