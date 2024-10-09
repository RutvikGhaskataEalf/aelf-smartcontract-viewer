import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import url from '@rollup/plugin-url';
import postcss from 'rollup-plugin-postcss';

export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    name: "npm-contract-viewer",
  },
  external: [
    'react', 
    'react-dom',
    'antd', 
    '@portkey/contracts', 
    '@portkey/request',
    'aelf-sdk',
    'clsx',
    'copy-to-clipboard',
    'query-string',
    'react-json-tree'
  ],
  plugins: [
    typescript({ tsconfig: "tsconfig.json" }),
    url({
      include: ["**/*.svg"], // Tell Rollup to include SVGs
      limit: 0, // No file size limit
    }),
    postcss({
      extensions: ['.css'], // Specify that we are handling CSS files
    }),
  ],
});
