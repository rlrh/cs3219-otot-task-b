const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../build/public'),
    devServer: {
        proxy: 'http://localhost:5000'
    }
}