const path = require('path');

module.exports = {
    entry: './src/web-app',
    mode: 'development',
    output: {
        filename: `bundle.js`,
        path: path.resolve(path.join(__dirname, 'web')),
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        modules: ['node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
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
};