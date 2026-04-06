import React, { useState, useCallback } from "react";
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

function AppContent() {
  const [input, setInput] = useState("");
  const { messages, isProcessing, sendMessage } = useChat(provider);

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
      <MessageList messages={messages} isProcessing={isProcessing} />

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

const app = render(React.createElement(App));
app.waitUntilExit();
