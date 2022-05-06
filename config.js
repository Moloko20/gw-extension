module.exports = {
    webpack: config => {
        // You can modify the webpack build config here. Be sure to return
        // your modified config object.
        //
        // config.module.rules.push({
        //     test: /\.css$/i,
        //     use: ['style-loader', 'css-loader'],
        // })

        //  L from 'leaflet'

        config.module.rules.push({
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '/src/icons/[name].[ext]',
                    },
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

        console.log(config.module)

        return config
    },
}