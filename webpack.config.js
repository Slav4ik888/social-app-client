const path = require(`path`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    // eslint-disable-next-line no-undef
    path: path.join(__dirname, `public`)
  },
  devServer: {
    // eslint-disable-next-line no-undef
    contentBase: path.join(__dirname, `public`),
    open: false,
    port: 1337,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }, {
        test: /\.scss$/,
        use: [
          `style-loader`,
          `css-loader`,
          `sass-loader`
        ]
      }, {
        test: /\.svg$/,
        loader: `svg-inline-loader`
      }, {
        test: /\.css$/,
        use: [
          // style-loader
          {
            loader: `style-loader`
          },
          // css-loader
          {
            loader: `css-loader`,
            options: {
              modules: true
            }
          },
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ],
  },
  resolve: {
    modules: [`node_modules`, `src`],
    extensions: [`.jsx`, `.js`, `json`, `css`]
  },
  devtool: `source-map`,
};
