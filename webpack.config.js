const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackMd5Hash = require('webpack-md5-hash');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {
  const prodMode = argv.mode === 'production';

  return ({
    entry: {
      main: './src/index.js'
    },
    devtool: prodMode ? false : 'source-map',
    output: {
      clean: true,
      path: path.resolve(__dirname, 'build'),
      chunkFilename:
        prodMode
          ? 'chunks/[name].[contenthash].js'
          : 'chunks/[name].js',
      filename:
        prodMode ? '[name].[contenthash].js' : '[name].js'
    },
    // optimization: { // Do this for production
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: 'vendors',
    //         chunks: 'all',
    //       },
    //     },
    //   },
    // },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            // 'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename:
          prodMode
            ? '[name].[contenthash].css'
            : '[name].css'
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        hash: true,
        template: './index.html',
        filename: 'index.html'
      }),
      // new WebpackMd5Hash(),
      new CopyWebpackPlugin({
        patterns: [
          { from: './public', to: './' },
          { from: 'manifest.webapp', to: 'manifest.webapp' }
        ]
      }),
      // new CompressionPlugin({
      //   algorithm: 'gzip'
      // })
    ],
    devServer: {
      contentBase: 'build',
      watchContentBase: true,
      hot: false,
      inline: false, // Required to work with KaiOS to avoid WDS adding its client scripts inline for hot reload
      liveReload: false,
      port: 4000,
      compress: true,
      writeToDisk: true // To be used with KaiOS emulator to update build folder code changes.
    }
  });
};