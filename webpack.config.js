// webpack.config.js

const env = process.env.NODE_ENV;
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'uikit': 'UIkit',
    'uikit-util': 'UIkit.util',
    'he': 'he'
};

module.exports = [{
    entry: {
        // vendor: './src/vendor.ts',
        app: './app/main'
    },
    devtool: "source-map",
    output: {
        // path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: './app/main.min.js',
    },
    externals,
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.vue', '.json'],
        alias: { "uikit": path.join(__dirname, "node_modules/uikit") },
        symlinks: true
    },
    resolveLoader: {
        modules: ["node_modules"] // This will resolve module path when using "npm link"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                loader: 'buble-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                loader: 'json-loader',
                test: /\.json/
            },
            {
                // SCSS Compilation : sass / scss loader for webpack
                test: /\.(sass|scss)$/i,
                use: ExtractTextPlugin.extract({
                    // fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|png|jpg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/'
                    }
                }]
            },
            // TK THE LOADER: needed to process typescript files. Note the option used. We'll also need sfc.d.ts so that typescript can find the necessary .vue files
            // TK make sure to npm install ts-loader and npm link typscript if its installed globally
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        // Extract CSS from javascript file and put it into another CSS file in dist folder
        new ExtractTextPlugin({
            // define where to save the file
            //filename: 'assets/css/[name].bundle.css',
            filename: 'css/theme.css',
            allChunks: true
        }),

        /* new HtmlWebpackPlugin({
            inject: true,
            title: 'React Typescript blog',
            template: `${__dirname}/src/index.html`,
            filename: `${__dirname}/dist/index.html`, //relative to root of the application
        }), */
    ],
    /* devServer: {
        historyApiFallback: true,
        noInfo: false
    },
    performance: {
        hints: false
    }, */

},
{
    entry: {
        // vendor: './src/vendor.ts',
        app: './docs/app/main'
    },
    devtool: "source-map",
    output: {
        // path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: './docs/app/main.min.js',
    },
    externals,
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.vue', '.json'],
        alias: { "uikit": path.join(__dirname, "node_modules/uikit") },
        symlinks: true
    },
    resolveLoader: {
        modules: ["node_modules"] // This will resolve module path when using "npm link"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                loader: 'buble-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                loader: 'json-loader',
                test: /\.json/
            },
            {
                // SCSS Compilation : sass / scss loader for webpack
                test: /\.(sass|scss)$/i,
                use: ExtractTextPlugin.extract({
                    // fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|png|jpg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/'
                    }
                }]
            },
            // TK THE LOADER: needed to process typescript files. Note the option used. We'll also need sfc.d.ts so that typescript can find the necessary .vue files
            // TK make sure to npm install ts-loader and npm link typscript if its installed globally
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        // Extract CSS from javascript file and put it into another CSS file in dist folder
        new ExtractTextPlugin({
            // define where to save the file
            filename: 'css/theme.css',
            allChunks: true
        }),

        /* new HtmlWebpackPlugin({
            inject: true,
            title: 'React Typescript blog',
            template: `${__dirname}/src/index.html`,
            filename: `${__dirname}/dist/index.html`, //relative to root of the application
        }), */
    ],
    /* devServer: {
        historyApiFallback: true,
        noInfo: false
    },
    performance: {
        hints: false
    }, */

}]
