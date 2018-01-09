var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyACM0', { autoOpen: false, baudRate:9600  });
const Readline = SerialPort.parsers.Readline;
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

port.pipe(parser);
port.open(function (err) {
  if (err) {
     return console.log('Error opening port: ', err.message);
  }
});

port.on('open', function() {
    console.log('node opened...');
});

port.on('data', function (data) {
	var d = data.toString('utf8');
	var s = d.split(',');
	var i = parseInt(s[0]);
	if (i>=0) {
	  console.log(i);
	}
});