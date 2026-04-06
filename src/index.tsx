import React, { useState, useCallback, useEffect } from "react";
import {
  render,
  Box,
  ChatInput,
  ThemeProvider,
} from "@orchetron/storm";
import { config, provider } from "./config";
import { charmtoneTheme } from "./themes/charmtone";
import { useChat } from "./hooks/useChat";
import { ChatHeader } from "./components/ChatHeader";
import { MessageList } from "./components/MessageList";
import { StatusBar } from "./components/StatusBar";
import { logger, fileLogger } from "./logger";

function AppContent() {
  const [input, setInput] = useState("");
  const { messages, isProcessing, sendMessage, error, clearError, retryCount } = useChat(provider);

  useEffect(() => {
    const handleBeforeExit = () => {
      logger.info("Application shutting down gracefully");
      fileLogger.info("Application shutting down gracefully");
    };

    process.on("SIGINT", handleBeforeExit);
    process.on("SIGTERM", handleBeforeExit);

    return () => {
      process.removeListener("SIGINT", handleBeforeExit);
      process.removeListener("SIGTERM", handleBeforeExit);
    };
  }, []);

  const handleSubmit = useCallback(
    async (value: string) => {
      setInput("");
      await sendMessage(value);
    },
    [sendMessage]
  );

  return (
    <Box flexDirection="column" height="100%" width="100%">
      <ChatHeader />
      <MessageList messages={messages} isProcessing={isProcessing} error={error} retryCount={retryCount} onRetry={clearError} />

      <Box flexDirection="column" paddingX={1} gap={1}>
        <StatusBar modelName={config.modelName} endpointUrl={config.endpointUrl} />

        <Box borderStyle="single">
          <Box flexDirection="row">
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              placeholder="Type your message..."
              isFocused={true}
              cursorStyle="block"
              disabled={isProcessing}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={charmtoneTheme}>
      <AppContent />
    </ThemeProvider>
  );
}

logger.info("Application starting");
fileLogger.info("Application starting");

const app = render(React.createElement(App));
app.waitUntilExit();
