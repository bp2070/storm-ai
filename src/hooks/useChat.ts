import { useState, useCallback, useRef } from "react";
import { randomUUID } from "crypto";
import { Message } from "../types";
import { LLMProvider } from "../models";
import { RETRY_MAX_ATTEMPTS, RETRY_DELAY_MS } from "../constants";
import { logger, fileLogger } from "../logger";

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
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

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
      setError(null);
      setRetryCount(0);

      let lastError: Error | null = null;
      
      for (let attempt = 1; attempt <= RETRY_MAX_ATTEMPTS; attempt++) {
        setRetryCount(attempt);
        
        try {
          const response = await provider.chat([...messagesRef.current, userMessage]);

          const assistantMessage: Message = {
            id: randomUUID(),
            role: "assistant",
            content: response,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          fileLogger.info({ 
            userMessage: userMessage.content, 
            assistantMessage: assistantMessage.content 
          }, "Chat exchange completed");
          setIsProcessing(false);
          return;
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err));
          logger.warn({ attempt, error: lastError.message }, "Chat attempt failed");
          fileLogger.warn({ attempt, error: lastError.message }, "Chat attempt failed");
          
          if (attempt < RETRY_MAX_ATTEMPTS) {
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
          }
        }
      }

      const message = lastError?.message ?? "An unknown error occurred";
      setError(message);
      setIsProcessing(false);
      fileLogger.error({ error: message }, "Chat failed after retries");
    },
    [provider]
  );

  const clearError = useCallback(() => {
    setError(null);
    setRetryCount(0);
  }, []);

  return { messages, isProcessing, sendMessage, error, clearError, retryCount };
}