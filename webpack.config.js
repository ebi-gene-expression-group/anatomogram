var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
	    anatomogram: './index.js',
        anatomogramRenderer: './html/anatomogramRenderer.js',
        dependencies: ['react', 'react-dom', 'jquery', 'jquery-hc-sticky', 'jquery-ui-bundle', 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js']
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
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'dependencies',
            filename: 'vendor.bundle.js',
            minChunks: Infinity     // Explicit definition-based split. Don’t put shared modules between main and demo entries in vendor.bundle.js (e.g. Anatomogram.jsx)
        })
    ],

    module: {
        loaders: [
            {test: /\.jsx$/, loader: 'babel'}
        ]
    },

    devServer: {
        port: 9000
    }
};
