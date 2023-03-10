const path = require("path");

function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
	publicPath: './',
	lintOnSave: false,
	outputDir: "dist",
	runtimeCompiler: true,
	devServer: {
		// port:8888,
		// host:'localhost',
		open: true //配置浏览器自动启动
	},
	// assetsDir:"static",
	// indexPath:'index.html',
	configureWebpack: {
		resolve: {
			extensions: ['.js', '.vue', '.json', 'ttf'],
			alias: {
				'@': resolve('src'),
				'#': resolve('public'),
			}
		},
		module: {
			rules: [{
				test: /\.yml$/,
				loader: 'json-loader!yaml-loader'
			}, ]
		}
	},


}