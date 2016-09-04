const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function extractForProduction(loaders) {
    return ExtractTextPlugin.extract('style', loaders.substr(loaders.indexOf('!')));
}

module.exports = options => {
    options.lint = fs.existsSync(`${__dirname}/../.eslintrc`) && options.lint !== false;

    const localIdentName = options.production ? '[hash:base64]' : '[path]-[local]-[hash:base64:5]';
    const cssLoaders = `style!css?localIdentName=${localIdentName}!autoprefixer?browsers=last 2 versions`;
    const scssLoaders = `${cssLoaders}!sass`;
    const sassLoaders = `${scssLoaders}?indentedSyntax=sass`;

    if (options.production) {
        cssLoaders = extractForProduction(cssLoaders);
        scssLoaders = extractForProduction(scssLoaders);
    }

    const jsLoaders = ['babel-loader'];

    return {
        entry: './app/index.jsx',
        debug: !options.production,
        devtool: options.devtool,
        output: {
            path: options.production ? './dist' : './build',
            publicPath: options.production ? '' : 'http://localhost:8080/',
            filename: options.production ? 'app.[hash].js' : 'app.js',
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loaders: jsLoaders,
                },
                {
                    test: /\.jsx$/,
                    loaders: options.production ? jsLoaders : ['react-hot'].concat(jsLoaders),
                },
                {
                    test: /\.css$/,
                    loader: cssLoaders,
                },
                {
                    test: /\.sass$/,
                    loader: sassLoaders,
                },
                {
                    test: /\.scss$/,
                    loader: scssLoaders,
                },
                {
                    test: /\.png$/,
                    loader: 'url?limit=100000&mimetype=image/png',
                },
                {
                    test: /\.svg$/,
                    loader: 'url?limit=100000&mimetype=image/svg+xml',
                },
                {
                    test: /\.gif$/,
                    loader: 'url?limit=100000&mimetype=image/gif',
                },
                {
                    test: /\.jpg$/,
                    loader: 'file',
                },
                {
                    test: /\.json$/,
                    loader: 'json',
                },
            ],
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.sass', '.css'],
        },
        plugins: options.production ? [
            // Important to keep React file size down
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                },
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
            }),
            new ExtractTextPlugin('app.[hash].css'),
            new HtmlWebpackPlugin({
                template: './conf/tmpl.html',
                production: true,
            }),
        ] : [
            new HtmlWebpackPlugin({
                template: './conf/tmpl.html',
            }),
        ],
    };
};
