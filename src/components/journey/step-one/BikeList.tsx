import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import IndividualBike from "./IndividualBike";

interface BikeListProps {
  validateNextButton?: boolean;
}

const BikeList = ({ validateNextButton }: BikeListProps) => {
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
