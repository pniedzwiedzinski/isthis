const path = require("path");

module.exports = () => {
  return {
    entry: ["./src/index.js"],
    output: {
      path: path.resolve(__dirname, "./static"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  };
};
