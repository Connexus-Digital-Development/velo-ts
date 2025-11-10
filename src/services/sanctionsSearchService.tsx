import { modelAdaptorHelper } from "@/utils/modelAdaptorHelper";
import { veloAPIService } from "./veloAPIService";
import type {
  SanctionsSearchRequest,
  SanctionsSearchResponse,
} from "@/models/ServiceTypes";

export const sanctionsSearchService = {
  async SanctionSearch(gState: any): Promise<SanctionsSearchResponse> {
    const reference = `Velsoure:Bike Insurance:${String(gState?.quoteReference || "")}`;
    const fullRequest: SanctionsSearchRequest = {
      request: {
        type: "individual",
        name: `${gState?.forename || ""} ${gState?.surname || ""}`,
        address:
          `${gState?.houseNo?.length >= 1 ? (gState.houseNo as string).trim() : ""} ${gState?.houseNo?.length < 1 && gState?.houseName?.length >= 1 ? (gState.houseName as string).trim() : ""}, ${gState?.postcode}`
            .trim()
            .replace("  ", " "),
        dateOfBirth: null,
        selectedLists: ["ALL"],
        Reference: reference,
      },
      authentication: {
        ApiUserId: String(
          import.meta.env["VITE_SanctionsSearchAPIUserId"] || "",
        ),
        ApiUserKey: String(
          import.meta.env["VITE_SanctionsSearchAPIUserKey"] || "",
        ),
      },
    };

    const options: RequestInit = {
      method: "POST",
      headers: { "content-type": "application/json" } as Record<string, string>,
      body: JSON.stringify(fullRequest),
    };

    const response = await fetch(
      String(import.meta.env["VITE_SanctionsSearchUri"] || ""),
      options,
    );
    const data = await response.json();
    const phrasedSanctionResults: SanctionsSearchResponse =
      modelAdaptorHelper.PhraseSanctionResults(data);
    (phrasedSanctionResults as any).Reference = reference;
    (phrasedSanctionResults as any).PolicyDetailsId = gState?.policyDetailsId;

    try {
      await veloAPIService.AddTransactorNotes(phrasedSanctionResults);
    } catch (e: unknown) {
      console.log({ e });
    }

    return phrasedSanctionResults;
  },
};
