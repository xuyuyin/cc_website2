const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractCss = new ExtractTextPlugin('css/[name].[hash].css');

module.exports = {
    entry: {
        index: './src/js/index.js',
        wjj: './src/js/wjj.js',
        app: './src/js/app.js',
        kc: './src/js/kc.js',
        fc: './src/js/fc.js',
        about: './src/js/about.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://www.chongchongzhijia.com/',
        filename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    // 配置 url-loader 的可选项
                    options: {
                        // 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
                        limit: 10000,
                        // 超出限制，创建的文件格式
                        // images/[图片名].[hash].[图片格式]
                        name: 'images/[name].[hash].[ext]'
                    }
                }]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })  
            }
        ]
    },
    plugins: [
        extractCss,
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new webpack.optimize.UglifyJsPlugin({
            except: ['$', 'exports', 'require']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/wjj.html',
            filename: 'wjj.html',
            chunks: ['wjj']
        }),
        new HtmlWebpackPlugin({
            template: './src/app.html',
            filename: 'app.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            template: './src/kc.html',
            filename: 'kc.html',
            chunks: ['kc']
        }),
        new HtmlWebpackPlugin({
            template: './src/fc.html',
            filename: 'fc.html',
            chunks: ['fc']
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            filename: 'about.html',
            chunks: ['about']
        }),
    ]
}