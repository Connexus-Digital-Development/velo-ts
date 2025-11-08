import { useSafeContext } from "@/context/journeyStore";
import * as moment from "moment";
import { modelAdaptorHelper } from "@/utils/modelAdaptorHelper";
import SimpleBikeList from "./SimpleBikeList";
import { type SummaryOfCoverProps } from "@/models/JourneyComponentTypes";

const SummaryOfCover: React.FC<SummaryOfCoverProps> = ({
  detailsText = "Please ensure all of the details are correct. To amend any information please revert back to the required section using the back button below.",
  fromExternalLink = false,
  validateNextButton: _validateNextButton = false,
}) => {
  const [gState, _setGState] = useSafeContext({
    componentName: "SummaryOfCover",
  });

  return (
    <section className="container container_narrow " id="Quote-Summary">
      <div className="content_section  coverSummary">
        {fromExternalLink && (
          <h2 className="text-left font-27 agg-redFont">{detailsText} </h2>
        )}
        {!fromExternalLink && <p className="blueFont">{detailsText}</p>}
        <h2 className="text-left font-27">
          Summary of <span className="blueFont"> your cover</span>.
        </h2>
        <h2 className="text-left mt-4 font-27">
          Your <span className="blueFont "> details</span>.
        </h2>
        <p className="lowerOpacity lufga-light summaryTitle">Name</p>
        <p className="summaryDetail lufga-regular">
          {gState.forename} {gState.surname}
        </p>
        <br />
        <p className="lowerOpacity lufga-light summaryTitle">Date of birth</p>
        <p className="summaryDetail">
          {gState.dob_d + "/" + gState.dob_m + "/" + gState.dob_y}
        </p>
        <br />
        <p className="lowerOpacity lufga-light summaryTitle">
          Address where the bike is usually kept
        </p>
        <address>
          {gState.organisation !== null && (
            <p className="summaryDetail">
              {modelAdaptorHelper.removeNullText(gState.organisation)}
            </p>
          )}
          <p className="summaryDetail">
            {gState.subHouseName !== null && (
              <>{modelAdaptorHelper.removeNullText(gState.subHouseName)} </>
            )}
            {gState.houseName !== null && <>{gState.houseName}</>}
            {(gState.houseName == null || gState.houseName?.length < 1) &&
              gState.houseNo !== null && <>{gState.houseNo}</>}
          </p>
          {gState.addressLine1 !== null && (
            <p className="summaryDetail">
              {modelAdaptorHelper.removeNullText(gState.addressLine1)}{" "}
            </p>
          )}
          {gState.addressLine2 !== null && (
            <p className="summaryDetail">
              {modelAdaptorHelper.removeNullText(gState.addressLine2)}{" "}
            </p>
          )}
          {gState.addressLine3 !== null && (
            <p className="summaryDetail">
              {modelAdaptorHelper.removeNullText(gState.addressLine3)}{" "}
            </p>
          )}
          {gState.addressLine4 !== null && (
            <p className="summaryDetail">
              {modelAdaptorHelper.removeNullText(gState.addressLine4)}{" "}
            </p>
          )}
          <p className="summaryDetail">{gState.postcode}</p>
        </address>
        <p className="lowerOpacity lufga-light summaryTitle ">
          Telephone number
        </p>
        <p className="summaryDetail">{gState.telephoneNo}</p>
        <p className="lowerOpacity lufga-light summaryTitle ">Email address</p>
        <p className="summaryDetail">{gState.email}</p>
        <h2 className="text-left mt-5 font27">
          Your <span className="blueFont"> cover</span>.
        </h2>
        <p className="lowerOpacity lufga-light summaryTitle">
          Cover start date
        </p>
        <p className="summaryDetail">
          {gState.coverStartDate && moment(gState.coverStartDate).isValid()
            ? moment(gState.coverStartDate).format("DD/MM/YYYY")
            : "Not set"}
        </p>
        <p className="lowerOpacity lufga-light summaryTitle">Insured cycle/s</p>
        {<SimpleBikeList bikes={gState.bikes} />}
        <p className="lowerOpacity lufga-light summaryTitle">
          Away from home value
        </p>
        <p className="summaryDetail">
          £
          {gState.awayValue == 0
            ? modelAdaptorHelper.getHomeValue(gState.bikes)
            : gState.awayValue}
        </p>
        <p className="lowerOpacity lufga-light summaryTitle">Bike/s storage</p>
        <p className="summaryDetail">
          {fromExternalLink
            ? "Home (Not an Outbuilding, Communal area or Other)"
            : modelAdaptorHelper.getStorageLocationFromId(
                gState.storageLocation,
              )}
        </p>
        <p className="lowerOpacity lufga-light summaryTitle">Previous claims</p>
        <p className="summaryDetail">{gState.previousClaims ? "Yes" : "No"}</p>
      </div>
    </section>
  );
};

export default SummaryOfCover;
