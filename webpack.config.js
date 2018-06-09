const path = require(`path`)
const CleanWebpackPlugin = require(`clean-webpack-plugin`)

module.exports = {
  entry: {
    demo: `./html/AnatomogramDemo.js`
    // anatomogram: `./src/index.js`,
    // vendors: [`lodash`, `prop-types`, `react`, `react-dom`, `react-svg`, `recompose`, `urijs`]
  },

  plugins: [
    new CleanWebpackPlugin([`dist`])
  ],

  output: {
    library: `[name]`,
    filename: `[name].bundle.js`,
    // Must match module.exports.serve.dev.publicPath or bad things may happen
    publicPath: `/dist/`
  },

  optimization: {
    splitChunks: {
      chunks: `all`,
      cacheGroups: {
        anatomogram: {
          test: /[\\/]src[\\/]/,
          name: `anatomogram`,
          priority: -20
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: `vendors`,
          priority: -10
        }
      }
    }
  },

  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 2000000
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: `file-loader`,
          },
          {
            loader: `image-webpack-loader`,
            options: {
              query: {
                bypassOnDebug: true,
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: true,
                },
                optipng: {
                  optimizationLevel: 7,
                }
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/i,
        use: `file-loader`
      },
      {
        test: /\.js$/i,
        exclude: /node_modules\//,
        use: `babel-loader`
      }
    ]
  },
}

module.exports.serve = {
  content: path.resolve(__dirname, `html`),
  dev: {
    publicPath: `/dist/`
  },
  port: 9000
}
