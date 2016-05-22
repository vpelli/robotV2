
var fs = require("fs")
    ,robotC = require('./robotController.js')
    ;

function controlRobot(request,response){
  console.log("Control robot");
    fs.readFile('./public/views/controlRobot.html',function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
      }
    );

  }

function moveRobot(request,response){
  var funcName = request.query.op;
  console.log('op : '+funcName);
  robotC.move(funcName,function(){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('command send to robot : '+funcName);
    response.end();

  });

}

function pageNotFound(quest,response,next){
   response.status(404).end('Not found');
}

exports.control = controlRobot;
exports.moveRobot = moveRobot;
exports.pageNotFound=  pageNotFound;
