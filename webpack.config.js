module.exports = {
    entry: './index.js',

    output: {
        library: 'npm-script-flags',
        libraryTarget: 'umd',

        filename: 'npm-script-flags.js',
        path: './dist/'
    }
};
