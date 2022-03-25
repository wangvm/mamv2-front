const path = require("path");
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== "development";
// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 代码压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./", // 基本路径
  outputDir: "dist", // 输出文件目录
  assetsDir: "static",
  indexPath: "./index.html",
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
    config.plugin("webpack-bundle-analyzer").use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
  },
  configureWebpack: (config) => {
    // 忽略打包配置
    // config.externals = cdn.externals;
    // 生产环境相关配置
    if (isProduction) {
      //gzip压缩
      const productionGzipExtensions = ["html", "js", "css"];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        })
      );
      // 公共代码抽离
      config.optimization = {
        // 分割代码块
        splitChunks: {
          cacheGroups: {
            //公用模块抽离
            common: {
              chunks: "initial",
              minSize: 0, //大于0个字节
              minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
            },
            //第三方库抽离
            vendor: {
              priority: 1, //权重
              test: /node_modules/,
              chunks: "initial",
              minSize: 0, //大于0个字节
              minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
            },
          },
        },
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              output: {
                // 删除注释
                comments: false,
              },
              //生产环境自动删除console
              compress: {
                //warnings: false, // 若打包错误，则注释这行
                drop_debugger: true, //清除 debugger 语句
                drop_console: true, //清除console语句
                pure_funcs: ["console.log"],
              },
            },
            sourceMap: false,
            parallel: true,
          }),
        ],
      };
    }
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
    open: true,
    host: "0.0.0.0",
    port: 8000,
    https: false,
    hotOnly: true,
  },
};
