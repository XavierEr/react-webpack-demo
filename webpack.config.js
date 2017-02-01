const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        app: [
            'react-hot-loader/patch',
            // activate HMR for React

            'webpack-dev-server/client?http://localhost:10000',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint

            'webpack/hot/only-dev-server',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates

            './src/index.js'
            // the entry point of our app
        ],
        vendor: ['react-hot-loader/patch', 'react', 'react-dom', 'react-router', 'moment']
    },

    output: {
        filename: '[name].bundle.js',
        // the output bundle

        path: resolve(__dirname, 'public'),

        publicPath: '/'
        // necessary for HMR to know where to load the hot update chunks
    },

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        // enable HMR on the server

        contentBase: resolve(__dirname, 'public'),
        // match the output path

        publicPath: '/',
        // match the output `publicPath`

        historyApiFallback: true,

        port: 10000
    },

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
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        { loader: 'less-loader' }
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
        new HtmlWebpackPlugin({ inject: true, template: 'public/index.html' })
    ]
}

module.exports = config;