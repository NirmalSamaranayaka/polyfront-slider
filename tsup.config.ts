
import { defineConfig } from 'tsup';
export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  format: ['esm','cjs'],
  minify: true,
  sourcemap: true,
  clean: true,
  target: 'es2022'
});
