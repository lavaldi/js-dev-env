import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export default {
  devtool: "source-map", // minify, tranpile and bundle
  entry: {
    vendor: path.resolve(__dirname, "src/vendor"),
    main: path.resolve(__dirname, "src/index")
  },
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath:"/",
    filename: "[name].[chunkhash].js" // name from entry (main or vendor)
  },
  plugins: [
    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin({filename: "[name].[contenthash].css", allChunks: false}),
    // Hash the files using MD5 so that their name change when the content changes. (chunkhash)
    new WebpackMd5Hash(),
    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),
    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: "src/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true // injects what is necessary to the view
    }),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: 'style-loader'
        }),
      }
    ]
  }
}
