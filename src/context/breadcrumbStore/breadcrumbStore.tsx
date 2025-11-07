import { useState, type ReactNode } from "react";

import {
  initialBreadcrumbState,
  type BreadcrumbState,
} from "./breadcrumbStoreInitialState";
import { BreadcrumbContext } from "../breadcrumbStore";

interface BreadcrumbStoreProps {
  children: ReactNode;
}

const BreadcrumbStore: React.FC<BreadcrumbStoreProps> = ({ children }) => {
  const [bState, setBState] = useState<BreadcrumbState>(initialBreadcrumbState);

  return (
    <BreadcrumbContext.Provider value={[bState, setBState]}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export default BreadcrumbStore;
