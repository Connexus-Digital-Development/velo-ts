import IndividualBikeRow from "./IndividualBikeRow";
import { modelAdaptorHelper } from "@/utils/modelAdaptorHelper";
import { type Bike } from "@/models/JourneyTypes";

interface BikeListWithLockInfoProps {
  bikes: Bike[];
  updateLockChecked: (bikeId: number, checked: boolean) => void;
}

const BikeListWithLockInfo: React.FC<BikeListWithLockInfoProps> = ({
  bikes,
  updateLockChecked,
}) => {
  return (
    <div id="lockChecked">
      <ul className="lufga-regular">
        {bikes.map((bike) => (
          <li key={bike.id}>
            <IndividualBikeRow
              bikeMake={bike.make}
              bikeModel={bike.model}
              lockName={modelAdaptorHelper.getLockName(bike.value)}
              bikeId={bike.id ?? 0}
              lockChecked={bike.lockChecked ?? false}
              updateLockChecked={updateLockChecked}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BikeListWithLockInfo;
