import type { StormColors } from "@orchetron/storm";

/** Crush/CharmTone color palette */
export const charmtone = {
  // Primary / accent
  charple: "#6B50FF",
  dolly: "#FF60FF",
  bok: "#68FFD6",

  // Backgrounds
  pepper: "#201F26",
  bbq: "#2D2C35",
  charcoal: "#3A3943",
  iron: "#4D4C57",

  // Foregrounds
  ash: "#DFDBDD",
  squid: "#858392",
  smoke: "#BFBCC8",
  oyster: "#605F6B",

  // Colors
  white: "#FFFAF1",
  blueLight: "#4FBEFE",
  blue: "#00A4FF",
  blueDark: "#007AB8",
  greenLight: "#68FFD6",
  green: "#00FFB2",
  greenDark: "#12C78F",
  red: "#FF577D",
  redDark: "#EB4268",
  yellow: "#F5EF34",
  zest: "#E8FE96",
  sriracha: "#EB4268",
  coral: "#FF577D",
  malibu: "#00A4FF",
  guac: "#12C78F",
  julep: "#00FFB2",
} as const;

export const charmtoneTheme: StormColors = {
  brand: { primary: charmtone.charple, light: charmtone.dolly, glow: charmtone.bok },
  text: { primary: charmtone.ash, secondary: charmtone.squid, dim: charmtone.oyster, disabled: charmtone.charcoal },
  surface: { base: charmtone.pepper, raised: charmtone.bbq, overlay: charmtone.iron, highlight: charmtone.charcoal },
  divider: charmtone.charcoal,
  success: charmtone.julep,
  warning: charmtone.zest,
  error: charmtone.sriracha,
  info: charmtone.malibu,
  system: { text: charmtone.squid },
  user: { symbol: charmtone.dolly },
  assistant: { symbol: charmtone.charple },
  thinking: { symbol: charmtone.greenDark, shimmer: charmtone.greenLight },
  tool: { running: charmtone.yellow, completed: charmtone.green, failed: charmtone.redDark, pending: charmtone.oyster, cancelled: charmtone.charcoal },
  approval: { approve: charmtone.green, deny: charmtone.red, always: charmtone.yellow, header: charmtone.dolly, border: charmtone.oyster },
  input: { border: charmtone.charcoal, borderActive: charmtone.charple, prompt: charmtone.dolly },
  diff: { added: charmtone.julep, removed: charmtone.coral, addedBg: "#00FFB233", removedBg: "#FF577D33" },
  syntax: { keyword: charmtone.charple, string: charmtone.julep, number: charmtone.coral, function: charmtone.malibu, type: charmtone.zest, comment: charmtone.oyster, operator: charmtone.greenLight },
};
