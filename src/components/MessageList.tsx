import React from "react";
import { Box, ScrollView, MessageBubble, Spinner, Text } from "@orchetron/storm";
import { useTheme } from "@orchetron/storm";
import { Message } from "../types";

interface MessageListProps {
  messages: Message[];
  isProcessing: boolean;
}

export function MessageList({ messages, isProcessing }: MessageListProps) {
  const theme = useTheme();
  const cols = theme.colors;

  return (
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
  );
}