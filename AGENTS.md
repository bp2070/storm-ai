# AGENTS.md

This file provides guidance to AI coding agents.

## Commands

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run the application
npm start

# Build and run (dev)
npm run dev
```

## Architecture

This is a terminal UI application using React and the `@orchetron/storm` TUI framework.

- **Entry point:** `src/index.tsx` — renders a chat interface with Storm components
- **Build system:** Custom esbuild script (`build.ts`) — bundles TSX to ESM for Node.js
- **TypeScript:** Strict mode, no emit (build handled by esbuild)

## Code Style

- TypeScript with strict type checking
- React with JSX automatic runtime (`react-jsx`)
- Functional components with hooks
- `useCallback` for event handlers where appropriate
