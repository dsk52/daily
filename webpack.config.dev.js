const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");


module.exports = {
  mode: 'production',

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
          cache: true,
        },
      }
    ]
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" })
  ],

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  },

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 9000,
    historyApiFallback: true
  }
}
