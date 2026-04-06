import { LLMProvider } from "./LLMProvider";
import { Message } from "../types";
import { DEFAULT_MOCK_DELAY_MS } from "../constants";

export interface MockConfig {
  delayMs?: number;
  responses?: string[];
}

const DEFAULT_CONFIG: MockConfig = {
  delayMs: DEFAULT_MOCK_DELAY_MS,
  responses: [
    "That's an interesting question! Let me think about it.",
    "I understand what you're asking. Here's my response.",
    "Good point! I've considered that in my analysis.",
    "Thanks for sharing that. Here's what I think:",
    "That's a thoughtful message. Let me respond:",
  ],
};

export class MockLLM implements LLMProvider {
  name = "mock";
  private config: MockConfig;

  constructor(config: Partial<MockConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async chat(messages: Message[]): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, this.config.delayMs ?? DEFAULT_MOCK_DELAY_MS));
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const input = lastUserMessage?.content ?? "";

    const responses = this.config.responses ?? DEFAULT_CONFIG.responses ?? [];
    const response = responses[Math.floor(Math.random() * responses.length)] ?? "Response";
    return `${response}\n\nI received your message: "${input}".`;
  }

  async *streamChat(messages: Message[]): AsyncGenerator<string, void, unknown> {
    await new Promise((resolve) => setTimeout(resolve, this.config.delayMs ?? DEFAULT_MOCK_DELAY_MS));
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const input = lastUserMessage?.content ?? "";

    const responses = this.config.responses ?? DEFAULT_CONFIG.responses ?? [];
    const response = responses[Math.floor(Math.random() * responses.length)] ?? "Response";
    const fullResponse = `${response}\n\nI received your message: "${input}".`;
    
    // Stream token by token (mock by splitting on spaces)
    const tokens = fullResponse.split(" ");
    for (let i = 0; i < tokens.length; i++) {
      yield tokens[i] + (i < tokens.length - 1 ? " " : "");
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
}