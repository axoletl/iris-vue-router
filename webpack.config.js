const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: 'bundle.js',
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, './public') },
        { from: path.resolve(__dirname, './src/assets'), to: path.resolve(__dirname, './dist/assets') },
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      minify: true
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
  ],

  module: {
    rules: [
      // VUE
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:
          [
            'babel-loader'
          ]
      },
      // STYLE
      {
        test: /\.(scss|css)$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
    ],
  },

  devServer: {
    //static files paths to watch for reload
    static: [
      path.resolve(__dirname, './public'),
      path.resolve(__dirname, './src/assets'),
    ]
  }
}