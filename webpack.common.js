const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, 'src/public/favicon.ico'),
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            ignore: ['**/resize-images/**'],
          },
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[contenthash].css',
    }),

    new WebpackPwaManifest({
      filename: 'manifest.json',
      publicPath: '/',
      name: "Resto's",
      description: 'Restaurant Databook',
      short_name: "Resto's",
      theme_color: '#232631',
      background_color: '#EEEEEE',
      start_url: './index.html',
      scope: '/',
      display: 'standalone',
      ios: true,
      inject: true,
      fingerprints: false,
      icons: [
        {
          src: path.resolve(__dirname, './src/public/icons/icon-72x72.png'),
          sizes: '72x72',
          ios: 'true',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, './src/public/icons/icon-96x96.png'),
          sizes: '96x96',
          ios: 'true',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, './src/public/icons/icon-128x128.png'),
          sizes: '128x128',
          ios: 'true',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, './src/public/icons/icon-144x144.png'),
          sizes: '144x144',
          ios: 'true',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, './src/public/icons/icon-152x152.png'),
          sizes: '152x152',
          ios: 'true',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, './src/public/icons/icon-192x192.png'),
          sizes: '192x192',
          ios: 'true',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, './src/public/icons/icon-384x384.png'),
          sizes: '384x384',
          ios: 'true',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, './src/public/icons/icon-512x512.png'),
          sizes: '512x512',
          ios: 'true',
          purpose: 'any maskable',
        },
      ],
    }),
  ],
};
