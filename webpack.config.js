const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = () => {
    return {
        entry: {
            main: path.resolve(__dirname, './src/App/index.tsx'),
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    use: 'ts-loader',
                    exclude: /[\\/]node_modules[\\/]/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                additionalData: '@import "./src/shared/styles/variables.sass"',
                            },
                        },
                    ],
                },
            ],
        },
        devServer: {
            static: {
                directory: path.resolve(__dirname, './dist'),
            },
            port: 4200,
            open: true,
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/App/index.html'),
            }),
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            plugins: [new TsConfigPathsPlugin()],
        },
        output: {
            path: path.resolve(__dirname, './dist'),
        },
        performance: {
            hints: false,
        },
        stats: 'errors-warnings',
    }
}
