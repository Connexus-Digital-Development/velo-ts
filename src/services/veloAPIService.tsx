import type {
  OfferData,
  TransactorNoteRequest,
  TransactorNoteResponse,
} from "@/models/ServiceTypes";

export const veloAPIService = {
  CheckAndApplyOfferFull: async (code = ""): Promise<void> => {
    const apiKey = import.meta.env.VITE_VELOSURE_API_KEY || "";
    const base = import.meta.env.VITE_VELOSURE_API_URL || "";

    const options: RequestInit = {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
        "content-type": "application/json",
      } as Record<string, string>,
    };

    try {
      const resp = await fetch(
        `${base}/api/Offers/GetCurrentOffer?code=${encodeURIComponent(code)}`,
        options,
      );
      const data: OfferData | { status: number } = await resp.json();
      if (data && "status" in data && data.status === 404) {
        sessionStorage.setItem("checkedForOffer", "true");
        sessionStorage.setItem("FoundOffer", "false");
        sessionStorage.setItem("sourceOfBusinessId", code);
      } else {
        sessionStorage.setItem("checkedForOffer", "true");
        sessionStorage.setItem("OfferActive", "true");
        sessionStorage.setItem("OfferName", (data as OfferData).name);
        sessionStorage.setItem(
          "OfferRules",
          (data as OfferData).offerRules || "",
        );
        sessionStorage.setItem(
          "sourceOfBusinessId",
          (data as OfferData).defaultCode || "",
        );
        sessionStorage.setItem(
          "offerFooterText",
          (data as OfferData).footerText || "",
        );
        sessionStorage.setItem(
          "jouneryHeaderText",
          (data as OfferData).jouneryHeaderText || "",
        );
        sessionStorage.setItem(
          "offerIcon",
          (data as OfferData).offerIcon || "",
        );
        // Note: navigation/search updates should be handled by caller
      }
    } catch (e: unknown) {
      console.log({ e });
      // swallow for now; logging can be added
    }
  },

  CheckAndApplyOffer: async (): Promise<void> => {
    const apiKey = import.meta.env.VITE_VELOSURE_API_KEY || "";
    const base = import.meta.env.VITE_VELOSURE_API_URL || "";

    const options: RequestInit = {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
        "content-type": "application/json",
      } as Record<string, string>,
    };

    try {
      const resp = await fetch(`${base}/api/Offers/GetCurrentOffer`, options);
      const data: OfferData | { status: number } = await resp.json();
      if (data && "status" in data && data.status === 404) {
        sessionStorage.setItem("checkedForOffer", "true");
        sessionStorage.setItem("FoundOffer", "false");
      } else {
        sessionStorage.setItem("checkedForOffer", "true");
        sessionStorage.setItem("OfferActive", "true");
        sessionStorage.setItem("OfferName", (data as OfferData).name);
        sessionStorage.setItem(
          "OfferRules",
          (data as OfferData).offerRules || "",
        );
        sessionStorage.setItem(
          "sourceOfBusinessId",
          (data as OfferData).defaultCode || "",
        );
        sessionStorage.setItem(
          "offerFooterText",
          (data as OfferData).footerText || "",
        );
        sessionStorage.setItem(
          "jouneryHeaderText",
          (data as OfferData).jouneryHeaderText || "",
        );
        sessionStorage.setItem(
          "offerIcon",
          (data as OfferData).offerIcon || "",
        );
      }
    } catch (e: unknown) {
      console.log({ e });
      // ignore
    }
  },

  async AddTransactorNotes(
    request: TransactorNoteRequest,
  ): Promise<TransactorNoteResponse> {
    const apiKey = import.meta.env.VITE_VELOSURE_API_KEY || "";
    const base = import.meta.env.VITE_VELOSURE_API_URL || "";

    const options: RequestInit = {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "content-type": "application/json",
      } as Record<string, string>,
      body: JSON.stringify(request),
    };

    const response = await fetch(
      `${base}/api/TransactorNotes/AddNote`,
      options,
    );
    return await response.json();
  },
};
