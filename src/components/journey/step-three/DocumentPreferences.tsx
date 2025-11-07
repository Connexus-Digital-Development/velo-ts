import { Checkbox } from "@mantine/core";
import { JourneyContext } from "@/context/journeyStore";
import { useContext } from "react";
import { type DocumentPreferencesProps } from "@/models/JourneyComponentTypes";

const DocumentPreferences: React.FC<DocumentPreferencesProps> = () => {
  const [gState, setGState] = useContext(JourneyContext);
  const updateContactPref = (e) => {
    setGState({ ...gState, recieveByEmailOnly: e.target.checked });
  };

  return (
    <section className="container container_narrow">
      <div className="content_section mt-3">
        <h3 className="journey-section-titles  mb-4">
          Document<span className="blueFont"> preferences</span>.
        </h3>
        <div className="row">
          <div className="col-10 col-sm-11">
            <p className="lufga-light mt-3">
              Tick here if you want to receive your documents by post at no
              cost.
            </p>
          </div>

          <div className="col-2 col-sm-1">
            <Checkbox
              label=""
              radius="md"
              size="lg"
              color="velo-blue"
              value={gState.recieveByEmailOnly}
              checked={gState.recieveByEmailOnly}
              onChange={(e) => updateContactPref(e)}
            />
          </div>
          <p className="lufga-light">
            All correspondance will be sent to you via email using the email
            address you have provided.
          </p>
        </div>

        <p className="lufga-light mb-4">
          However, we are committed to being as environmentally friendly as
          possible and therefore will not send out postal documents unless
          requested by yourself.
        </p>
      </div>
    </section>
  );
};

export default DocumentPreferences;
