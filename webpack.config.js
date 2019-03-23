const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isDev = process.env.NODE_ENV === 'dev'

const config = {
  mode: isDev ? 'development' : 'production',
  entry: {
    app: path.join(__dirname, './client/index.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, './node_modules'),
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, './node_modules'),
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }

    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, './client/template.html')
    }),
  ]
}

if (isDev) {
  config.devtool = '#@cheap-module-eval-source-map'
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    hot: true,
    overlay: {
      errors: true,
      warnings: true,
    },
    publicPath: '/assets/',
    historyApiFallback: {
      index: '/assets/index.html',
    },
    proxy: {
      '/graphql': 'http://localhost:8000',
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  config.plugins.push(new CleanWebpackPlugin())
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config