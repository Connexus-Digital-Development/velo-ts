import helper from "@utils/ModelAdaptorHelper";
import moment from "moment";
import { JourneyState } from "@models/JourneyTypes";
import { CoreQuote, PerformanceQuote, SelectedCoreScheme } from "@models/QuoteTypes";
const useGlobalStateAdaptor = (
  coreQuote: CoreQuote,
  performanceQuote: PerformanceQuote,
  selectedCoreScheme: SelectedCoreScheme,
  aggregatorQuoteId: string
): JourneyState => {
  // convert the aggregator model accepted by transactor API to the globalState data

  console.log("selectedCoreScheme?", selectedCoreScheme);
  console.log("core", coreQuote);
  console.log(
    "performance",

    performanceQuote
  );
  if (!!!coreQuote) {
    return {
      bikes: [{ make: "" }],
      loading: true,
    } as JourneyState;
  }
  var i = 0;
  const state: JourneyState = {
    id: 0,
    loading: false,
    make: "",
    model: "",
    value: 0,
    combinedHomeValue: 0,
    isElectric: coreQuote?.isElectric ?? coreQuote?.isElectric ?? false,
    accessoryCover: coreQuote.includeAccessoriesCover,
    worldwideCover: coreQuote.includeWorldWideCover,
    sportsCover: coreQuote?.includeSportCover ?? false,
    personalAccident: coreQuote.includePersonalAccidentCover,
    bikes: coreQuote.bicycles.map((m) => {
      return {
        id: i++,
        make: m.make,
        model: m.model,
        value: m.homeValue,
        isElectric:
          coreQuote.bicycles.length === 1
            ? coreQuote?.isElectric
            : m?.isElectric ?? false,
      };
    }),
    hasPreviousClaim: false,
    title: coreQuote.title,
    titleId: helper.getTitleId(coreQuote.title.toLowerCase()),
    forename: coreQuote.forename,
    surname: coreQuote.surname,
    dob: coreQuote.dateOfBirth,
    dob_d: new Date(coreQuote.dateOfBirth).getDate(),
    dob_m: new Date(coreQuote.dateOfBirth).getMonth() + 1,
    dob_y: new Date(coreQuote.dateOfBirth).getFullYear(),
    telephoneNo: coreQuote.number,
    email: coreQuote.emailaddress,
    houseNo: null,
    houseName: coreQuote.house,
    houseSubName: null,
    organisation: null,
    postcode: coreQuote.postcode,
    addressLine1: coreQuote.street,
    addressLine2: coreQuote.city,
    addressLine3: coreQuote.locality,
    addressLine4: coreQuote.county,
    keptAtHome: true,
    coverStartDate: moment(new Date(coreQuote.coverStartDate)).isBefore(
      new Date()
    )
      ? new Date()
      : new Date(coreQuote.coverStartDate),
    storageLocation: 1,
    declineReason: coreQuote.quoteResponse.declineReason,
    quoteReference: coreQuote.quoteResponse.quoteReference,
    referralReason: coreQuote.quoteResponse.referralReason,
    yourCoverCrumb: 0,
    yourDetailsCrumb: 0,
    yourQuoteCrumb: 0,
    paymentCrumb: 0,
    showAddressPreview: false,
    currentlyAddingABike: false,
    currentlyEditingABike: false,
    AboutYourBikeFormIsValid: false,
    AboutYouFormIsValid: false,
    hideAddressForm: true,
    paymentTypeIsAnnual: false,
    paymentSuccessful: false,
    adminPhone: coreQuote?.allowTelephoneFromAdmin ?? false,
    adminEmail: coreQuote?.allowMailFromAdmin ?? false,
    thirdPartyPhone: coreQuote?.allowTelephoneFromThirdParty ?? false,
    thirdPartyEmail: coreQuote?.allowMailFromThirdParty ?? false,
    marketingReference:
      coreQuote.sourceBusinessId == "60" || coreQuote.sourceBusinessId == 60
        ? "Retailer - QuoteZone"
        : coreQuote.sourceBusinessId,
    sourceOfBusinessId: coreQuote.sourceBusinessId, //should be 60 for quotezone
    customSource: false,
    disableSOB: true,
    coreQuote: coreQuote.quoteResponse,
    performanceQuote: performanceQuote.quoteResponse,
    initQuote: performanceQuote.quoteResponse,
    selectedCoreScheme: selectedCoreScheme,
    aggregatorQuoteId: aggregatorQuoteId,
    awayValue: coreQuote.awayValue,
    personalAccidentCore: coreQuote.includePersonalAccidentCover,
    personalAccidentPerformance: performanceQuote.includePersonalAccidentCover,
  };
  console.log("useGlobalStateAdaptor", state);
  sessionStorage.setItem(
    "sourceOfBusinessId",
    coreQuote.sourceBusinessId.toUpperCase()
  );
  sessionStorage.setItem("fromExternalLink", "true");
  return state;
};

export default useGlobalStateAdaptor;
