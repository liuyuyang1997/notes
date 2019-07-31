const path = require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry: {
        app:"./src/main.js"
    },
    output: {
        publicPath:__dirname + "/dist",
        path:path.resolve(__dirname, "dist"),
        filename:"bundle.js"
    },
    module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.vue$/, use: 'vue-loader' },
			{test:/\.(jpg|jpeg|png|pneg|gif|bmp)$/, use: 'url-loader'},
			{test:/\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'}
		]
    },
    plugins: [new VueLoaderPlugin()]
} 