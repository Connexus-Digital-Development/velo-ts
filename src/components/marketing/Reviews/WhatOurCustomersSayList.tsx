import { useEffect } from "react";

const WhatOurCustomersSayList = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apps.elfsight.com/p/platform.js";
    script.defer = true;
    script.async = true;
    script.dataset.elfsightLoader = "reviews-list";
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="container-fluid whiteBG oh pr">
      <div className="container mt-5 mb-5">
        <div className="elfsight-app-67c39d73-9a57-4545-90dd-436b395ee4a0"></div>
      </div>
    </div>
  );
};

export default WhatOurCustomersSayList;
