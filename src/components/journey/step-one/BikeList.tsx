import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import IndividualBike from "./IndividualBike";
import { type AboutYourBikeProps } from "@/models/JourneyComponentTypes";

const BikeList = ({ validateNextButton }: AboutYourBikeProps) => {
  const [gState] = useSafeContext({
    componentName: "BikeList",
  });

  return gState.bikes.map((bike, index) => (
    <IndividualBike
      bike={bike}
      key={index}
      validateNextButton={validateNextButton}
    />
  ));
};

export default BikeList;
