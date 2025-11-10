import { transactorService } from "../../services/transactorService";
import { useState } from "react";
import { veloAPIService } from "../../services/veloAPIService";

const SOBBar = ({
  bgColor,
  resetSObBanner,
}: {
  bgColor: string;
  resetSObBanner: () => void;
}) => {
  const [p, setP] = useState(null);
  const [queriedTransactor, setQueriedTransactor] = useState(false);
  const OfferActive = sessionStorage.getItem("OfferActive");
  const fromExternalLink = sessionStorage.getItem("fromExternalLink");
  if (OfferActive === "true" || fromExternalLink === "true") {
    resetSObBanner();
    return;
  }

  if (!queriedTransactor) {
    const sob = sessionStorage.getItem("sourceOfBusinessId");
    transactorService
      .fetchSourceOfBusinessDiscountBannerHtml(sob!)
      .then((data) => {
        if (
          data?.value === null ||
          data?.value?.html === null ||
          data?.value?.html === undefined ||
          data?.value?.html == ""
        ) {
          sessionStorage.removeItem("sourceOfBusinessId");
          veloAPIService.CheckAndApplyOffer();
          resetSObBanner();
          return;
        } else {
          setP(data?.value?.html);
        }
      });
    setQueriedTransactor(true);
  }
  if (p === null) {
    return <></>;
  }

  return (
    <div
      className={`container-fluid SOBBar fixed-top ${bgColor}`}
      style={{ zIndex: "1040" }}
      dangerouslySetInnerHTML={{ __html: p }}
    ></div>
  );
};

export default SOBBar;
