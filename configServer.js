var childprocess = require('child_process');
var worker = childprocess.fork('./configWorker.js');

console.log('pid in master:', process.pid);
var childMessage="";
//监听子进程事件
worker.on('message', function(msg) {
  childMessage=msg;
  console.log('1:', msg);
})

process.on('message', function(msg) {
  console.log('2:', msg);
})

worker.send('主进程给子进程传递的数据');

process.emit('message', '------');



var thrift = require("thrift");
var ConfigService = require("./gen-nodejs/ConfigService");
var ttypes = require("./gen-nodejs/tutorial_types");

var data = {};

var server = thrift.createServer(ConfigService, {
  getConfig: function(result) {
    
    result(null, childMessage);
  },
  flushConfig: function(paths,result) {
    worker.send(paths);
    result(null, "1");
  }
});

server.listen(9090);
	
