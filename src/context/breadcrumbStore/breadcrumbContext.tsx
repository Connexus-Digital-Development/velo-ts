import { createContext } from "react";
import type { BreadcrumbState } from "./breadcrumbStoreInitialState";

export const BreadcrumbContext = createContext<
  | [BreadcrumbState, React.Dispatch<React.SetStateAction<BreadcrumbState>>]
  | undefined
>(undefined);
