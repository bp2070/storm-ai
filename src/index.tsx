import React, { useState, useCallback } from "react";
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
    if (!value.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: value,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I received your message: "${value}". This is a demo response from the AI agent.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1000);
  }, []);

  return (
    <Box flexDirection="column" height="100%" width="100%">
      <Header title="AI Agent" borderBottom />
      
      <ScrollView flex={1} paddingX={1}>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message.content}
            isUser={message.role === "user"}
          />
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