import { useLocation } from "react-router-dom";
import { veloAPIService } from "../../services/veloAPIService";

export const SOBQueryParamHandler = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const sobFromCache = sessionStorage.getItem("sourceOfBusinessId");
  const checkedForOffer = sessionStorage.getItem("checkedForOffer");
  const callCentreUserID = sessionStorage.getItem("CallCentreUserID");
  if (callCentreUserID == null && query.get("CallCentreUserID") != null) {
    sessionStorage.setItem(
      "CallCentreUserID",
      query.get("CallCentreUserID") ?? "",
    );
  }

  if (
    window.location.pathname.toLowerCase().includes("aggregator") ||
    sobFromCache != null ||
    window.location.pathname.toLowerCase().includes("quoteretrieval")
  ) {
    return;
  }

  if (checkedForOffer === null) {
    // loggingService.logInfo("Entered site on : " + window.location.href);
    veloAPIService.CheckAndApplyOfferFull(
      query.get("sourcebusid") ?? undefined,
    );
  }
};

export default SOBQueryParamHandler;
