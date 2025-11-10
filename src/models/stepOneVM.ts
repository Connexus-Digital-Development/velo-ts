import { type Bike } from "./JourneyTypes";

export interface StepOneVM {
  listofBikes: Bike[];
  WhereIsBikeStored: string;
}

// Sample data for reference/development
const stepOneVMSample: StepOneVM = {
  listofBikes: [
    {
      id: 2,
      make: "Rayleigh",
      model: "grifter",
      value: 8700,
      isElectric: true,
      AccessoryCover: true,
      SportsCover: true,
      WorldWideCover: true,
      PublicAccidentRoadRage: true,
    },
  ],
  WhereIsBikeStored: "home",
};

export default stepOneVMSample;
