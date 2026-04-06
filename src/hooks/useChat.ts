import { useState, useCallback } from "react";
import { randomUUID } from "crypto";
import { Message } from "../types";
import { LLMProvider } from "../models";

export function useChat(provider: LLMProvider) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI agent. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed) return;

      const userMessage: Message = {
        id: randomUUID(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsProcessing(true);

      try {
        const response = await provider.chat([...messages, userMessage]);

        const assistantMessage: Message = {
          id: randomUUID(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        // Silently handle errors; isProcessing is reset in finally
      } finally {
        setIsProcessing(false);
      }
    },
    [provider, messages]
  );

  return { messages, isProcessing, sendMessage };
}