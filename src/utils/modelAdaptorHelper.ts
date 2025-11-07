// Collection of helper functions used to process the Global state object in order to produce
// a data object that can be passed to transactor.
import { type Bike } from "@/models/JourneyTypes";

interface BikeCollectionItem {
  make: string;
  model: string;
  homeValue: number;
  serialNumber: string;
  purchaseDate: null;
  hasDataTagFitted: null;
}

interface SanctionsResponse {
  data?: {
    searchRecord?: {
      listSearchResults?: any[];
    };
    responseStatus?: {
      errorCode?: string | null;
    };
  };
}

interface SanctionsResult {
  Success: boolean;
  Failure: boolean;
  Error: boolean;
}

export const modelAdaptorHelper = {
  getTitleId: (title: string | undefined | null): string | number => {
    if (title === undefined || title === "" || title == null) return 0;
    switch (title) {
      case "mr":
        return "003";
      case "mrs":
        return "004";
      case "miss":
        return "002";
      case "ms":
        return "005";
      case "dr":
        return "001";
      case "mx":
        return "106";
      default:
        return "003";
    }
  },
  removeBrackets: (textToStrip: any): string => {
    if (textToStrip === null || textToStrip === undefined) return "";
    const returnString = String(textToStrip)
      .replace(/\)/g, " ")
      .replace(/\(/g, " ");
    return returnString;
  },
  removeNullText: (textToStrip: any): string => {
    if (textToStrip === null || textToStrip === "" || textToStrip === undefined)
      return "";
    return String(textToStrip).replace(/null/g, " ");
  },
  getHomeValue: (bikeList: Bike[]): number => {
    if (!bikeList) return 0;
    let total = 0;

    for (const bikeItem of bikeList) {
      if (bikeItem) {
        total = total + Number(bikeItem.value || 0);
      }
    }

    return total;
  },
  getLockName: (bikeValue: string | number): string => {
    if (Number(bikeValue) > 2500) return "Gold rated lock";
    if (Number(bikeValue) > 1500) return "Silver rated lock";
    return "Bronze rated lock";
  },
  allBikeLocksChecked: (bikeList: Bike[]): boolean => {
    // if any checkboxes are not checked return false
    let allChecked = true;
    bikeList.forEach((bike: Bike) => {
      if (bike.lockChecked === false) allChecked = false;
    });
    return allChecked;
  },
  getBikeCollection: (bikeList: Record<string, Bike>): BikeCollectionItem[] => {
    // build up an object for the bike list in the specific format ie
    //  [{make.model,value},{make.model,value},]

    const bikeCollection: BikeCollectionItem[] = [];

    for (const bike in bikeList) {
      if (Object.prototype.hasOwnProperty.call(bikeList, bike)) {
        const bikeItem = bikeList[bike];
        if (bikeItem) {
          const bikeMake = bikeItem.make;
          const bikeModel = bikeItem.model;
          const bikeValue = Number(bikeItem.value || 0);

          bikeCollection.push({
            make: bikeMake,
            model: bikeModel,
            homeValue: bikeValue,
            serialNumber: "",
            purchaseDate: null,
            hasDataTagFitted: null,
          });
        }
      }
    }
    return bikeCollection;
  },
  getFormattedDOBFromDateParts: (d: number, m: number, y: number): Date => {
    return new Date(Date.UTC(y, m, d));
  },
  getStorageLocation: (id: number | null): string => {
    if (id === null) return "Home";

    switch (id) {
      case 1:
        return "Home";
      case 2:
        return "Outbuilding";
      case 3:
        return "Communal Area";
      case 4:
        return "Other";
      default:
        return "Home";
    }
  },

  getStorageLocationFromId: (locationId: number): string => {
    switch (locationId) {
      case 1:
        return "Home";
      case 2:
        return "Outbuilding";
      case 3:
        return "Communal area";
      case 4:
        return "Other";
      default:
        return "Not found";
    }
  },

  resetAssumptionsAndDeclarations(gState: any) {
    gState.eBikeTicked = false;
    gState.assumptionsTicked = false;
    gState.storageLocationTicked = false;
    gState.readDocumentsTicked = false;
    gState.bikes = gState.bikes.map((bike: Bike) => {
      bike.lockChecked = false;
      return bike;
    });
    return gState;
  },
  HowManyBikes(collection: any[]): number {
    return collection.length;
  },
  AnyElectricBikes(collection: Bike[]): boolean {
    return collection.length > 1 ? false : (collection[0]?.isElectric ?? false);
  },
  PhraseSanctionResults(response: SanctionsResponse): SanctionsResult {
    const Success =
      (response?.data?.searchRecord?.listSearchResults?.length ?? 0) == 0 &&
      response?.data?.responseStatus?.errorCode == null;
    const Failure =
      (response?.data?.searchRecord?.listSearchResults?.length ?? 0) >= 1;
    const Error = response?.data?.responseStatus?.errorCode != null;

    return {
      Success: Success,
      Failure: Failure,
      Error: Error,
    };
  },
};
