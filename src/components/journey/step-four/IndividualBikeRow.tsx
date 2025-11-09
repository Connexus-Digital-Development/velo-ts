import { Checkbox } from "@mantine/core";
import { useEffect, useRef } from "react";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import { editClassName, removeClassName } from "@/utils/classNameEditor";
import { type Bike } from "@/models/bike";

interface IndividualBikeRowProps {
  bikeMake: string;
  bikeModel: string;
  lockName: string;
  bikeId: number;
  lockChecked: boolean;
  updateLockChecked: (bikeId: number, checked: boolean) => void;
}

const IndividualBikeRow: React.FC<IndividualBikeRowProps> = ({
  bikeMake,
  bikeModel,
  lockName,
  bikeId,
  lockChecked,
  updateLockChecked,
}) => {
  const ref = useRef<HTMLInputElement>(null!);
  const [gState] = useSafeContext({
    componentName: "IndividualBikeRow",
  });
  useEffect(() => {
    const bike = gState.bikes.find((x: Bike) => x.id === bikeId);
    editClassName(
      ref,
      (gState.clickedPayNow && bike && !bike.lockChecked) ?? false,
      "mantine-Checkbox-error",
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
