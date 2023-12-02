const path = require('path');
const { spawn, execSync } = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';
    return {
        entry: './src/client/index.ts',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/i,
                    use: 'ts-loader'
                },
                {
                    test: /(?<!\.module)\.css$/i,
                    use: [MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            modules: "global",
                            importLoaders: 2,
                            sourceMap: true
                        }
                    }]
                },
                {
                    test: /\.module\.css$/i,
                    use: [MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 2,
                            sourceMap: true
                        }
                    }]
                },
                {
                    include: path.resolve(__dirname, 'src', 'assets'),
                    type: 'asset/resource'
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                '@shared': path.resolve(__dirname, 'src', 'shared'),
                '@env': path.resolve(__dirname, 'src', 'env', isDevelopment ? 'dev' : 'prod'),
                '@client': path.resolve(__dirname, 'src', 'client'),
                '@assets': path.resolve(__dirname, 'src', 'assets'),
                '@components': path.resolve(__dirname, 'src', 'components')
            }
        },
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist', 'client'),
            publicPath: '/',
            clean: true
        },
        optimization: {
            minimizer: [
                '...',
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: { removeAll: true }
                            }
                        ]
                    }
                })
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/client/index.html',
                hash: true
            }),
            {
                apply: (compiler) => {
                    if (!isDevelopment) return;
                    let child = null;
                    compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
                        if (child !== null) {
                            if (/^win/.test(process.platform)) {
                                try {
                                    execSync(`taskkill /pid ${child.pid} /T /F`);
                                } catch (e) { }
                            } else {
                                child.kill();
                            }
                        }
                        child = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'start:client'], { stdio: 'inherit' });
                    });
                }
            }
        ],
        watch: isDevelopment
    }
};
