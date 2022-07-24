const slsw = require('serverless-webpack');

module.exports = {
    target: 'node',
    entry: slsw.lib.entries,
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    node: false,
    optimization: {
        minimize: false,
    },
    resolve: {
        extensions: ['.ts', '.jsx', '.js', '.json'],
    },
    devtool: 'inline-cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    }
};
