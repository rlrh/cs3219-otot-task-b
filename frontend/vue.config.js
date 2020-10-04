const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../build/public'),
    devServer: {
        proxy: {
            '^/': {
              target: 'http://localhost:5000',
              changeOrigin: true
            }
        }
    }
}