import { Message } from "../types";

export interface LLMProvider {
  name: string;
  chat(messages: Message[]): Promise<string>;
  streamChat?(messages: Message[]): AsyncGenerator<string, void, unknown>;
}