module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://116.62.163.25:8081',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}