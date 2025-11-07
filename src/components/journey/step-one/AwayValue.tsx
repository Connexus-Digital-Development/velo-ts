import { useState, useEffect, useContext } from "react";
import { JourneyContext } from "@/context/journeyStore";
import { modelAdaptorHelper } from "@/utils/modelAdaptorHelper";
import { type AboutYourBikeProps } from "@/models/JourneyComponentTypes";
import type { Bike } from "@/models";

const AwayValue = ({ validateNextButton }: AboutYourBikeProps) => {
  const [gState, setGState] = useContext(JourneyContext);
  const getHighestValueBike = (bikes: Bike[]) =>
    Math.max(...bikes.map((o) => o.value));
  const [homeValue, setHomeValue] = useState(
    modelAdaptorHelper.getHomeValue(gState.bikes),
  );
  const [value, setValue] = useState(
    gState.awayValue === 0
      ? getHighestValueBike(gState.bikes)
      : gState.awayValue,
  );
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (gState.resetAwayValue) {
      setHomeValue(modelAdaptorHelper.getHomeValue(gState.bikes));
      setGState({
        ...gState,
        resetAwayValue: false,
        awayValue: getHighestValueBike(gState.bikes),
      });
      setValue(getHighestValueBike(gState.bikes));
    }
  }, [gState.resetAwayValue]);

  useEffect(() => {
    if (
      validateNextButton &&
      gState.bikes.length > 1 &&
      gState.awayValue < 500
    ) {
      setError("minimum away value is £500");
    }
    if (
      validateNextButton &&
      gState.bikes.length > 1 &&
      gState.awayValue > homeValue
    ) {
      setError("Away value must not exceeded total value of all bikes");
    }
  }, [validateNextButton]);

  const handleOnBlur = (value: number) => {
    setValue(value);
    if (value < 500) {
      setError("minimum away value is £500");
    } else if (value > homeValue) {
      setError("Away value must not exceeded total value of all bikes");
    } else {
      setError(null);
    }
    setGState({
      ...gState,
      awayValue: value,
    });
  };

  return (
    <section className="container container_narrow mt-3">
      <div className="content_section">
        <h3 className="journey-section-titles">
          Away from home<span className="blueFont"> value</span>.
        </h3>
        <div className="row">
          <form>
            <p className="lufga-light" hidden={gState.bikes.length === 1}>
              Please enter the total bike value to be covered outside of where
              they are usually kept (insured location)
            </p>
            <div className="mb-3 col-4">
              <input
                type="number"
                className="form-control"
                id="awayValue"
                placeholder="£"
                hidden={gState.bikes.length === 1}
                disabled={gState.bikes.length === 1}
                value={value}
                onBlur={(e) => {
                  handleOnBlur(parseInt(e.currentTarget.value));
                }}
                onChange={(e) => {
                  handleOnBlur(parseInt(e.currentTarget.value));
                }}
              />
              {error !== null ? (
                <small className="redFont mt-1 lufga-light">{error}</small>
              ) : null}
            </div>
            <h3
              className="journey-section-titles lufga-regular blueFont"
              hidden={gState.bikes.length > 1}
            >
              £{value}
            </h3>
            <small className="lightgreyFont" hidden={gState.bikes.length === 1}>
              This is the maximum amount that will be paid in the event of a
              claim and cannot exceed the combined value of the bikes insured
            </small>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AwayValue;
