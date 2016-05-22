var express = require('express');
var path = require('path');
var routes = require('./router.js');
//var bodyParser = require('body-parser');



var app = express();
var server;




var _configureServer = function () {
    app
    //.use(bodyParser.json())
    //.use(bodyParser.urlencoded({extended: false}))
    //.use(routes.allowIps)
    .use(express.static(path.join(__dirname, '/../public')));
};

var _configureRoutes = function () {
    app
    .get('/', routes.control)
    .get('/moveRobot', routes.moveRobot)
    .use(routes.pageNotFound);

	;
};

var start = function () {
    _configureServer();
    _configureRoutes();

    server  = app.listen(8888, function(){
        console.log('Listenning on 8888');
    });
};

var stop = function () {
    if(server && typeof server.close == 'function') {
        server.close();
        console.log('Server closed...');
    }
    else {
        console.log('Cannot stop server listenning on 8888');
    }
};

module.exports.start = start;
module.exports.stop = stop;
