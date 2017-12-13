var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var compiler = webpack(webpackConfig);

const options = {
  contentBase: "./dist",
  hot: true,
  host: "localhost"
};

webpackDevServer.addDevServerEntrypoints(config, options);
const server = new webpackDevServer(compiler, options);

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);

app.use(require("webpack-hot-middleware")(compiler));

server.listen(5000, "localhost", () => {
  console.log("dev server listening on port 5000");
});
