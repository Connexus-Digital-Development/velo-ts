import { contactApi } from "@/services/api/contact";
import { useMutation } from "@tanstack/react-query";

// React Query hooks for contact operations
export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: contactApi.submitContactForm,
    onSuccess: () => {
      // Handle success (show success message, etc.)
    },
  });
};
