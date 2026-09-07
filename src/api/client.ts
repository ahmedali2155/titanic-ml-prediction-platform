import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "https://prosensia-ml-api.onrender.com";

const API_KEY = import.meta.env.VITE_API_KEY ?? "";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (API_KEY) {
    config.headers.set("x-api-key", API_KEY);
  }
  return config;
});

export interface ApiErrorShape {
  message: string;
  status?: number;
  detail?: unknown;
}

type FastApiValidationError = {
  type?: string;
  loc?: (string | number)[];
  msg?: string;
  input?: unknown;
};

export function normalizeApiError(error: unknown): ApiErrorShape {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{
      detail?: string | FastApiValidationError[];
      message?: string;
    }>;

    if (err.response) {
      const detail = err.response.data?.detail;

      // FastAPI validation errors (422)
      if (Array.isArray(detail)) {
        const message = detail
          .map((item) => {
            const field = item.loc?.[item.loc.length - 1];
            return field
              ? `${field}: ${item.msg}`
              : (item.msg ?? "Validation error");
          })
          .join("\n");

        return {
          message,
          status: err.response.status,
          detail,
        };
      }

      // String error
      if (typeof detail === "string") {
        return {
          message: detail,
          status: err.response.status,
          detail,
        };
      }

      if (typeof err.response.data?.message === "string") {
        return {
          message: err.response.data.message,
          status: err.response.status,
        };
      }

      return {
        message: `Request failed (${err.response.status})`,
        status: err.response.status,
      };
    }

    if (err.code === "ECONNABORTED") {
      return {
        message: "The request timed out. The API may still be starting.",
      };
    }

    return {
      message: "Could not reach the API.",
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Unexpected error.",
  };
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);