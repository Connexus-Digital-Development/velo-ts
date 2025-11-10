import { paymentsApiClient } from "@/services/apiClient";

// Auth data object for payment operations
const paymentAuthData = {
  merchant: import.meta.env.VITE_PAYMENTS_MERCHANT,
  account: import.meta.env.VITE_PAYMENTS_ACCOUNT,
  key: import.meta.env.VITE_PAYMENTS_KEY,
  appId: import.meta.env.VITE_PAYMENTS_API_TOKEN,
  appKey: import.meta.env.VITE_PAYMENTS_API_KEY,
  apiPath: `${import.meta.env.VITE_PAYMENTS_API_PATH}/api/payments`,
  testMode: import.meta.env.VITE_PAYMENTS_TEST_MODE === "true"
};

interface ChallengeRequestData {
    requiresChallenge: boolean;
    challengeLocation: string;
    challengeData: string;
}

export const cardPayments = {
    processPayment: (data: any) => {
        const paymentData = {
            authData: paymentAuthData,
            paymentRef: data.paymentRef,
            payment: data.payment,
            address: data.address,
            retry: data.retry
        };
        return paymentsApiClient.post("/ProcessCard", paymentData);
    },

    trigger3dsChallenge: (target: string, requestData: ChallengeRequestData) => {
        if (requestData.requiresChallenge) {
            const form = document.createElement("form");
            form.setAttribute("method", "POST");
            form.setAttribute("action", requestData.challengeLocation);
            form.setAttribute("target", target);
            // form.style.width = "100%";
            // form.style.height = "100%";
            // form.style.position = "absolute";
            // form.style.display = "block";
            const input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", "creq");
            input.setAttribute("value", requestData.challengeData);
            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();
        }
    }
};

export default cardPayments;

