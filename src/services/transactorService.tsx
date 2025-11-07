//Service for communicating with the Transactor v6 API wrapper

import { restApiCommBaseService } from "./restApiCommBaseService";

import type {
  QuoteRequestData,
  QuoteEmailSendRequest,
  PolicyInceptionRequest,
} from "@/models/ServiceTypes";

export const transactorService = {
  // Get all the relevant Sources of Business as an array
  // Optional campaign id for filtering related SOBs
  fetchAllSourcesOfBusiness: (campaignId = ""): Promise<any> => {
    const auth = String(import.meta.env["VITE_TRANSACTOR_AUTH_KEY"] || "");
    const endpoint = String(
      import.meta.env["VITE_TRANSACTOR_API_ENDPOINT"] || "",
    );

    const opts: RequestInit = {
      method: "GET",
      headers: {
        authKey: auth,
      } as Record<string, string>,
    };

    // if campaign ID provided, construct a query string
    let campaignString = "";
    if (campaignId) {
      campaignString = `?campaignId=${encodeURIComponent(campaignId)}`;
    }

    return fetch(
      `${endpoint}/Data/GetAllSourcesOfBusiness${campaignString}`,
      opts,
    )
      .then(restApiCommBaseService.handleResponse)
      .then((json) => json);
  },
  // Get an individual Source of Business given it's name
  // Param is the Source of Business name
  fetchSourceOfBusinessByName: (name: string): Promise<any> => {
    const auth = String(import.meta.env["VITE_TRANSACTOR_AUTH_KEY"] || "");
    const endpoint = String(
      import.meta.env["VITE_TRANSACTOR_API_ENDPOINT"] || "",
    );

    const opts: RequestInit = {
      method: "GET",
      headers: {
        authKey: auth,
      } as Record<string, string>,
    };

    return fetch(
      `${endpoint}/Data/GetSourceOfBusinessByName?name=${encodeURIComponent(name)}`,
      opts,
    )
      .then(restApiCommBaseService.handleResponse)
      .then((json) => json);
  },
  // Given an ID, check that the Source of Business exists
  // Param sobId is the Source of Business ID
  checkSourceOfBusinessIdExists: (sobId: string): Promise<any> => {
    const auth = String(import.meta.env["VITE_TRANSACTOR_AUTH_KEY"] || "");
    const endpoint = String(
      import.meta.env["VITE_TRANSACTOR_API_ENDPOINT"] || "",
    );

    const opts: RequestInit = {
      method: "GET",
      headers: {
        authKey: auth,
      } as Record<string, string>,
    };

    return fetch(
      `${endpoint}/Data/SourceOfBusinessIdExists?sourceOfBusinessId=${encodeURIComponent(sobId)}`,
      opts,
    )
      .then(restApiCommBaseService.handleResponse)
      .then((json) => json);
  },
  // Given an offer / discount code, get the source of business discount banner HTML
  // param code is the offer / discount code to check
  fetchSourceOfBusinessDiscountBannerHtml: (code: string): Promise<any> => {
    const auth = String(import.meta.env["VITE_TRANSACTOR_AUTH_KEY"] || "");
    const endpoint = String(
      import.meta.env["VITE_TRANSACTOR_API_ENDPOINT"] || "",
    );

    const opts: RequestInit = {
      method: "GET",
      headers: {
        authKey: auth,
      } as Record<string, string>,
    };

    return fetch(
      `${endpoint}/PedalCycle/GetSourceOfBusinessDiscountBannerHtml?code=${encodeURIComponent(code)}`,
      opts,
    )
      .then(restApiCommBaseService.handleResponse)
      .then((json) => json);
  },
  // Given an offer / discount code, get the discount details
  // param code is the offer / discount code to check
  fetchOfferDetails: (code: string): Promise<any> => {
    const auth = String(import.meta.env["VITE_TRANSACTOR_AUTH_KEY"] || "");
    const endpoint = String(
      import.meta.env["VITE_TRANSACTOR_API_ENDPOINT"] || "",
    );

    const opts: RequestInit = {
      method: "GET",
      headers: {
        authKey: auth,
      } as Record<string, string>,
    };

    return fetch(
      `${endpoint}/PedalCycle/GetOfferDetails?code=${encodeURIComponent(code)}`,
      opts,
    )
      .then(restApiCommBaseService.handleResponse)
      .then((json) => json);
  },
  // Given a name, check that the Source of Business exists
  // param name is the Source of Business name
  checkSourceOfBusinessNameExists: (name: string): Promise<any> => {
    const auth = String(import.meta.env["VITE_TRANSACTOR_AUTH_KEY"] || "");
    const endpoint = String(
      import.meta.env["VITE_TRANSACTOR_API_ENDPOINT"] || "",
    );

    const opts: RequestInit = {
      method: "GET",
      headers: {
        authKey: auth,
      } as Record<string, string>,
    };

    return fetch(
      `${endpoint}/Data/SourceOfBusinessNameExists?name=${encodeURIComponent(name)}`,
      opts,
    )
      .then(restApiCommBaseService.handleResponse)
      .then((json) => json);
  },
  // method to fetch quote from Transactor API given risk data
  // param riskData - is the PedalCycle risk data needed to get quote
  fetchQuote: (riskData: QuoteRequestData): Promise<any> => {
    const auth = String(import.meta.env["VITE_TRANSACTOR_AUTH_KEY"] || "");
    const endpoint = String(
      import.meta.env["VITE_TRANSACTOR_API_ENDPOINT"] || "",
    );

    const opts: RequestInit = {
      method: "POST",
      headers: {
        authKey: auth,
        "content-type": "application/json",
      } as Record<string, string>,
      body: JSON.stringify(riskData),
    };

    return fetch(`${endpoint}/PedalCycle/GetQuote`, opts)
      .then(restApiCommBaseService.handleResponse)
      .then((json) => json);
  },
  fetchQuoteForScheme: (
    riskData: QuoteRequestData,
    globalScope: any,
  ): Promise<any> => {
    const isCore =
      globalScope.schemeTable === import.meta.env.VITE_CORE_SCHEME_TABLE;

    if (isCore) {
      riskData.includePersonalAccidentCoverCore =
        globalScope.personalAccidentCore;
    } else {
      riskData.includePersonalAccidentCoverPerformance =
        globalScope.personalAccidentPerformance;
    }

    const endpoint = String(
      import.meta.env["VITE_TRANSACTOR_API_ENDPOINT"] || "",
    );
    const opts: RequestInit = {
      method: "POST",
      headers: {
        authKey: String(import.meta.env["VITE_TRANSACTOR_AUTH_KEY"] || ""),
        "content-type": "application/json",
      } as Record<string, string>,
      body: JSON.stringify(riskData),
    };

    return fetch(`${endpoint}/PedalCycle/GetQuoteForScheme`, opts)
      .then(restApiCommBaseService.handleResponse)
      .then((json) => json);
  },
  sendQuoteEmails: (
    quoteEmailSendRequest: QuoteEmailSendRequest,
  ): Promise<any> => {
    const endpoint = String(
      import.meta.env["VITE_TRANSACTOR_API_ENDPOINT"] || "",
    );
    const opts: RequestInit = {
      method: "POST",
      headers: {
        authKey: String(import.meta.env["VITE_TRANSACTOR_AUTH_KEY"] || ""),
        "content-type": "application/json",
      } as Record<string, string>,
      body: JSON.stringify(quoteEmailSendRequest),
    };

    return fetch(`${endpoint}/PedalCycle/SendQuoteEmails`, opts)
      .then(restApiCommBaseService.handleResponse)
      .then((json) => json);
  },
  // method to incept policy from Transactor API given risk data
  // param transactorRequest - the populated request inclusive of config and risk data
  inceptPolicy: (
    riskData: PolicyInceptionRequest,
    fromExternalLink: boolean,
  ): Promise<any> => {
    const endpoint = String(
      import.meta.env["VITE_TRANSACTOR_API_ENDPOINT"] || "",
    );
    const opts: RequestInit = {
      method: "POST",
      headers: {
        ApiKey: String(import.meta.env["VITE_AGGREGATOR_AUTH_KEY"] || ""),
        authKey: String(import.meta.env["VITE_TRANSACTOR_AUTH_KEY"] || ""),
        "content-type": "application/json",
      } as Record<string, string>,
      body: JSON.stringify(riskData),
    };

    if (fromExternalLink === true) {
      return fetch(
        `${String(import.meta.env["VITE_AGGREGATOR_API_ENDPOINT"] || "")}/AggregatorQuote/InceptPolicy`,
        opts,
      )
        .then(restApiCommBaseService.handleResponse)
        .then((json) => json);
    } else {
      return fetch(`${endpoint}/PedalCycle/InceptPolicy`, opts)
        .then(restApiCommBaseService.handleResponse)
        .then((json) => json);
    }
  },
  // Generates risk data to incept a policy
  getPolicyRiskData: (_payload: any): any => {
    // coverStartDate variable unused; keep minimal logic to satisfy type-check
    if (!_payload || !_payload.coverStartDate) return null;
    return null; // method not used
  },
};

export default transactorService;
