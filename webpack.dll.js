var path = require('path'),
    webpack = require('webpack');

module.exports = function (env) {
    var ext = typeof env !== 'undefined' && env.min ? '.min.js' : '.js';
    return {
        entry: {
            vendor: [path.join(__dirname, 'vendors.js')]
        },
        output: {
            path: path.join(__dirname, 'moodle', 'theme', 'plus', 'javascript'),
            filename: 'vendor' + ext,
            library: '[name]'
        },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, 'moodle', 'theme', 'plus', 'javascript', 'vendor-manifest.json'),
                name: '[name]',
                context: path.resolve(__dirname)
            }),
            new webpack.optimize.OccurrenceOrderPlugin()
        ],
        resolve: {
            modules: [
                path.resolve(__dirname),
                'node_modules'
            ]
        }
    };
};
