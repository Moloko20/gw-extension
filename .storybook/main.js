const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
    core: {
        builder: 'webpack5',
    },
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
    // typescript: {
    //     reactDocgen: 'react-docgen-typescript',
    //     reactDocgenTypescriptOptions: {
    //         extends: '../tsconfig.json',
    //     },
    // },
    webpackFinal: async config => {
        config.resolve.plugins = [...(config.resolve.plugins || []), new TsconfigPathsPlugin()]

        return config
    },
}
