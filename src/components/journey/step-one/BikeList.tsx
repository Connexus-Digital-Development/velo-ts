import { useContext } from "react";
import { JourneyContext } from "@/context/journeyStore";
import IndividualBike from "./IndividualBike";
import { type AboutYourBikeProps } from "@/models/JourneyComponentTypes";

const BikeList = ({ validateNextButton }: AboutYourBikeProps) => {
  const [gState, _setGState] = useContext(JourneyContext);

  return gState.bikes.map((bike, index) => (
    <IndividualBike
      bike={bike}
      key={index}
      validateNextButton={validateNextButton}
    />
  ));
};

export default BikeList;
