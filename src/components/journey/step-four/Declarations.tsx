import { Checkbox } from "@mantine/core";
import { useContext, useEffect, useRef } from "react";
import { JourneyContext } from "@/context/journeyStore";
import { editClassName, removeClassName } from "@utils/ClassNameEditor";
import ModelAdaptorHelper from "@utils/ModelAdaptorHelper";
import BikeListWithLockInfo from "./BikeListWithLockInfo";
import { type DeclarationsProps } from "@/models/JourneyComponentTypes";
import { type Bike } from "@/models/bike";

const cycleRescuePolicyWording =
  "/documents/Velosure.Policy.Wording.January.2025.pdf";
const velosurePolicyWording =
  "/documents/VELO206.-.Chubb.Velosure.Policy.Wording.digital.pdf";
const VELO002CoreCycleInsurancePolicySchedule =
  "/documents/VELO205.-.Chubb.CORE.Velosure.IPID.pdf";
const VELO002CycleInsurancePolicySchedule =
  "/documents/VELO205.-.Chubb.Performance.Velosure.IPID.pdf";
const termsOfBusiness =
  "/documents/VELO207.-.Velosure.Terms.of.Business.TM.V3.pdf";
const veleosureCycleRescueIPID = "/documents/Velosure.Cycle.Policy.IPID.pdf";
const privacyPolicyV1 = "/documents/Velosure_Privacy_Notice_V1_2023.pdf";

const Declarations: React.FC<DeclarationsProps> = ({
  setShowPaymentWindow,
}) => {
  const readDocumentsTickedRef = useRef<HTMLInputElement>(null!);
  const storageLocationTickedRef = useRef<HTMLInputElement>(null!);
  const [gState, setGState] = useContext(JourneyContext);
  useEffect(() => {
    editClassName(
      readDocumentsTickedRef,
      gState.clickedPayNow && !gState.readDocumentsTicked,
      "mantine-Checkbox-error",
    );
    editClassName(
      storageLocationTickedRef,
      gState.clickedPayNow && !gState.storageLocationTicked,
      "mantine-Checkbox-error",
    );
  }, [gState]);
  const getLocation = (id: number | null) => {
    return ModelAdaptorHelper.getStorageLocation(id);
  };

  const updateLockChecked = (id: number, checked: boolean) => {
    const bike = gState.bikes.find((x: Bike) => x.id === id);
    if (bike) {
      bike.lockChecked = checked;
      if (!checked) {
        setShowPaymentWindow?.(false);
      }
      setGState({ ...gState, bikes: gState.bikes });
    }
  };

  const storageLocationSection = (storageLocation: string) => {
    let storageLocationText = "";
    switch (storageLocation) {
      case "Outbuilding":
        storageLocationText =
          "All external doors must be secured by a minimum of: a 5 lever mortice deadlock to BS3621 standard, or  a 5 lever padlock, or a CEN grade 3, 4, 5 or 6 rated padlock OR  the cycle must be secured through the frame by an approved lock to an immovable object within the building.";
        break;
      case "Communal Area":
        storageLocationText =
          "The cycle/s must be secured through the frame by an approved lock to an immovable object within the building.";
        break;
      default:
        storageLocationText =
          "Cycle is kept inside and any security devices are in operation";
        break;
    }

    return (
      <>
        <h4>
          Insured location security requirements:{" "}
          <span className="blueFont">{storageLocation}</span>
        </h4>
        <p className="lufga-regular">{storageLocationText}</p>
      </>
    );
  };

  return (
    <section className="container container_narrow">
      <div className="content_section mt-3">
        <h4 className="lufga-medium fs-27">
          <span className="blueFont lufga-medium">Declarations</span>.
        </h4>
        <div className="row">
          <div className="col-10 col-sm-11">
            <h4 className="lufga-medium fs-23">
              I confirm I have been given the opportunity and understand the
              instruction, to read and consider the following documents.
            </h4>
          </div>
          <div className="col-2 col-sm-1 " id="readDocumentsTicked">
            <Checkbox
              radius="md"
              size="lg"
              color="velo-blue"
              ref={readDocumentsTickedRef}
              onChange={(e) => {
                setGState({
                  ...gState,
                  readDocumentsTicked: e.target.checked,
                });
                if (e.target.checked) {
                  removeClassName(
                    readDocumentsTickedRef,
                    "mantine-Checkbox-error",
                  );
                } else {
                  editClassName(
                    readDocumentsTickedRef,
                    gState.clickedPayNow,
                    "mantine-Checkbox-error",
                  );
                  setShowPaymentWindow?.(false);
                }
              }}
              checked={gState.readDocumentsTicked}
            />
          </div>
        </div>

        <ul className="DeclarationUL mb-5 mt-3">
          <a
            href={VELO002CycleInsurancePolicySchedule}
            target="_blank"
            rel="noreferrer"
            hidden={gState.selectedCoreScheme}
          >
            <li>Velosure Insurance Performance Product Information Document</li>
          </a>
          <a
            href={VELO002CoreCycleInsurancePolicySchedule}
            target="_blank"
            rel="noreferrer"
            hidden={!gState.selectedCoreScheme}
          >
            <li>Velosure Insurance Core Product Information Document</li>
          </a>
          <a href={velosurePolicyWording} target="_blank" rel="noreferrer">
            <li>Velosure Policy Wording</li>
          </a>
          <a href={termsOfBusiness} target="_blank" rel="noreferrer">
            <li>Velosure Terms of Business</li>
          </a>
          <a href={privacyPolicyV1} target="_blank" rel="noreferrer">
            <li>Velosure Privacy Policy</li>
          </a>
          <a
            href={veleosureCycleRescueIPID}
            target="_blank"
            rel="noreferrer"
            hidden={gState.selectedCoreScheme}
          >
            <li>Cycle Rescue Insurance Product Information Document</li>
          </a>
          <a
            href={cycleRescuePolicyWording}
            target="_blank"
            rel="noreferrer"
            hidden={gState.selectedCoreScheme}
          >
            <li>Cycle Rescue Policy Wording</li>
          </a>
        </ul>

        <div className="row">
          <div className="col-10 col-sm-11">
            {storageLocationSection(getLocation(gState.storageLocation))}
          </div>
          <div className="col-2 col-sm-1" id="storageLocationTicked">
            <Checkbox
              radius="md"
              size="lg"
              ref={storageLocationTickedRef}
              color="velo-blue"
              onChange={(e) => {
                setGState({
                  ...gState,
                  storageLocationTicked: e.target.checked,
                });
                if (e.target.checked) {
                  removeClassName(
                    storageLocationTickedRef,
                    "mantine-Checkbox-error",
                  );
                } else {
                  editClassName(
                    storageLocationTickedRef,
                    gState.clickedPayNow,
                    "mantine-Checkbox-error",
                  );
                  setShowPaymentWindow?.(false);
                }
              }}
              checked={gState.storageLocationTicked}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-10">
            <p className="lufga-regular">
              <span className="blueFont">
                I have a <a href="https://www.soldsecure.com">Sold Secure</a>{" "}
                rated lock or lock of equivalent security
              </span>
              ; appropriate to the value of my cycle(s) in accordance with the
              classification of locks determined by the Master Locksmiths
              Association (MLA) ‘
              <a href="https://www.soldsecure.com">Sold Secure</a>’ list:
            </p>
          </div>
          <div className="col-4 col-sm-2"></div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-12">
            <BikeListWithLockInfo
              bikes={gState.bikes}
              updateLockChecked={updateLockChecked}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Declarations;
