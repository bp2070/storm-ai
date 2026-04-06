import React from "react";
import { Box, ScrollView, MessageBubble, Spinner, Text } from "@orchetron/storm";
import { useTheme } from "@orchetron/storm";
import { Message } from "../types";

interface MessageListProps {
  messages: Message[];
  isProcessing: boolean;
  error?: string | null;
  retryCount?: number;
  onRetry?: () => void;
}

export function MessageList({ messages, isProcessing, error, retryCount = 0, onRetry }: MessageListProps) {
  const theme = useTheme();

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
          <Text color={theme.colors.thinking.symbol}> Thinking...</Text>
        </Box>
      )}
      {error && (
        <Box paddingX={2} paddingY={1} flexDirection="column" gap={1}>
          <Text color="red">
            {retryCount > 1 ? `Error (attempt ${retryCount}/3): ${error}` : `Error: ${error}`}
          </Text>
          {onRetry && (
            <Text color="blue">
              [Press Enter to retry]
            </Text>
          )}
        </Box>
      )}
    </ScrollView>
  );
}