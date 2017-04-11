var path = require('path'),
    webpack = require('webpack');

module.exports = function (env) {
    var prod = typeof env !== 'undefined' && env.min;
    return {
        entry: {
            vendor: [path.join(__dirname, 'vendors.js')]
        },
        output: {
            path: path.join(__dirname, 'moodle', 'theme', 'plus', 'javascript'),
            filename: 'vendor' + (prod ? '.min.js' : '.js'),
            library: '[name]'
        },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, 'moodle', 'theme', 'plus', 'javascript', prod ? 'vendor-manifest-min.json' : 'vendor-manifest.json'),
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
