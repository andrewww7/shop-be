const slsw = require('serverless-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    target: 'node',
    entry: slsw.lib.entries,
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    node: false,
    optimization: {
        minimize: false,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.paths.json'})]
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
