import { modelAdaptorHelper as helper } from "@/utils/modelAdaptorHelper";
import * as moment from "moment";
// convert the collected globalState data into a model accepted by transactor API
import { type JourneyState } from "@/models/JourneyTypes";
import { type RiskModel } from "@/models/QuoteTypes";

const useRiskModelAdaptor = (globalState: JourneyState): RiskModel | null => {
  if (!globalState.coverStartDate) {
    return null;
  }
  const homeAwayValue = helper.getHomeValue(globalState.bikes);
  const riskModel: RiskModel = {
    homeValue: homeAwayValue,
    awayValue:
      globalState.awayValue > 0 ? globalState.awayValue : homeAwayValue,
    bicycles: helper.getBikeCollection(globalState.bikes),
    hasSecondaryAddress: false,
    secondaryAddress: {
      address: {
        city: "",
        country: "",
        county: "",
        house: "",
        locality: "",
        postcode: "",
      },
    },

    isElectric: helper.AnyElectricBikes(globalState.bikes),
    publicLiabilityCoverId: "3PSCQ606",
    includeFamilyCover: true,
    accessoriesCoverId: "3PTTPOB7",
    hasPreviousClaims: globalState.hasPreviousClaim ?? false,
    saleId: null,
    includeWorldwideCover: helper.AnyElectricBikes(globalState.bikes)
      ? globalState.worldwideCover
      : true,
    includeSportsCover: helper.AnyElectricBikes(globalState.bikes)
      ? globalState.sportsCover
      : true,
    includeSportCover: helper.AnyElectricBikes(globalState.bikes)
      ? globalState.sportsCover
      : true,
    // includePersonalAccidentCover: helper.AnyElectricBikes(globalState.bikes) ? globalState.personalAccident : true,
    includePersonalAccidentCover:
      helper.AnyElectricBikes(globalState.bikes) && globalState.personalAccident
        ? true
        : false,
    includePersonalAccidentCoverCore:
      helper.AnyElectricBikes(globalState.bikes) &&
      globalState.personalAccidentCore
        ? true
        : false,
    includePersonalAccidentCoverPerformance:
      helper.AnyElectricBikes(globalState.bikes) &&
      globalState.personalAccidentPerformance
        ? true
        : false,
    includeRoadRageCover: helper.AnyElectricBikes(globalState.bikes)
      ? globalState.personalAccident
      : true, // this looks odd here but in the journey
    includeAccessoriesCover: true,
    europeanCover: true,
    cycleHire: true,
    proposer: {
      title: globalState.title,
      titleId: helper.getTitleId(globalState.title.toLowerCase()) as number,
      forename: globalState.forename,
      initials: "",
      surname: globalState.surname,
      emailAddress: globalState.email,
      dateOfBirth: helper
        .getFormattedDOBFromDateParts(
          parseInt(globalState.dob_d),
          parseInt(globalState.dob_m) - 1,
          parseInt(globalState.dob_y),
        )
        .toISOString(),
      gender: "",
      address: {
        house: [
          globalState?.organisation?.trim(),
          globalState.houseNo?.trim(),
          globalState.houseName?.trim(),
        ]
          .filter(Boolean)
          .join(" ")
          .trim(),
        postcode: globalState.postcode.replaceAll(" ", ""),
        street: globalState.addressLine1,
        locality: globalState.addressLine3,
        city: globalState.addressLine2,
        county: globalState.addressLine4,
        country: "UK",
      },
      telephone: {
        number: globalState.telephoneNo,
        telephoneTypeId: "3AJPQ7C4",
      },
    },
    policy: {
      policyReference: null,
      policyStatusId: null,
      paymentPlanId: null,
      portfolioKey: null,
      agentId: null,
      productId: null,
      schemeId: globalState.schemeId,
      schemeTable: globalState.schemeTable,
      premium: null,
      stopRenewal: null,
      insurerPolicyReference: null,
      createdBy: null,
      coverStartDate: moment(globalState.coverStartDate).isSame(moment(), "day")
        ? moment(new Date().toUTCString()).toDate()
        : moment(new Date(globalState.coverStartDate).toUTCString())
            .startOf("day")
            .toDate(),
      coverEndDate: moment(new Date(globalState?.coverStartDate).toUTCString())
        .startOf("day")
        .add(1, "y")
        .subtract(1, "s")
        .toDate(),
      inceptionDate: null,
      originalInceptionDate: null,
      GuaranteeDate: null,
    },
    marketing: {
      sourceOriginId: "3M7V0775",
      sourceBusinessId:
        globalState.sourceOfBusinessId &&
        globalState.sourceOfBusinessId !== "null"
          ? globalState.sourceOfBusinessId
          : "0",
      allowMailFromAdmin: globalState.adminEmail,
      allowMailFromThirdParty: globalState.thirdPartyEmail,
      allowTelephoneFromAdmin: globalState.adminPhone,
      allowTelephoneFromThirdParty: globalState.thirdPartyPhone,
      preferredMethodOfContact: globalState.preferredMethodOfContact,
      preferredMethodOfContact_id: globalState.recieveByEmailOnly
        ? "3EHPHID8"
        : "3EHPHID7",
      reference: globalState.customSource
        ? globalState.marketingReference!
        : (
            globalState.marketingReference
              ?.replace(/^Retailer\s*-?\s*/, "")
              .trim() ?? "0"
          ).toString(),
      contactByPostAndEmail: globalState.recieveByEmailOnly,
    },
    paymentDetails: {
      paymentTypeId: null,
      bankDetails: null,
      cardDetails: null,
    },
    callCentreUserID: sessionStorage.getItem("CallCentreUserID"),
    aggregatorQuoteId: globalState.aggregatorQuoteId,
    newDD: true,
  };
  // console.log("iselectric", riskModel.isElectric);
  // console.log("PA cover", globalState.personalAccident);
  // console.log(
  //   "Perf cover RISK",
  //   riskModel.includePersonalAccidentCoverPerformance
  // );
  // console.log("Core cover RISK", riskModel.includePersonalAccidentCoverCore);
  return riskModel;
};

export default useRiskModelAdaptor;
