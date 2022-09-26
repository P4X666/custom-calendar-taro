import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle"
import basicConfig from './rollup.config'

const config = {
  ...basicConfig,
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es'
    }
  ],
  plugins: [
    ...basicConfig.plugins,
    excludeDependenciesFromBundle(),
  ]
}

export default config