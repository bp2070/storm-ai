# storm-ai

A terminal UI AI agent built with [@orchetron/storm](https://github.com/orchetron/storm) and React.

## Getting Started

```bash
# Install dependencies
pnpm install

# Run in dev mode (builds then starts)
pnpm run dev

# Build only
pnpm run build

# Run built output
pnpm start
```

## Project Structure

```
├── src/
│   └── index.tsx    # Main application entry point
├── build.ts         # esbuild configuration
├── package.json     # Dependencies and scripts
└── tsconfig.json    # TypeScript configuration
```

## Tech Stack

- **React 19** — UI rendering
- **[@orchetron/storm](https://github.com/orchetron/storm)** — Terminal UI components
- **esbuild** — Bundler
- **TypeScript** — Type safety
