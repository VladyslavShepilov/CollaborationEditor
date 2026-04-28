import { OpenAPI } from "./generated";

type ConfigureApiClientParams = {
  baseUrl?: string;
  token?: string;
};

/**
 * Central place for API client configuration.
 * Called once at app startup and can be reused after auth changes.
 */
export const configureApiClient = ({
  baseUrl,
  token,
}: ConfigureApiClientParams = {}): void => {
  OpenAPI.BASE = baseUrl ?? OpenAPI.BASE ?? "";
  OpenAPI.TOKEN = token;
};

export const configureApiClientFromEnv = (): void => {
  configureApiClient({
    baseUrl: import.meta.env.VITE_API_URL ?? "",
  });
};
