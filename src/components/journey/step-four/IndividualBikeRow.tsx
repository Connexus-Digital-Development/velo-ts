import { Checkbox } from "@mantine/core";
import { useContext, useEffect, useRef } from "react";
import { JourneyContext } from "@/context/journeyStore";
import { editClassName, removeClassName } from "@utils/ClassNameEditor";
import { type IndividualBikeRowProps } from "@/models/JourneyComponentTypes";
import { type Bike } from "@/models/bike";

const IndividualBikeRow: React.FC<IndividualBikeRowProps> = ({
  bikeMake,
  bikeModel,
  lockName,
  bikeId,
  lockChecked,
  updateLockChecked,
}) => {
  const ref = useRef<HTMLInputElement>(null!);
  const [gState] = useContext(JourneyContext)!;
  useEffect(() => {
    const bike = gState.bikes.find((x: Bike) => x.id === bikeId);
    editClassName(
      ref,
      gState.clickedPayNow && bike && !bike.lockChecked,
      "mantine-Checkbox-error",
    );
  }, [gState]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLockChecked(bikeId, e.target.checked);
    if (e.target.checked) {
      removeClassName(ref, "mantine-Checkbox-error");
    }
  };

  return (
    <div className="row mt-3">
      <div className="col-6 col-sm-6">
        <h6 className="lufga-regular wrap">
          {bikeMake} {bikeModel}
        </h6>
      </div>
      <div className="col-4 col-sm-4">
        <h6 className="lufga-regular">{lockName}</h6>
      </div>
      <div className="col-2 col-sm-2">
        <Checkbox
          radius="md"
          size="lg"
          ref={ref}
          color="velo-blue"
          className="float-end pr-3"
          checked={lockChecked}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};

export default IndividualBikeRow;
