// Marketing Component Types
// Type definitions for marketing-specific components and their props

// FAQ Component Types
export interface QuestionProps {
  filteredData: FAQItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

// export interface FAQSectionProps {
//   // FAQ section component props if needed
// }

// Contact Form Types
export interface ContactUsFormValues {
  forename: string;
  surname: string;
  email: string;
  telephoneNo: string;
  enquiry: string;
  confirmPrivacy: boolean;
  marketByTelephone: boolean;
  marketByEmail: boolean;
  marketByTelephoneCarbon: boolean;
  marketByEmailCarbon: boolean;
}

// Travel Component Types
export interface TravelInsuranceData {
  // Define structure based on actual data usage
  [key: string]: any;
}

// Retailer Affiliate Component Types
export interface AffiliateSignupFormValues {
  // Define based on signup form fields
  [key: string]: any;
}

// Blog Component Types
export interface LatestBlogProps {
  latestBlog?: BlogPost | null;
}

export interface BlogPost {
  headline: string;
  imageUrl: string;
  Headline: string;
  subHeading: string;
  pageURL: string;
}

// Cover Comparison Types
export interface CoverComparisonData {
  // Define structure based on comparison table data
  [key: string]: any;
}

// Bike Types for Marketing
export interface MarketingBikeType {
  name: string;
  description: string;
  image?: string;
  features?: string[];
}

// Customer Review Types
export interface CustomerReview {
  id: string | number;
  name: string;
  location?: string;
  rating: number;
  review: string;
  date?: string;
}

// Feature Types
export interface InsuranceFeature {
  title: string;
  description: string;
  included: boolean;
  coreOnly?: boolean;
  performanceOnly?: boolean;
}

// Common Marketing Component Props
export interface BaseMarketingProps {
  className?: string;
  children?: React.ReactNode;
}

// Event handler types for marketing components
export type MarketingButtonClickHandler = (
  e: React.MouseEvent<HTMLButtonElement>,
) => void;
export type MarketingLinkClickHandler = (
  e: React.MouseEvent<HTMLAnchorElement>,
) => void;
export type MarketingFormSubmitHandler = (values: any) => void;

// SEO and Meta types
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

// Banner component types (shared)
export interface BannerProps extends BaseMarketingProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

// CTA Button types (already defined in shared, but extending for marketing context)
export interface MarketingCTAProps {
  text: string;
  link: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  onClick?: MarketingButtonClickHandler;
}
