const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DYNAMIC_PAGES } = require("./utils/constants");
require("dotenv").config({ path: ".env" });

const dynamicPagesName = DYNAMIC_PAGES;

const getEntryObject = () => {
  var obj = {};
  dynamicPagesName.forEach((ele) => {
    obj[`${ele}`] = path.join(__dirname, `/views/${ele}.jsx`);
  });
  return obj;
};

const getStaticObject = () => {
  return dynamicPagesName.map((ele) => {
    return {
      directory: path.join(__dirname, `/public/dynamicPages/${ele}`),
      publicPath: `/${ele}`,
    };
  });
};

const getHtmlWebpackPlugins = () => {
  return dynamicPagesName.map((ele) => {
    return new HtmlWebpackPlugin({
      title: `${ele}`, // Customize the title using the entry name
      template: path.join(__dirname, "templates/index.html"),
      filename: `${ele}/index.html`,
      chunks: [ele], // Ensure only the relevant chunk is included
    });
  });
};

const getContext = (pathname, req) => {
  var result = true;

  dynamicPagesName.forEach((ele) => {
    if (pathname === `/${ele}/`) {
      result = false;
    }
  });
  return result;
};

module.exports = {
  devServer: {
    allowedHosts: 'all',
    hot: true,
    port: process.env.WEBPACK_PORT,
    proxy: [
      {
        context: (pathname, req) => getContext(pathname, req),
        target: `http://localhost:${process.env.PORT}`,
        changeOrigin: true,
      },
    ],
    static: getStaticObject(),
  },
  entry: getEntryObject(),
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    publicPath: "/dynamicPages/",
    path: path.join(__dirname, "public/dynamicPages/"),
    filename: "[name]/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    // Add new plugin for each chunk
    ...getHtmlWebpackPlugins(),
  ],
  mode: "development",
};
