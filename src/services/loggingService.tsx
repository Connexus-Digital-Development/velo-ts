import { type LogEntry } from "@/models/ServiceTypes";

export const loggingService = {
  logError: (message: unknown): Promise<Response> => {
    return log("LogError", message);
  },
  logWarning: (message: unknown): Promise<Response> => {
    return log("LogWarning", message);
  },
  logInfo: (message: unknown): Promise<Response> => {
    return log("Log", message);
  },
};

const log = (url: string, message: unknown): Promise<Response> => {
  const logEntry: Partial<LogEntry> = {
    message: String(message),
    applicationName: "Velosure",
    level:
      url === "LogError" ? "error" : url === "LogWarning" ? "warn" : "info",
    timestamp: new Date(),
  };

  const opts: RequestInit = {
    method: "POST",
    headers: {
      accept: "text/plain",
      "content-type": "application/json",
    },
    body: JSON.stringify(logEntry),
  };

  const base = import.meta.env["VITE_LOGGING_API_URL"] || "";
  return fetch(`${base}/api/Logging/${url}`, opts);
};
