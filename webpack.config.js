const path = require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry: {
        app:"./src/main.js"
    },
    output: {
        //publicPath这个路径是bundle.js 在webpack-dev-server 处理之后 保存在内存中的目录
        publicPath:"/dist",
        path:path.resolve(__dirname, "dist"),
        filename:"bundle.js"
    },
    module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.vue$/, use: 'vue-loader' },
			{test:/\.(jpg|jpeg|png|pneg|gif|bmp)$/, use: 'url-loader'},
            {test:/\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
		]
    },
    plugins: [new VueLoaderPlugin()]
} 