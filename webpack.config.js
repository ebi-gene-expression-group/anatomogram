var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        anatomogramDemo: './html/AnatomogramDemo.js',
        anatomogram: './src/index.js',
        dependencies: ['lodash', 'prop-types', 'react', 'react-dom', 'react-svg', 'recompose']
    },

    output: {
        library: '[name]',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], {verbose: true, dry: false}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'dependencies',
            filename: 'vendorCommons.bundle.js',
            minChunks: Infinity     // Explicit definition-based split, see dependencies entry
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: process.env.NODE_ENV === 'production' ? JSON.stringify("production") : JSON.stringify("development")
            }
        })
    ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          `style-loader`,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ]
      },
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

    devServer: {
        port: 9000
    }
};
