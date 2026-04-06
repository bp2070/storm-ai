import { setTimeout } from "timers/promises";
import { LLMProvider } from "./LLMProvider";
import { Message } from "../types";

export interface MockConfig {
  delayMs: number;
  responses: string[];
}

const DEFAULT_CONFIG: MockConfig = {
  delayMs: 1000,
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
    await setTimeout(this.config.delayMs);
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const input = lastUserMessage?.content ?? "";

    const response = this.config.responses[Math.floor(Math.random() * this.config.responses.length)];
    return `${response}\n\nI received your message: "${input}".`;
  }
}