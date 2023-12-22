import path from 'node:path';
import { defineConfig } from 'vite';
import pkg from './ics/package.json' with { type: "json" };

export default defineConfig((env) => defineConfig({
    build: {
        outDir: env.mode !== 'bundled' ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'dist/bundled'),
        lib: {
            entry: path.resolve(__dirname, 'ics/src/index.js'),
            name: 'ICS',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            external: env.mode !== 'bundled' ? Object.keys(pkg.dependencies) : [],
        }
    }
}))