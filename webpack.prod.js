const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimmizer = require('css-minimizer-webpack-plugin');
const Tercer = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    output: {//limpia los archivos de la salida
        clean: true,
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                sources: false
            }
        }, {
            test: /\.css$/,
            exclude: /styles.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /styles.css$/,
            use: [MiniCssExtract.loader, 'css-loader']
        }, {
            test: /\.(png|jpe?g|gif)$/,
            loader: 'file-loader',
        }, {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimmizer(),
            new Tercer(),
        ]
    },
    plugins: [
        new HtmlWebpack({
            title: 'mi Webpack App',
            template: './src/index.html'
        }),
        new MiniCssExtract({
            //[name] toma el mismo nombre del archivo original
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets/" },
            ]
        }),
    ]
}