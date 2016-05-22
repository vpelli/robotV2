var gpio = require("pi-gpio"),
    Gopigo = require("node-gopigo").Gopigo;

//var Commands = Gopigo.commands;
var Robot = Gopigo.robot;

var ultrasonicPin=15;




function move(funcName,callback){
  console.log(funcName);
  switch (funcName) {
	  case 'front':case 'z':
        var res = robot.motion.forward(false);
        console.log('Moving backward::' + res);
      break;
      case 'left':case'q':
        var res = robot.motion.right();
        robot.board.wait(800);
        res = robot.motion.forward(false);
        console.log('Turning left::' + res);
      break;
      case 'right':case 'd':
        var res = robot.motion.left();
        robot.board.wait(800);
        res = robot.motion.forward(false);
        console.log('Turning right::' + res);
      break;
      case 'back':case 's':
        var res = robot.motion.backward(false);
        console.log('Moving forward::' + res);
      break;
      case 'stop':case 'o':
        var res = robot.motion.stop();
        console.log('Stop::' + res);
      break;
      case 'speedup':case 'p':
        var res = robot.motion.increaseSpeed();
        console.log('Increasing speed::' + res);
      break;
      case 'speeddown':case 'm':
        var res = robot.motion.decreaseSpeed();
        console.log('Decreasing speed::' + res);
      break;
      
	  case 'ledflashleft':
		for(var iblink=0;iblink<10;iblink++){
			var res = robot.ledLeft.on();
			robot.board.wait(500);
			var res = robot.ledLeft.off();
		}
		console.log('Left led on::'+res);
      break;
      case 'ledflashright':
        for(var iblink=0;iblink<10;iblink++){
			var res = robot.ledRight.on();
			robot.board.wait(500);
			var res = robot.ledRight.off();
		}
		break;
	  
	  case 'frontleft':
	    var res = robot.motion.right();
        robot.board.wait(400);
        res = robot.motion.forward(false);
		break;
      case 'backleft':
	    var res = robot.motion.right();
        robot.board.wait(2000);
        res = robot.motion.forward(false);
		break;
      case 'backright':
        var res = robot.motion.left();
        robot.board.wait(2000);
        res = robot.motion.forward(false);
		break;
       case 'frontright':
        var res = robot.motion.left();
        robot.board.wait(400);
        res = robot.motion.forward(false);
		break;
      
	  case 'reset':case 'r':
        robot.reset()
      break
      case 'leftledon':case 'h':
        var res = robot.ledLeft.on()
        console.log('Left led on::'+res)
      break
      case 'leftledoff':case 'l':
        var res = robot.ledLeft.off()
        console.log('Left led off::'+res)
      break
      case 'rightledon':case 'k':
        var res = robot.ledRight.on()
        console.log('Right led on::'+res)
      break
      case 'rightledoff':case 'm':
        var res = robot.ledRight.off()
        console.log('Right led off::'+res)
      break
      case 'voltage':case 'v':
        var res = robot.board.getVoltage()
        console.log('Voltage::' + res + ' V')
      break
      case 'servotest':
        robot.servo.move(0)
        console.log('Servo in position 0')

        robot.board.wait(1000)
        robot.servo.move(180)
        console.log('Servo in position 180')

        robot.board.wait(1000)
        robot.servo.move(90)
        console.log('Servo in position 90')
      break
      case 'exit':
        robot.close()
        process.exit()
      break
      case 'ultrasonicdistance':
        var res = robot.ultraSonicSensor.getDistance()
        console.log('Ultrasonic Distance::' + res + ' cm')
      break
      case 'irreceive':
        var res = robot.IRReceiverSensor.read()
        console.log('IR Receiver data::')
        console.log(res)
      break
      case 'move forward with pid':
        var res = robot.motion.forward(true)
        console.log('Moving forward::' + res)
      break
      case 'move backward with pid':
        var res = robot.motion.backward(true)
        console.log('Moving backward::' + res)
      break
      case 'rotateleft':case 'w':
        var res = robot.motion.leftWithRotation()
        console.log('Rotating left::' + res)
      break
      case 'rotateright':case'x':
        var res = robot.motion.rightWithRotation()
        console.log('Rotating right::' + res)
      break
      case 'set encoder targeting':
        var res = robot.encoders.targeting(1, 1, 18)
        console.log('Setting encoder targeting:1:1:18::' + res)
      break
      case 'firmware version':
        var res = robot.board.version()
        console.log('Firmware version::' + res)
      break
      case 'board revision':
        var res = robot.board.revision()
        console.log('Board revision::' + res)
      break
    }
    setTimeout(callback,1);
}

function init(){
  robot = new Robot({
    minVoltage: 5.5,
    criticalVoltage: 1.2,
    debug: true,
    ultrasonicSensorPin: ultrasonicPin,
    //IRReceiverSensorPin: irreceiverPin
  });
  robot.on('init', function onInit(res) {
    if (res) {
      console.log('GoPiGo Ready!')
    } else {
      console.log('Something went wrong during the init.')
    }
  });

  robot.on('error', function onError(err) {
    console.log('Something went wrong')
    console.log(err)
  })
  robot.on('free', function onFree() {
    console.log('GoPiGo is free to go')
  })
  robot.on('halt', function onHalt() {
    console.log('GoPiGo is halted')
  })
  robot.on('close', function onClose() {
    console.log('GoPiGo is going to sleep')
  })
  robot.on('reset', function onReset() {
    console.log('GoPiGo is resetting')
  })
  robot.on('normalVoltage', function onNormalVoltage(voltage) {
    console.log('Voltage is ok ['+voltage+']')
  })
  robot.on('lowVoltage', function onLowVoltage(voltage) {
    console.log('(!!) Voltage is low ['+voltage+']')
  })
  robot.on('criticalVoltage', function onCriticalVoltage(voltage) {
    console.log('(!!!) Voltage is critical ['+voltage+']')
  })
  robot.init()

  for(var id=0; id<10;id++){
    robot.motion.decreaseSpeed();
  }


}


exports.init = init;
exports.move = move;
