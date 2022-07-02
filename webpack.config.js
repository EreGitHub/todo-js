const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    output: {//limpia los archivos de la salida
        clean: true
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
        }]
    },
    optimization: {},
    plugins: [
        new HtmlWebpack({
            title: 'mi Webpack App',
            //defino el nombre de salida del archivo
            // filename: 'index.html',
            //cual es el archivo que se va a usar como plantilla
            template: './src/index.html'
        }),
        new MiniCssExtract({
            //[name] toma el mismo nombre del archivo original
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets/" },
            ]
        }),
    ]
}