const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    static: path.join(__dirname, 'static'),
    compress: false,
    port: 3000,
    devMiddleware:{
      publicPath:"/xuni/"
    }
  }
}