import { type RecaptchaResponse } from "@models/ServiceTypes";

export const recaptchaHelper = {
  ProcessToken: (token: string): Promise<number> => {
    const base = String(import.meta.env["VITE_VELOSURE_API_URL"] || "");
    const opts: RequestInit = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      } as Record<string, string>,
    };
    const url = `${base}/api/Recaptcha/ProcessToken?token=${encodeURIComponent(token)}`;

    return fetch(url, opts)
      .then((response) => response.json())
      .then((data: RecaptchaResponse) => data?.score ?? 0);
  },
};
