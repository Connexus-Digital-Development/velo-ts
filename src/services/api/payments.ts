import { paymentsApiClient } from "../apiClient";

export interface PaymentAuthData {
  merchant: string;
  account: string;
  key: string;
  appId: string;
  appKey: string;
  apiPath: string;
  testMode: boolean;
}

export interface PaypalPaymentData {
  authData: PaymentAuthData;
  paypalResponse: any;
  orderId: string;
  amount: string | number;
}

export interface PaypalCancelData {
  authData: PaymentAuthData;
  paypalResponse: null;
  orderId: string;
  amount: string | number;
}

export interface GooglePaymentData {
  authData: PaymentAuthData;
  token: string;
  paymentRef: string;
  payment: any;
}

export interface GoogleCancelData {
  authData: PaymentAuthData;
  paymentRef: string;
  payment: any;
}

export interface GoogleErrorData {
  authData: PaymentAuthData;
  paymentRef: string;
  payment: any;
  errorMessage: string;
}

export interface ApplePaymentData {
  authData: PaymentAuthData;
  token: string;
  paymentRef: string;
  payment: any;
}

export interface AppleValidationData {
  appleUrl: string;
  store: string;
  host: string;
}

export interface AppleCancelData {
  authData: PaymentAuthData;
  paymentRef: string;
  payment: any;
}

export interface AppleErrorData {
  authData: PaymentAuthData;
  paymentRef: string;
  payment: any;
  errorMessage: string;
}

export interface CardPaymentData {
  authData: PaymentAuthData;
  paymentRef: string;
  payment: any;
  address: any;
  retry: any;
}

export interface CardCancelData {
  authData: PaymentAuthData;
  paymentRef: string;
  payment: any;
}

// API service functions for payment operations
export const paymentsApi = {
  // Process PayPal payment
  processPaypal: (data: PaypalPaymentData): Promise<any> =>
    paymentsApiClient.post("/ProcessPaypal", data),

  // Cancel PayPal payment
  cancelPaypal: (data: PaypalCancelData): Promise<any> =>
    paymentsApiClient.post("/CancelPaypal", data),

  // Log PayPal error
  errorPaypal: (data: any): Promise<any> =>
    paymentsApiClient.post("/ErrorPaypal", data),

  // Process Google payment
  processGoogle: (data: GooglePaymentData): Promise<any> =>
    paymentsApiClient.post("/ProcessGoogle", data),

  // Cancel Google payment
  cancelGoogle: (data: GoogleCancelData): Promise<any> =>
    paymentsApiClient.post("/CancelGoogle", data),

  // Log Google error
  errorGoogle: (data: GoogleErrorData): Promise<any> =>
    paymentsApiClient.post("/ErrorGoogle", data),

  // Process Apple payment
  processApple: (data: ApplePaymentData): Promise<any> =>
    paymentsApiClient.post("/ProcessApple", data),

  // Validate Apple session
  validateAppleSession: (data: AppleValidationData): Promise<any> =>
    paymentsApiClient.post("/ValidateAppleSession", data),

  // Cancel Apple payment
  cancelApple: (data: AppleCancelData): Promise<any> =>
    paymentsApiClient.post("/CancelApple", data),

  // Log Apple error
  errorApple: (data: AppleErrorData): Promise<any> =>
    paymentsApiClient.post("/ErrorApple", data),

  // Process Card payment
  processCard: (data: CardPaymentData): Promise<any> =>
    paymentsApiClient.post("/ProcessCard", data),

  // Cancel Card payment
  cancelCard: (data: CardCancelData): Promise<any> =>
    paymentsApiClient.post("/CancelCard", data),
};
