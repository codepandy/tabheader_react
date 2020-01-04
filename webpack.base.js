const path = require("path");

const config = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "src")],
        use: "babel-loader",
      },
      {
        test: /\.css|less$/,
        include: [path.resolve(__dirname, "src")],
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } },
          { loader: "less-loader" },
        ],
      },
    ],
  },
};

module.exports = config;
