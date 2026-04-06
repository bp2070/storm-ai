import { createProvider, ProviderType, MockConfig } from "./models";
import { DEFAULT_MOCK_DELAY_MS } from "./constants";

const VALID_PROVIDER_TYPES: ProviderType[] = ["mock"];

export interface AppConfig {
  modelName: string;
  endpointUrl: string;
  providerType: ProviderType;
  providerConfig?: MockConfig;
}

function getProviderType(): ProviderType {
  const envValue = process.env.PROVIDER_TYPE ?? "mock";
  if (!VALID_PROVIDER_TYPES.includes(envValue as ProviderType)) {
    throw new Error(
      `Invalid PROVIDER_TYPE: "${envValue}". Valid options: ${VALID_PROVIDER_TYPES.join(", ")}`
    );
  }
  return envValue as ProviderType;
}

const providerType = getProviderType();

export const config: AppConfig = {
  modelName: process.env.MODEL_NAME ?? "mock",
  endpointUrl: process.env.ENDPOINT_URL ?? "local",
  providerType,
  providerConfig: providerType === "mock" ? { delayMs: DEFAULT_MOCK_DELAY_MS } : undefined,
};

export const provider = createProvider(config.providerType, config.providerConfig);
