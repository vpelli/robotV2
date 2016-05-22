var server = require("./modules/server.js");
var robotController = require('./modules/robotController.js');

/*var readline = require('readline');


var rl = readline.createInterface({
  input : process.stdin,
  output: process.stdout
});


function askForCommand() {
  rl.question('What do you want me to do? > ', function(answer) {
    robotController.move(answer,askForCommand);
  })
}*/

//askForCommand();
//opt/pellichero/node-v5.9.0-linux-armv7l/bin/node /opt/pellichero/robotV2/index.js

robotController.init();
server.start();
