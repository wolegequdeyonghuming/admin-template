module.exports = {

    // 基本路径
    // tomcat => "./"
    // nginx => "/"
    publicPath: process.env.NODE_ENV==='production'?"/":'/',
    outputDir: '../www',
    lintOnSave: true,
    productionSourceMap: true,
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8090,
        https: false,
        hotOnly: false,
        proxy: {
            '/api':{
                target: 'http://116.52.6.118:18899/KQZLYZW/',
                changeOrigin: true,
                pathRewrite: {
                '^/api': ''
                }
            }
        },
        before: app => {}
    },
}
