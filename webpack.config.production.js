const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        app: [
            './src/index.js'
        ],
        vendor: ['react', 'react-dom', 'moment']
    },

    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/dist'
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: [
                        { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                        { loader: 'less-loader', options: { sourceMap: true } }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    { loader: 'url-loader', options: { limit: 100000 } }
                ]
            },
            {
                test: /\.(eot|com|json|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    { loader: 'url-loader', options: { limit: 100000, mimetype: 'application/octet-stream' } }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    { loader: 'url-loader', options: { limit: 100000, mimetype: 'image/svg+xml' } }
                ]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
        new ExtractTextPlugin({ filename: 'styles.css', disable: false, allChunks: true }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
        new HtmlWebpackPlugin({ inject: true, template: 'public/index.html' }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // React doesn't support IE8
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        })
    ]
}

module.exports = config;