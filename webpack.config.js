const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const buildFolder = path.join(__dirname, 'build-unpacked-extension');

module.exports = {
    entry: {
        __app: path.join(__dirname, 'src', '__app.js'),
        __outer: path.join(__dirname, 'src', '__outer.js'),
        content: path.join(__dirname, 'src', 'content.js'),
        background: path.join(__dirname, 'src', 'background.js'),
    },
    output: {
        path: buildFolder,
        publicPath: `${buildFolder}/assets/`,
        filename: 'js/[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            publicPath: 'assets/',
                            spriteFilename: 'icon-sprites.svg',
                        },
                    },
                    'svgo-loader'
                ]
            }
        ]
    },

    plugins:[
        new CleanWebpackPlugin([buildFolder]),

        new CopyWebpackPlugin([{
            from: 'src/manifest.json',
            to: buildFolder
        }]),

        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),

        new SpriteLoaderPlugin()
    ]
}