const path = require('path')
const webpack = require('webpack')
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue': 'vue/dist/vue.esm-bundler.js',
    }
  },
  devtool: 'eval-source-map',
  stats: 'minimal',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, './public') },
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      minify: true
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
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
        use: ["vue-style-loader", "css-loader", "postcss-loader",
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
              @import "./src/styles/_vars.scss";
            `
            }
          },
        ]
      },
      // IMG / ASSETS
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
      }
    ],
  },

  devServer: {
    //static files paths to watch for reload
    open: false,
    static: [
      path.resolve(__dirname, './public'),
      path.resolve(__dirname, './src/assets'),
    ]
  }
}