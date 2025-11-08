import { useContext } from "react";
import { JourneyContext } from "./journeyStoreContext";

export function useSafeContext({ componentName }: { componentName: string }) {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error(
      `${componentName} component must be used within a JourneyContext provider`,
    );
  }
  return context;
}
