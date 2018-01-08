var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

btSerial.on('found', function(address, name) {
   btSerial.findSerialPortChannel(address, function(channel) {
       btSerial.connect(address, channel, function() {
           console.log('connected');

           btSerial.write(new Buffer('my data', 'utf-8'), function(err, bytesWritten) {
               if (err) console.log(err);
           });

           btSerial.on('data', function(buffer) {
               console.log(buffer.toString('utf-8'));
           });
       }, function () {
           console.log('cannot connect');
       });

       // close the connection when you're ready
       btSerial.close();
   }, function() {
       console.log('found nothing');
   });
});

btSerial.inquire();