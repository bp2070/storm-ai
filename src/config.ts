import { createProvider, ProviderType, MockLLM } from "./models";

export interface AppConfig {
  modelName: string;
  endpointUrl: string;
  providerType: ProviderType;
  providerConfig?: Parameters<typeof MockLLM>[0];
}

const providerType = (process.env.PROVIDER_TYPE as ProviderType) ?? "mock";

export const config: AppConfig = {
  modelName: process.env.MODEL_NAME ?? "mock",
  endpointUrl: process.env.ENDPOINT_URL ?? "local",
  providerType,
  providerConfig: providerType === "mock" ? { delayMs: 1000 } : undefined,
};

export const provider = createProvider(config.providerType, config.providerConfig);
