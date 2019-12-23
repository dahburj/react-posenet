const path = require("path")

module.exports = {
  components: ["src/components/PoseNet.js"],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  },
  title: "PoseNet React",
  styleguideDir: "dist-docs",
  moduleAliases: {
    "posenet-react": path.resolve(__dirname, "src")
  }
}
