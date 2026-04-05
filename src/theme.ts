import type { StormColors } from "@orchetron/storm";

/** Catppuccin Mocha color tokens */
export const c = {
  crust: "#11111b",
  mantle: "#181825",
  base: "#1e1e2e",
  surface0: "#313244",
  surface1: "#45475a",
  surface2: "#585b70",
  overlay0: "#6c7086",
  overlay1: "#7f849c",
  overlay2: "#9399b2",
  subtext0: "#a6adc8",
  subtext1: "#bac2de",
  text: "#cdd6f4",
  lavender: "#b4befe",
  blue: "#89b4fa",
  sapphire: "#74c7ec",
  sky: "#89dceb",
  teal: "#94e2d5",
  green: "#a6e3a1",
  yellow: "#f9e2af",
  peach: "#fab387",
  maroon: "#eba0ac",
  red: "#f38ba8",
  mauve: "#cba6f7",
  pink: "#f5c2e7",
  flamingo: "#f2cdcd",
  rosewater: "#f5e0dc",
} as const;

export const catppuccinTheme: StormColors = {
  brand: { primary: c.blue, light: c.lavender, glow: c.mauve },
  text: { primary: c.text, secondary: c.subtext0, dim: c.overlay1, disabled: c.surface2 },
  surface: { base: c.base, raised: c.surface0, overlay: c.mantle, highlight: c.surface1 },
  divider: c.surface1,
  success: c.green,
  warning: c.yellow,
  error: c.red,
  info: c.blue,
  system: { text: c.subtext0 },
  user: { symbol: c.lavender },
  assistant: { symbol: c.mauve },
  thinking: { symbol: c.teal, shimmer: c.sky },
  tool: { running: c.yellow, completed: c.green, failed: c.red, pending: c.overlay0, cancelled: c.surface1 },
  approval: { approve: c.green, deny: c.red, always: c.yellow, header: c.lavender, border: c.overlay0 },
  input: { border: c.surface1, borderActive: c.blue, prompt: c.lavender },
  diff: { added: c.green, removed: c.red, addedBg: "#a6e3a133", removedBg: "#f38ba833" },
  syntax: { keyword: c.mauve, string: c.green, number: c.peach, function: c.blue, type: c.yellow, comment: c.overlay2, operator: c.sky },
};

export { c as catppuccin };
