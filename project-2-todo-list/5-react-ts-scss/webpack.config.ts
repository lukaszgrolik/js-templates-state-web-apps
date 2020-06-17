import * as path from 'path';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const plugins = [
	new ForkTsCheckerWebpackPlugin(),
];

export default {
	entry: './src/web-app',
	mode: 'development',
	output: {
		filename: `bundle.js`,
		path: path.resolve(path.join(__dirname, 'web')),
	},
	devtool: 'source-map',
	devServer: {
		host: '0.0.0.0',
		port: 3025,
		historyApiFallback: true,
		disableHostCheck: true,
		contentBase: path.join(__dirname, 'web'),
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.scss'],
		modules: ['node_modules'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
				},
			},
			{
				test: /\.scss$/i,
				use: [
					'style-loader', // Creates `style` nodes from JS strings
					'css-loader', // Translates CSS into CommonJS
					'sass-loader', // Compiles Sass to CSS
				],
			},
		],
	},
	plugins,
};