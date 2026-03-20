export const ABOUT_YOU_POSTCODE_REGEX =
  /^(([A-Z][A-HJ-Y]?\d[A-Z\d]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?\d[A-Z]{2}|BFPO ?\d{1,4}|(KY\d|MSR|VG|AI)[ ]?\d{4}|[A-Z]{2} ?\d{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/;

export const TITLE_OPTIONS = [
  { label: "Mr", value: "Mr", titleId: "106" },
  { label: "Mrs", value: "Mrs", titleId: "107" },
  { label: "Ms", value: "Ms", titleId: "107" },
  { label: "Miss", value: "Miss", titleId: "107" },
  { label: "Dr", value: "Dr", titleId: "107" },
  { label: "Mx", value: "Mx", titleId: "107" },
] as const;

export const MARKETING_REFERENCE_OPTIONS = [
  "Search engine",
  "Social media",
  "Recommended",
  "Retailer",
  "Cycle club",
  "Event",
  "Previous policyholder",
  "Other",
] as const;

export const DAY_OPTIONS = Array.from({ length: 31 }, (_, index) => index + 1);
export const MONTH_OPTIONS = Array.from(
  { length: 12 },
  (_, index) => index + 1,
);

export const MINIMUM_AGE = 18;
export const MAXIMUM_AGE = 90;

export const getYearRange = () => {
  const currentYear = new Date().getFullYear();
  const latestYear = currentYear - MINIMUM_AGE;
  const earliestYear = currentYear - MAXIMUM_AGE;

  return {
    earliestYear,
    latestYear,
    years: Array.from(
      { length: latestYear - earliestYear + 1 },
      (_, index) => latestYear - index,
    ),
  };
};
