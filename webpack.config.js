var path = require('path'),
    webpack = require('webpack');

module.exports = function (env) {
    var app = env.app,
        dirname = path.join(__dirname, 'moodle', 'local'),
        ext = env.min ? '.min.js' : '.js';
    return {
        cache: true,
        entry: {
            app: path.join(dirname, app, 'js', 'app.js')
        },
        output: {
            path: path.join(dirname, app, 'build'),
            filename: app + ext
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: path.join(__dirname),
                manifest: require(path.join(__dirname, 'moodle', 'theme', 'plus', 'javascript', 'vendor-manifest.json'))
            }),
            new webpack.LoaderOptionsPlugin({
                options: {
                    eslint: {
                        failOnError: true,
                        configFile: path.join(__dirname, '.eslintrc')
                    }
                }
            })
        ],
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.join(dirname, app, 'js'),
                    loader: 'eslint-loader',
                    enforce: 'pre'
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react']
                    }
                }
            ]
        },
        resolve: {
            modules: [
                path.resolve(__dirname),
                'node_modules'
            ]
        }
    };
};
