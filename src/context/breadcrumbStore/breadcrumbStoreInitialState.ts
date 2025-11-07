export interface BreadcrumbState {
  yourCoverCrumb: number;
  yourDetailsCrumb: number;
  yourQuoteCrumb: number;
  paymentCrumb: number;
}

export const initialBreadcrumbState: BreadcrumbState = {
  yourCoverCrumb: 0,
  yourDetailsCrumb: 0,
  yourQuoteCrumb: 0,
  paymentCrumb: 0,
};
