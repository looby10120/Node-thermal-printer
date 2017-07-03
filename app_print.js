var printer = require("node-thermal-printer");

printer.init({
  type: 'epson',
  interface: '/dev/usb/lp0',
  // characterSet: 'Thai'
});

var Buffer = require('buffer').Buffer;
var Iconv  = require('iconv').Iconv;
//var assert = require('assert');

var iconv = new Iconv('UTF-8', 'ISO-8859-11');
var buffer = iconv.convert('ศักดิ์ น้ำขึ้น ติดตั้ง ตู้ อยู่');
var buffer2 = iconv.convert(new Buffer('สวัสดี'));

printer.alignCenter();
//printer.println(buffer);
for(var i=0; i<buffer.length; i++){
  printer.add(new Buffer([buffer[i]]));
}

printer.cut();

printer.execute(function(err){
    if (err) {
      console.error("Print failed", err);
    } else {
     console.log("Print done");
    }
});
