/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',             // or 'happy-dom' if jsdom still crashes (see note below)
    setupFiles: ['tests/setup.ts'],
    threads: false,                    // run in the main process (avoids Node 22 worker recursion/OOM)
    pool: 'forks',                     // extra safety on Windows
    poolOptions: { forks: { singleFork: true, maxForks: 1, minForks: 1 } },
    maxConcurrency: 1,
    isolate: true,
    reporters: 'dot',
    css: false,
  },
});
