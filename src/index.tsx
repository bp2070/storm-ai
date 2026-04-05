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
  ThemeProvider,
  useTheme,
} from "@orchetron/storm";
import { config } from "./config";
import { catppuccinTheme, c } from "./theme";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function AppContent() {
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
  const theme = useTheme();

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

  const cols = theme.colors;

  return (
    <Box flexDirection="column" height="100%" width="100%" backgroundColor={cols.surface.base}>
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
            <Text color={cols.thinking.symbol}> Thinking...</Text>
          </Box>
        )}
      </ScrollView>

      <Box flexDirection="column" paddingX={1} gap={1}>
        <Text color={cols.text.secondary}>
          {config.modelName} · {config.endpointUrl}
        </Text>

        <Box borderStyle="single" borderColor={cols.input.borderActive}>
          <Box flexDirection="row">
            <Text color={cols.input.prompt}>{"> "}</Text>
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              placeholder="Type your message..."
              isFocused={true}
              cursorStyle="block"
            />
          </Box>
        </Box>

        <Text dim color={cols.input.border}>
          Press Ctrl+C twice to quit
        </Text>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={catppuccinTheme}>
      <AppContent />
    </ThemeProvider>
  );
}

const app = render(React.createElement(App));
app.waitUntilExit();
