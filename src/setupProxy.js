const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(proxy('/home', {
        target: 'http://111.229.236.164:80/',
    }));
};
