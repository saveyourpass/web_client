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
                exclude: /(node_modules|bower_components|forge\.bundle\.js)/,
                loader: 'babel-loader',
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