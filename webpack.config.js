const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [{
                test: /\.js$/,
                // loader: 'babel-loader',
                exclude: /node_modules/,
                use: [
                    {loader: 'babel-loader'},
                 ]
            },
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         {
            //             loader: 'css-loader',
            //         },
            //     ],
            // },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=8000&name=images/[name].[ext]'
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};
