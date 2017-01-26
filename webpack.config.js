module.exports = {
    entry: {
        javascript: './app.js'
    },
    output: {
        path: './',
        filename: 'bundle.js'
    },
    
    module: {
        rules: [
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ],

        loaders: [
            {
                test: /\.js$/,
                exclude:'node_modules/',
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    devServer: {
        historyApiFallback: true
    }
}