const path = require("path");
const webpack = require("webpack");
const locale = require("i18n!./colors.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {
  index: ["./src/index", "webpack-hot-middleware/client"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      },
      {
        test: require.resolve("./src/index.js"),
        use: "imports-loader?this=>window"
      },
      {
        test: /\.js$/,
        use: { loader: "istanbul-instrumenter-loader" },
        include: path.resolve("src/components/"),
        enforce: "post",
        exclude: /node_modules|\.spec\.js$/
      },
      {
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        use: [
            {
                // loader: "jshint-loader"
            }
        ]
    },
      {
        test: /\.bundle\.js$/,
        use: {
          loader: "bundle-loader",
          options: {
            name: "my-chunk"
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash].[ext]"
            }
          }
        ]
      },
      {
        test: /\.gz$/,
        enforce: "pre",
        use: "gzip-loader"
      },
      {
        test: path.resolve(__dirname, 'node_modules/library/polyfill.js'),
        use: 'null-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
              removeComments: true,
              collapseWhitespace: true
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        query: {
          cacheDirectory: true,
        },
        options: {
          emitError: true,
          quiet: true
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015", "react"]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader?cacheDirectory=true",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [require("@babel/plugin-transform-object-rest-spread")]
          }
        }
      }
    ]
  },
  devtool: "inline-source-map",
  
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  
  plugins: [
    extractPlugin,
    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: "server",
      // Host that will be used in `server` mode to start HTTP server.
      analyzerHost: "127.0.0.1",
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 8080,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: "report.html",
      // Module sizes to show in report by default.
      // Should be one of `stat`, `parsed` or `gzip`.
      // See 'Definitions' section for more information.
      defaultSizes: "parsed",
      // Automatically open report in default browser
      openAnalyzer: true,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: true,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: "stats.json",
      // Options for `stats.toJson()` method.
      // For example you can exclude sources of your modules from stats file with `source: false` option.
      // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      // Log level. Can be 'info', 'warn', 'error' or 'silent'.
      logLevel: "info"
    }),
    new HtmlWebpackPlugin({ title: "Output Management" }),
    new CleanWebpackPlugin(["dist"]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // OccurenceOrderPlugin is needed for webpack 1.x only
    new webpack.optimize.OccurenceOrderPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJSPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common" // Specify the common bundle's name.
    })
  ],
  // more options in the optional jshint object
  jshint: {
    // any jshint option http://www.jshint.com/docs/options/
    // i. e.
    camelcase: true,

    // jshint errors are displayed by default as warnings
    // set emitErrors to true to display them as errors
    emitErrors: false,

    // jshint to not interrupt the compilation
    // if you want any file with jshint errors to fail
    // set failOnHint to true
    failOnHint: false,

    // custom reporter function
    // TODO: set up error logging here
    reporter: function(errors) { }
  }
};
