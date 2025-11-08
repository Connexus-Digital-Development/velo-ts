import { useEffect, useRef } from "react";
import { useSafeContext } from "@/context/journeyStore/useSafeContext";
import { Checkbox } from "@mantine/core";
import { editClassName, removeClassName } from "@/utils/classNameEditor";
import { type AssumptionsProps } from "@/models/JourneyComponentTypes";
import { type Bike } from "@/models/bike";

const Assumptions: React.FC<AssumptionsProps> = ({ setShowPaymentWindow }) => {
  const assumptionsRef = useRef<HTMLInputElement>(null);
  const eBikeRef = useRef<HTMLInputElement>(null);
  const [gState, setGState] = useSafeContext({
    componentName: "Assumptions",
  });
  useEffect(() => {
    editClassName(
      assumptionsRef as React.RefObject<HTMLElement>,
      gState.clickedPayNow && !gState.assumptionsTicked,
      "mantine-Checkbox-error",
    );
    editClassName(
      eBikeRef as React.RefObject<HTMLElement>,
      gState.clickedPayNow && !gState.eBikeTicked,
      "mantine-Checkbox-error",
    );
  }, [gState.clickedPayNow, gState.assumptionsTicked, gState.eBikeTicked]);
  return (
    <section className="container container_narrow ">
      <div className="content_section mt-3 Assumptions">
        <h2 className="blueFont mb-4">Assumptions</h2>
        <h4>
          I confirm that <span className="blueFont">I have not:</span>
        </h4>
        <ul>
          <li>
            Had insurance declined, cancelled, refused or special terms imposed
            in respect of cycle insurance.
          </li>
          <li>
            Had any unspent criminal convictions or have prosecutions pending
            (other than motoring offences).
          </li>

          <li>
            Had any cycle related claims or losses in the last 5 years that
            would have been covered by this type of insurance had it been in
            force?
          </li>
          <li>
            I am not a professional sports person and will not use any cycle in
            a professional capacity.
          </li>
        </ul>
        <h4>I confirm that:</h4>
        <ul>
          <li>
            Any cycle insured under this policy will not be used in connection
            with a profession, business or occupation.
          </li>
          <li>I am a UK resident.</li>
          <li>
            Any cycle insured under this policy will not be used for carrying
            more than one passenger.
          </li>
          <li>
            Any cycle insured under this policy is not an iPed, ePed,
            Velomobile, Streamliner or any cycle of similar specification.
          </li>
        </ul>
        <div className="row">
          <div className="col-10 col-sm-11">
            <h4 className="mb-3">
              <span className="blueFont">I have read and agree</span> that the
              assumptions made above are correct
            </h4>
          </div>
          <div className="col-2 col-sm-1" id="assumptionsTicked">
            <Checkbox
              radius="md"
              size="lg"
              color="velo-blue"
              ref={assumptionsRef}
              onChange={(e) => {
                setGState((prev) => ({
                  ...prev,
                  assumptionsTicked: e.target.checked,
                }));
                if (e.target.checked) {
                  removeClassName(
                    assumptionsRef as React.RefObject<HTMLElement>,
                    "mantine-Checkbox-error",
                  );
                } else {
                  editClassName(
                    assumptionsRef as React.RefObject<HTMLElement>,
                    gState.clickedPayNow,
                    "mantine-Checkbox-error",
                  );
                  setShowPaymentWindow(false);
                }
              }}
              value={gState.assumptionsTicked}
            />
          </div>
        </div>
        <div hidden={!gState.bikes.some((s: Bike) => s.isElectric)}>
          <div id="onlyShowifEbikeInQuote" className="mt-5">
            <h4>
              <span className="blueFont">E-bike</span>:
            </h4>
            <p className=" lufga-regular font-15">
              In order to be classed as an electric bike, an e-bike cannot be
              subject to the UK Road Traffic Act Requirements. We cover e-bike
              that meet the following specification:{" "}
            </p>
            <ul className="greyFont font-15">
              <li>
                Any electrically-assisted pedal cycle (EAPC) that is powered by
                human pedalling and is being assisted only by
                electrically-motored power.
              </li>
              <li>Does not require any key or ignition switch</li>
              <li>
                Has a motor with a continuous rated power that does not exceed
                250W
              </li>
              <li>Has a motor with a cut-off, when unassisted at 3.7mph</li>
              <li>
                Has a motor with a cut-off, when assisting whilst being pedalled
                at 15.5mph
              </li>
            </ul>
            <div className="row">
              <div className="col-10 col-sm-11">
                <h4 className="mb-3">
                  <span className="blueFont">I confirm</span> the maximum motor
                  power for any cycle insured under this policy does not exceed
                  250 Watts and the electric assistance cut-off speed does not
                  exceed 15.5mph.
                </h4>
              </div>
              <div className="col-2 col-sm-1" id="eBikeTicked">
                <Checkbox
                  radius="md"
                  size="lg"
                  ref={eBikeRef}
                  color="velo-blue"
                  onChange={(e) => {
                    setGState((prev) => ({
                      ...prev,
                      eBikeTicked: e.target.checked,
                    }));
                    if (e.target.checked) {
                      removeClassName(
                        eBikeRef as React.RefObject<HTMLElement>,
                        "mantine-Checkbox-error",
                      );
                    } else {
                      editClassName(
                        assumptionsRef as React.RefObject<HTMLElement>,
                        gState.clickedPayNow,
                        "mantine-Checkbox-error",
                      );
                      setShowPaymentWindow(false);
                    }
                  }}
                  value={gState.eBikeTicked}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Assumptions;
