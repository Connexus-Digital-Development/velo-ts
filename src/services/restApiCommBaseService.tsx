// Service for communicating with REST APIs
import { loggingService } from "./loggingService";
import { type ApiError } from "@/models/ServiceTypes";

export const restApiCommBaseService = {
  // Deserialize JSON response received from API and handle errors
  // param response is the response
  handleResponse: async (response: Response): Promise<any> => {
    try {
      const data = await response.json();

      console.log({ data });

      if (!response.ok) {
        const error: ApiError = {
          message:
            (data && data.message) ||
            (data && data.error_description) ||
            response.statusText,
          status: response.status,
        };
        loggingService.logError(error.message);
        throw error;
      }

      return data;
    } catch (error) {
      // Handle JSON parsing errors (including timeouts)
      const apiError: ApiError = {
        message:
          error instanceof Error
            ? error.message
            : "Unknown error occurred",
        status: 0, // Network or parsing error
      };
      loggingService.logError(apiError.message);
      throw apiError;
    }
  },
};
