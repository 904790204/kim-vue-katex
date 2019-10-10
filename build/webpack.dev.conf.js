const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const PORT = process.env.PORT && Number(process.env.PORT)

let devWebpackConfig = merge(baseWebpackConfig,{
    devServer: {
        port: PORT,
        open: true,
        hot:true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
})

module.exports = devWebpackConfig