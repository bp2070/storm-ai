import { LLMProvider } from "./LLMProvider";
import { MockLLM, MockConfig } from "./MockLLM";

export type ProviderType = "mock";

type ProviderConfigMap = {
  mock: MockConfig;
};

export function createProvider<T extends ProviderType>(
  type: T,
  config?: ProviderConfigMap[T]
): LLMProvider {
  switch (type) {
    case "mock":
      return new MockLLM(config as MockConfig);
    default:
      throw new Error(`Unknown provider type: ${type}`);
  }
}

export { LLMProvider } from "./LLMProvider";
export { MockLLM } from "./MockLLM";
export type { MockConfig } from "./MockLLM";