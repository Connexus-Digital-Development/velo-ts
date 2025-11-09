import { type ApiResponse } from "@/models/api";
import {
  bankValidationApi,
  type BankValidationData,
} from "@/services/api/bankValidation";
import {
  paymentsApi,
  type AppleCancelData,
  type AppleErrorData,
  type ApplePaymentData,
  type AppleValidationData,
  type CardCancelData,
  // type CardCancelData,
  type CardPaymentData,
  type GoogleCancelData,
  type GoogleErrorData,
  type GooglePaymentData,
  type PaypalCancelData,
  type PaypalErrorData,
  type PaypalPaymentData,
} from "@/services/api/payments";
import { useMutation } from "@tanstack/react-query";

// Mutation hook for processing PayPal payments
export const useProcessPaypalPayment = () => {
  return useMutation({
    mutationFn: (data: PaypalPaymentData) => paymentsApi.processPaypal(data),
    onSuccess: (data: ApiResponse) => {
      console.log("PayPal payment processed successfully:", data);
    },
    onError: (error: Error) => {
      console.error("PayPal payment processing failed:", error);
    },
  });
};

// Mutation hook for canceling PayPal payments
export const useCancelPaypalPayment = () => {
  return useMutation({
    mutationFn: (data: PaypalCancelData) => paymentsApi.cancelPaypal(data),
    onSuccess: (data: ApiResponse) => {
      console.log("PayPal payment canceled successfully:", data);
    },
    onError: (error: Error) => {
      console.error("PayPal payment cancellation failed:", error);
    },
  });
};

// Mutation hook for logging PayPal errors
export const useLogPaypalError = () => {
  return useMutation({
    mutationFn: (data: PaypalErrorData) => paymentsApi.errorPaypal(data),
    onSuccess: (data: ApiResponse) => {
      console.log("PayPal error logged successfully:", data);
    },
    onError: (error: Error) => {
      console.error("PayPal error logging failed:", error);
    },
  });
};

// Mutation hook for processing Google payments
export const useProcessGooglePayment = () => {
  return useMutation({
    mutationFn: (data: GooglePaymentData) => paymentsApi.processGoogle(data),
    onSuccess: (data: ApiResponse) => {
      console.log("Google payment processed successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Google payment processing failed:", error);
    },
  });
};

// Mutation hook for canceling Google payments
export const useCancelGooglePayment = () => {
  return useMutation({
    mutationFn: (data: GoogleCancelData) => paymentsApi.cancelGoogle(data),
    onSuccess: (data: ApiResponse) => {
      console.log("Google payment canceled successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Google payment cancellation failed:", error);
    },
  });
};

// Mutation hook for logging Google errors
export const useLogGoogleError = () => {
  return useMutation({
    mutationFn: (data: GoogleErrorData) => paymentsApi.errorGoogle(data),
    onSuccess: (data: ApiResponse) => {
      console.log("Google error logged successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Google error logging failed:", error);
    },
  });
};

// Mutation hook for processing Apple payments
export const useProcessApplePayment = () => {
  return useMutation({
    mutationFn: (data: ApplePaymentData) => paymentsApi.processApple(data),
    onSuccess: (data: ApiResponse) => {
      console.log("Apple payment processed successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Apple payment processing failed:", error);
    },
  });
};

// Mutation hook for validating Apple sessions
export const useValidateAppleSession = () => {
  return useMutation({
    mutationFn: (data: AppleValidationData) =>
      paymentsApi.validateAppleSession(data),
    onSuccess: (data: ApiResponse) => {
      console.log("Apple session validated successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Apple session validation failed:", error);
    },
  });
};

// Mutation hook for canceling Apple payments
export const useCancelApplePayment = () => {
  return useMutation({
    mutationFn: (data: AppleCancelData) => paymentsApi.cancelApple(data),
    onSuccess: (data: ApiResponse) => {
      console.log("Apple payment canceled successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Apple payment cancellation failed:", error);
    },
  });
};

// Mutation hook for logging Apple errors
export const useLogAppleError = () => {
  return useMutation({
    mutationFn: (data: AppleErrorData) => paymentsApi.errorApple(data),
    onSuccess: (data: ApiResponse) => {
      console.log("Apple error logged successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Apple error logging failed:", error);
    },
  });
};

// Mutation hook for processing card payments
export const useProcessCardPayment = () => {
  return useMutation({
    mutationFn: (data: CardPaymentData) => paymentsApi.processCard(data),
    onSuccess: (data: ApiResponse) => {
      console.log("Card payment processed successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Card payment processing failed:", error);
    },
  });
};

// Mutation hook for canceling card payments
export const useCancelCardPayment = () => {
  return useMutation({
    mutationFn: (data: CardCancelData) => paymentsApi.cancelCard(data),
    onSuccess: (data: ApiResponse) => {
      console.log("Card payment canceled successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Card payment cancellation failed:", error);
    },
  });
};

// Mutation hook for validating bank account details
export const useValidateBankAccount = () => {
  return useMutation({
    mutationFn: (data: BankValidationData) =>
      bankValidationApi.validateUkBankAccount(data),
    onSuccess: (data: ApiResponse) => {
      console.log("Bank account validated successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Bank account validation failed:", error);
    },
  });
};
