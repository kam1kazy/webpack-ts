//  Libraries
import webpack from 'webpack'

// Components
import { buildDevServer } from './buildDevServer'
import { buildLoader } from './buildLoader'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'

// Types
import { IBuildOptions } from './types/types'

export function buildWebpack(options: IBuildOptions): webpack.Configuration {
  const { mode, paths } = options
  const devMod = options.mode === 'development'
  const prodMod = options.mode === 'production'

  return {
    mode: mode ?? 'development',
    entry: {
      main: paths.entry,
    },
    output: {
      filename: '[name].[contenthash].js',
      path: paths.output,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoader(options),
    },
    resolve: buildResolvers(options),
    devtool: devMod && 'inline-source-map',
    devServer: devMod ? buildDevServer(options) : undefined,
  }
}
