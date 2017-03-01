var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        anatomogram: ['babel-polyfill', './index.js'],
        demoRenderer:'./html/DemoRenderer.jsx',
        dependencies: ['react', 'react-dom', 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js']
    },

    output: {
        libraryTarget: 'var',
        library: '[name]',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/dist/'
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], {verbose: true, dry: false}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'dependencies',
            filename: 'vendor.bundle.js',
            minChunks: Infinity     // Explicit definition-based split. Don’t put shared modules between main and demo entries in vendor.bundle.js (e.g. Anatomogram.jsx)
        })
    ],

    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel', query: {presets: ['es2015']},
                // Place here all the packages that we own
                exclude: /node_modules\/(?!(expression-atlas|anatomogram|react-ebi-species))/},
            {test: /\.jsx$/, loader: 'babel', query: {presets: ['es2015', 'react']}},
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.json$/, loader: 'json'},
            {test: /\.(jpe?g|png|gif)$/i,
                  loaders: [
                      'file?hash=sha512&digest=hex&name=[hash].[ext]',
                      'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                  ]
              },
              {test: /\.(svg)$/i,
                    loaders: [
                        'file?hash=sha512&digest=hex&name=[hash].[ext]'
                    ]
                }
        ]
    },

    devServer: {
        port: 9000
    }
};
