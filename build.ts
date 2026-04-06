import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'dist/index.js',
  format: 'esm',
  platform: 'node',
  target: 'node20',
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
  },
  jsx: 'automatic',
  jsxImportSource: 'react',
  external: ['@orchetron/storm', 'react', 'react-dom', 'pino', 'pino-pretty', 'better-sqlite3', 'drizzle-orm'],
  sourcemap: true,
});

console.log('Built successfully!');