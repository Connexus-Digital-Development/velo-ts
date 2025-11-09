import type {
  AppleValidationRequest,
  AppleValidationResponse,
  PaypalRequest,
  PaymentRequest,
  PaymentResponse,
} from "@/models/api-payments";
import { paymentsApiClient } from "../apiClient";

// Re-export types for external use
export type {
  AppleValidationRequest,
  AppleValidationResponse,
  PaypalRequest,
  PaymentRequest,
  PaymentResponse,
};

// API service functions for payment operations
export const paymentsApi = {
  // Process PayPal payment
  processPaypal: (data: PaypalRequest): Promise<PaymentResponse> =>
    paymentsApiClient.post("/ProcessPaypal", data),

  // Cancel PayPal payment
  cancelPaypal: (data: PaypalRequest): Promise<PaymentResponse> =>
    paymentsApiClient.post("/CancelPaypal", data),

  // Log PayPal error
  errorPaypal: (data: PaypalRequest): Promise<PaymentResponse> =>
    paymentsApiClient.post("/ErrorPaypal", data),

  // Process Google payment
  processGoogle: (data: PaymentRequest): Promise<PaymentResponse> =>
    paymentsApiClient.post("/ProcessGoogle", data),

  // Cancel Google payment
  cancelGoogle: (data: PaymentRequest): Promise<PaymentResponse> =>
    paymentsApiClient.post("/CancelGoogle", data),

  // Log Google error
  errorGoogle: (data: PaymentRequest): Promise<PaymentResponse> =>
    paymentsApiClient.post("/ErrorGoogle", data),

  // Process Apple payment
  processApple: (data: PaymentRequest): Promise<PaymentResponse> =>
    paymentsApiClient.post("/ProcessApple", data),

  // Validate Apple session
  validateAppleSession: (
    data: AppleValidationRequest,
  ): Promise<AppleValidationResponse> =>
    paymentsApiClient.post("/ValidateAppleSession", data),

  // Cancel Apple payment
  cancelApple: (data: PaymentRequest): Promise<PaymentResponse> =>
    paymentsApiClient.post("/CancelApple", data),

  // Log Apple error
  errorApple: (data: PaymentRequest): Promise<PaymentResponse> =>
    paymentsApiClient.post("/ErrorApple", data),

  // Process Card payment
  processCard: (data: PaymentRequest): Promise<PaymentResponse> =>
    paymentsApiClient.post("/ProcessCard", data),

  // Cancel Card payment
  cancelCard: (data: PaymentRequest): Promise<PaymentResponse> =>
    paymentsApiClient.post("/CancelCard", data),
};
