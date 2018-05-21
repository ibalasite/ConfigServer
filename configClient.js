var thrift = require('thrift');
var configService = require('./gen-nodejs/ConfigService');

var transport = thrift.TBufferedTransport;
var protocol = thrift.TBinaryProtocol;

var connection = thrift.createConnection("localhost", 9090, {
  transport : transport,
  protocol : protocol
});

connection.on('error', function(err) {
    console.log("error:"+err);
 // assert(false, err);
});

var client = thrift.createClient(configService, connection);
client.flushConfig(["/DB1","/DB2"],function(err, message) {
    if(err) console.log("error:" + err);
     console.log('message %o',message);
  });

client.getConfig(function(err, message) {
    if(err) console.log("error:" + err);
     var configs = JSON.parse(message);
     console.log('config is  %j', configs);
     var RedisServer = JSON.parse(configs["/RedisServer"]);
     console.log(RedisServer.list);
     console.log('RedisServer.list length %d',RedisServer.list.length);
     console.log('RedisServer.list last value ',RedisServer.list[RedisServer.list.length-1]);
     var DB = JSON.parse(configs["/DB"]);
     console.log('DB user  %s',DB["user"]);
     console.log('DB password  %s',DB["password"]);
     
    //connection.end();
  });
