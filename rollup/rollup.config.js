import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import json from '@rollup/plugin-json'
import less from 'rollup-plugin-less'
import { terser } from "rollup-plugin-terser";

const overrides = {
  compilerOptions: { declaration: true },
  exclude: ["src/pages", "src"],
  include: [
    "src/components/**/*.ts",
    "src/components/**/*.tsx"
  ],
}

const config = {
  input: 'index.ts',
  plugins: [
    nodeResolve(),
    commonjs(),
    // json(),
    typescript({ tsconfigOverride: overrides }),
    less({ output: 'dist/index.css' }),
    terser(),
  ],
  external: ['react','react-dom', 'react-is', 'prop-types', 'classnames', '@tarojs/taro', '@tarojs/components','lodash']
}

export default config

