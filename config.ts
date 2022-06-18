module.exports = {
    webpack(config) {
        const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

        config.module.rules.push({
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        })

        config.module.rules.push({
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                {
                    loader: 'sass-loader',
                    // options: {
                    //     sourceMap: true,
                    //     additionalData: '@import "./src/Shared/Styles/variables.sass"',
                    // },
                },
            ],
        })

        config.resolve = {
            ...config.resolve,
            plugins: [new TsConfigPathsPlugin()],
        }

        return config
    },
}
