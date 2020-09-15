module.exports = {
  devServer : {
    proxy:{
      '/Mp':{
        // target : 'http://www.home.weizaojiao.com',
        target : 'http://devhome.weizaojiao.cn',
        changeOrigin:true,
        pathRewrite:{
          '^/Mp': '/Mp'
        }
      },
      '/Business':{
        // target : 'http://www.home.weizaojiao.com',
        target : 'http://devhome.weizaojiao.cn',
        changeOrigin:true,
        pathRewrite:{
          '^/Business': '/Business'
        }
      }
    },
    host:'0.0.0.0',
    disableHostCheck: true,
    open:true,
  }
}