import { type EmailResponse } from "@/types/api";
import { veloApiClient } from "../apiClient";

// Types for contact form data
export interface ContactFormData {
  natureOfEnquiry: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  enquiry: string;
  marketByTelephone: boolean;
  marketByEmail: boolean;
  marketByTelephoneCarbon: boolean;
  marketByEmailCarbon: boolean;
  acceptedPrivacyPolicy: boolean;
}

// API service functions for contact operations
export const contactApi = {
  submitContactForm: (data: ContactFormData): Promise<EmailResponse> =>
    veloApiClient.post("/api/Email/ContactUs", data),
};
