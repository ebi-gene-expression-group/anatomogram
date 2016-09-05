var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
	    anatomogram: './index.js',
        anatomogramRenderer: './html/anatomogramRenderer.js',
        iconsTest: './html/iconRenderer.js',
        anatomogramPicturesTest:'./html/anatomogramPictureRenderer.js',
        demo:'./html/demo.js',
        dependencies: ['react', 'react-dom','imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js']
    },

    output: {
        libraryTarget: 'var',
        library: '[name]',
        path: path.resolve(__dirname, 'dist'),
	    filename: '[name].bundle.js',
        publicPath: 'html/dist/'
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
            {test: /\.jsx?$/, loader: 'babel', query: {presets: ['es2015', 'react']}},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
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
