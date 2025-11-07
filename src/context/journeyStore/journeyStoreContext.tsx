import type { JourneyState } from "@/models";
import { createContext } from "react";

export const JourneyContext = createContext<
  [JourneyState, React.Dispatch<React.SetStateAction<JourneyState>>] | undefined
>(undefined);
