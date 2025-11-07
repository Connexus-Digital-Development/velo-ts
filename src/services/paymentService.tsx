//Service for processing payments

import { restApiCommBaseService } from "./restApiCommBaseService";
import ModelAdaptorHelper from "@/utils/ModelAdaptorHelper";

import type {
  PaymentValidationPayload,
  AccessTokenPayload,
  CycleInsurancePurchase,
} from "@models/ServiceTypes";

export const paymentService = {
  validatePayment: (payload: PaymentValidationPayload): Promise<any> => {
    const apiKey = String(import.meta.env["VITE_VELOSURE_API_KEY"] || "");
    const base = String(import.meta.env["VITE_VELOSURE_API_URL"] || "");

    const opts: RequestInit = {
      method: "POST",
      headers: {
        accept: "text/plain",
        "X-API-KEY": apiKey,
        "content-type": "application/json",
      } as Record<string, string>,
      body: JSON.stringify(payload),
    };

    return fetch(`${base}/api/Payment/ValidatePayment`, opts)
      .then(restApiCommBaseService.handleResponse)
      .then((json) => {
        return json;
      });
  },

  getHppAccessToken: (payload: AccessTokenPayload): Promise<any> => {
    const apiKey = String(import.meta.env["VITE_VELOSURE_API_KEY"] || "");
    const base = String(import.meta.env["VITE_VELOSURE_API_URL"] || "");

    const opts: RequestInit = {
      method: "POST",
      headers: {
        accept: "text/plain",
        "X-API-KEY": apiKey,
        "content-type": "application/json",
      } as Record<string, string>,
      body: JSON.stringify(payload),
    };

    return fetch(`${base}/api/Payment/RetrieveAccessToken`, opts)
      .then(restApiCommBaseService.handleResponse)
      .then((json) => {
        return json;
      });
  },
  rebuildPaymentIframe: (): void => {
    const payIframe = document.getElementById("payIframe");
    if (payIframe != null) {
      payIframe.remove();
    }
    const iframe = document.createElement("iframe");

    iframe.id = "payIframe";
    iframe.style.width = "100%";
    iframe.style.height = "500px";
    iframe.style.margin = "0 auto!important";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    const cardPaymentForm = document.getElementById("card-payment-form");
    if (
      cardPaymentForm &&
      cardPaymentForm.childNodes &&
      cardPaymentForm.childNodes[0]
    ) {
      const firstChild = cardPaymentForm.childNodes[0] as HTMLElement | null;
      firstChild?.appendChild(iframe);
    }
  },
  getCycleInsurancePurchase: (
    purchaseData: any,
    monthlyDepositInitAmount: boolean,
  ): CycleInsurancePurchase => {
    //console.log("purchaseData");

    return {
      houseNameNumber: ModelAdaptorHelper.removeBrackets(purchaseData.houseNo),
      addressLine1: ModelAdaptorHelper.removeBrackets(
        purchaseData.addressLine1,
      ),
      addressLine2: ModelAdaptorHelper.removeBrackets(
        purchaseData.addressLine2,
      ),
      townCity: ModelAdaptorHelper.removeBrackets(purchaseData.addressLine3),
      postCode: purchaseData.postcode,
      email: purchaseData.email,
      telephone: purchaseData.telephoneNo,
      amountToCharge:
        monthlyDepositInitAmount === true
          ? purchaseData.deposit
          : purchaseData.annualGrossPremium,
    };
  },
  bottomLineCheck: (sortCode: string, accNo: string): Promise<Response> => {
    const apiKey = String(import.meta.env["VITE_VELOSURE_API_KEY"] || "");
    const base = String(import.meta.env["VITE_VELOSURE_API_URL"] || "");

    const opts: RequestInit = {
      method: "GET",
      headers: {
        accept: "text/plain",
        "X-API-KEY": apiKey,
        "content-type": "application/json",
      } as Record<string, string>,
    };

    return fetch(
      `${base}/api/BankDetails/ValidateUkBankAccount?sortCode=${encodeURIComponent(
        sortCode,
      )}&accNo=${encodeURIComponent(accNo)}`,
      opts,
    );
  },
};
