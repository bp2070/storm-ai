import React from "react";
import { Box, Text } from "@orchetron/storm";
import { useTheme } from "@orchetron/storm";

interface StatusBarProps {
  modelName: string;
  endpointUrl: string;
}

export function StatusBar({ modelName, endpointUrl }: StatusBarProps) {
  const theme = useTheme();
  const cols = theme.colors;

  return (
    <Box flexDirection="column" paddingX={1} gap={1}>
      <Text color={cols.text.primary}>
        Status: Connected | Model: {modelName} | Endpoint: {endpointUrl}
      </Text>
      <Text color={cols.text.secondary}>
        Press Ctrl+C twice to quit
      </Text>
    </Box>
  );
}