const developmentConfig = {
  mode: 'development',
  output: {
    filename: '[name].[hash].js',
  },
  devServer: {
    compress: true,
    port: 9000,
  },
  devtool: 'source-map',
};

module.exports = developmentConfig;
