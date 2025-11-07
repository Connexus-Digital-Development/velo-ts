import { useState, useEffect } from "react";
import { initialJourneyState } from "./journeyStoreInitalState";
import { JourneyContext } from "./journeyStoreContext";

export interface journeyStoreProps {
  children: React.ReactNode;
}

export const journeyStore: React.FC<journeyStoreProps> = ({ children }) => {
  const sob = sessionStorage.getItem("sourceOfBusinessId");
  if (sob && sob.length > 0 && sob !== "null" && sob !== null) {
    initialJourneyState.sourceOfBusinessId = sob;
    initialJourneyState.marketingReference = `Retailer - ${sob}`;
    initialJourneyState.customSource = false;
    initialJourneyState.disableSOB = true;
  }
  const [state, setState] = useState(initialJourneyState);

  useEffect(() => {
    const context = sessionStorage.getItem("context");
    if (context) {
      setState(JSON.parse(context));
    } else {
      setState(initialJourneyState);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    const context = sessionStorage.getItem("context");
    if (!!!context) {
      setState(initialJourneyState);
      sessionStorage.removeItem("context");
      sessionStorage.setItem("context", JSON.stringify(state));
    } else {
      sessionStorage.setItem("context", JSON.stringify(state));
    }
  }, [state]);
  return (
    <JourneyContext.Provider value={[state, setState]}>
      {children}
    </JourneyContext.Provider>
  );
};
