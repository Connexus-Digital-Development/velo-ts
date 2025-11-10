import { type Bike } from "./JourneyTypes";

const defaultBike: Bike = {
  make: "",
  model: "",
  value: "",
  isElectric: false,
  AccessoryCover: false,
  SportsCover: false,
  WorldWideCover: false,
  PublicAccidentRoadRage: false,
  lockChecked: false,
};

export default defaultBike;
export type { Bike };
