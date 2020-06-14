const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");


const MODE = 'development';

module.exports = {
  mode: MODE,

  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.ts(x?)$/,
        loader: 'source-map-loader'
      },
      {
        enforce: 'pre',
        test: /\.ts(x?)$/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          cache: false,
        },
      }
    ]
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: 'body',
      hash: true,
    })
  ],

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    watchContentBase: true,
    compress: false,
    hot: true,
    port: 9000,
    historyApiFallback: true,
  }
}
