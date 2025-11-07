// Service for communicating with REST APIs
import { loggingService } from "./loggingService";
import { type ApiError } from "@models/ServiceTypes";

export const restApiCommBaseService = {
  // Deserialize JSON response received from API and handle errors
  // param response is the response
  handleResponse: (response: Response): Promise<any> => {
    ////console.log(response);
    return response.text().then((text) => {
      const data = text ? JSON.parse(text) : null;

      if (!response.ok) {
        const error: ApiError = {
          message:
            (data && data.message) ||
            (data && data.error_description) ||
            response.statusText,
          status: response.status,
        };
        loggingService.logError(error.message);
        return Promise.reject(error);
      }

      return data;
    });
  },
};
