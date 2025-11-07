import IndividualBikeRow from "./IndividualBikeRow";
import ModelAdaptorHelper from "@utils/ModelAdaptorHelper";
import { type BikeListWithLockInfoProps } from "@/models/JourneyComponentTypes";

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
              lockName={ModelAdaptorHelper.getLockName(bike.value)}
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
