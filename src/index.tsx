import React, { useState, useCallback } from "react";
import { setTimeout } from "timers/promises";
import { randomUUID } from "crypto";
import {
  render,
  Box,
  Text,
  ScrollView,
  MessageBubble,
  ChatInput,
  Spinner,
  Header,
} from "@orchetron/storm";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI agent. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = useCallback(async (value: string) => {
    const trimmedInput = value.trim();
    if (!trimmedInput) return;

    const userMessage: Message = {
      id: randomUUID(),
      role: "user",
      content: trimmedInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    try {
      await setTimeout(1000);

      const assistantMessage: Message = {
        id: randomUUID(),
        role: "assistant",
        content: `I received your message: "${trimmedInput}". This is a demo response from the AI agent.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      // Silently handle errors; isProcessing is reset in finally
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return (
    <Box flexDirection="column" height="100%" width="100%">
      <Header title="AI Agent" />

      <ScrollView flex={1} paddingX={1}>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role === "user" ? "user" : "assistant"}
          >
            {message.content}
          </MessageBubble>
        ))}
        {isProcessing && (
          <Box paddingX={2} paddingY={1}>
            <Spinner type="dots" />
            <Text color="gray"> Thinking...</Text>
          </Box>
        )}
      </ScrollView>

      <Box borderTop padding={1}>
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          placeholder="Type your message..."
        />
      </Box>
    </Box>
  );
}

const app = render(React.createElement(App));
app.waitUntilExit();