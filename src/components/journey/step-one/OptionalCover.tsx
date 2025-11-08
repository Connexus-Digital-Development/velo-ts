import { useState } from "react";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import { Checkbox } from "@mantine/core";
import { Tooltip } from "@mantine/core";
import InfoIcon from "@/assets/svgs/info-icon.svg?url";

interface OptionalCoverProps {
  handleSCCheckbox: (checked: boolean) => void;
  handlePCCheckbox: (checked: boolean) => void;
  handleACCheckbox: (checked: boolean) => void;
  handleWCCheckbox: (checked: boolean) => void;
}

const OptionalCover = ({
  handleSCCheckbox,
  handlePCCheckbox,
  handleACCheckbox,
  handleWCCheckbox,
}: OptionalCoverProps) => {
  const [gState] = useSafeContext({
    componentName: "OptionalCover",
  });
  const [opened, setOpened] = useState(0);

  const popUp = (description: string) => (
    <div className="m-3 rounded-pill">
      <p>{description}</p>
    </div>
  );

  const infoIcon = <img src={InfoIcon} alt="Information icon" />;
  return (
    <section className="container container_narrow mt-3">
      <div className="content_section">
        <h3 className="journey-section-titles">
          Optional<span className="blueFont"> extras</span>.
        </h3>
        <div className="row">
          <div className="col-md-10">
            <p className="lufga-regular">
              Please tick if you would like any of these optional extras:
            </p>
            <div className="row">
              <div className="col-12 col-sm-6 mb-3" style={{ display: "flex" }}>
                <Checkbox
                  radius="md"
                  size="lg"
                  color="velo-blue"
                  className="mr-1"
                  checked={gState.accessoryCover}
                  onChange={(e) => handleACCheckbox(e.target.checked)}
                />
                <span
                  className="additionalCoverSpan"
                  onClick={(e) => {
                    e.preventDefault();
                    handleACCheckbox(!gState.accessoryCover);
                  }}
                >
                  Accessory cover
                </span>

                <Tooltip
                  multiline
                  radius="xl"
                  color="velo-blue"
                  opened={opened === 1}
                  label={popUp(
                    "Covers up to £1,000 worth of cycle accessories, such as equipment attached to your cycle, specialist clothing and bike boxes.",
                  )}
                >
                  <span
                    className="coverFeatures"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpened(opened === 1 ? 0 : 1);
                    }}
                  >
                    {infoIcon}
                  </span>
                </Tooltip>
              </div>
              <div className="col-12 col-sm-6 mb-3" style={{ display: "flex" }}>
                <Checkbox
                  radius="md"
                  size="lg"
                  color="velo-blue"
                  className="mr-1"
                  checked={gState.worldwideCover}
                  onChange={(e) => handleWCCheckbox(e.target.checked)}
                />{" "}
                <span
                  className="additionalCoverSpan"
                  onClick={(e) => {
                    e.preventDefault();
                    handleWCCheckbox(!gState.worldwideCover);
                  }}
                >
                  Worldwide cover
                </span>
                <Tooltip
                  multiline
                  radius="xl"
                  color="velo-blue"
                  opened={opened === 2}
                  label={popUp(
                    "Covers travel worldwide up to a maximum of 90 consecutive days.",
                  )}
                >
                  <span
                    className="coverFeatures"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpened(opened === 2 ? 0 : 2);
                    }}
                  >
                    {infoIcon}
                  </span>
                </Tooltip>
              </div>
              <div className="col-12 col-sm-6 mb-3" style={{ display: "flex" }}>
                <Checkbox
                  radius="md"
                  size="lg"
                  color="velo-blue"
                  className="mr-1"
                  checked={gState.sportsCover}
                  onChange={(e) => handleSCCheckbox(e.target.checked)}
                />{" "}
                <span
                  className="additionalCoverSpan"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSCCheckbox(!gState.sportsCover);
                  }}
                >
                  Sports cover
                </span>
                <Tooltip
                  multiline
                  radius="xl"
                  color="velo-blue"
                  opened={opened === 3}
                  label={popUp(
                    "Covers all organised events, such as Sportives, Road races and Triathlons.",
                  )}
                >
                  <span
                    className="coverFeatures"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpened(opened === 3 ? 0 : 3);
                    }}
                  >
                    {infoIcon}
                  </span>
                </Tooltip>
              </div>
              <div className="col-12 col-sm-6 mb-3" style={{ display: "flex" }}>
                <Checkbox
                  radius="md"
                  size="lg"
                  color="velo-blue"
                  className="mr-1"
                  checked={gState.personalAccident}
                  onChange={(e) => handlePCCheckbox(e.target.checked)}
                />{" "}
                <span
                  className="additionalCoverSpan"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePCCheckbox(!gState.personalAccident);
                  }}
                >
                  Personal accident &#38; road rage
                </span>
                <Tooltip
                  multiline
                  radius="xl"
                  color="velo-blue"
                  opened={opened === 4}
                  label={popUp(
                    "Covers accidents resulting in loss of limb, loss of sight, permanent total disablement or death. Covers you following assault and offers: £100 hospital daily benefit, £250 emergency dental treatment, £150 clothing & personal effects and 5 sessions of stress counselling.",
                  )}
                >
                  <span
                    className="coverFeatures"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpened(opened === 4 ? 0 : 4);
                    }}
                  >
                    {infoIcon}
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptionalCover;
