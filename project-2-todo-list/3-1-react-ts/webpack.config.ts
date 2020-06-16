import * as path from 'path';
import * as webpack from 'webpack';
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const env = process.env.NODE_ENV;
const plugins = [
    new ForkTsCheckerWebpackPlugin(),
];

if (env === 'production') {
    plugins.push(...[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //   minimize: true,
        //   compress: {
        //     screw_ie8: true,
        //   },
        // }),
    ]);
}

const config = {
    entry: './src/web-app',
    mode: env === 'production' ? 'production' : 'development',
    output: {
        filename: `bundle${env === 'production' ? '.min' : ''}.js`,
        path: path.resolve(path.join(__dirname, 'web'))
    },
    devtool: env !== 'production' && 'source-map',
    devServer: {
        host: '0.0.0.0',
        port: 3031,
        historyApiFallback: true,
        disableHostCheck: true,
        contentBase: path.join(__dirname, 'web')
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
                }
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

export default config;