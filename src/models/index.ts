import { LLMProvider } from "./LLMProvider";
import { MockLLM } from "./MockLLM";

export type ProviderType = "mock";

export function createProvider(type: ProviderType, _config?: unknown): LLMProvider {
  switch (type) {
    case "mock":
      return new MockLLM(_config as Parameters<typeof MockLLM>[0]);
    default:
      throw new Error(`Unknown provider type: ${type}`);
  }
}

export { LLMProvider } from "./LLMProvider";
export { MockLLM } from "./MockLLM";