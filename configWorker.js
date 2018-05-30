console.log('pid in worker:', process.pid);

process.on('message', function(msg) {
  try {
    var aPaths;
    if(Array.isArray(msg)){
      aPaths=msg;
    }else{
      aPaths = JSON.parse(msg);
    }
    for (var i = 0, len = aPaths.length; i < len; i++) {
        getConfig(client, aPaths[i]);
    }
   
  } catch (e) {
    console.log('3:', msg);
    //console.log(e);
  }

});

var i=0;

var zookeeper = require('node-zookeeper-client');
var client = zookeeper.createClient('zookeeper1:2181,zookeeper2:2181,zookeeper3:2181');
var paths = ['/RedisServer','/DB','/KafkaServer','/ZookeeperServer'];
let configs = {}; 


function getConfig(client, path) {
    client.getData(
        path,
        function (event) {
            console.log('Got event: %s', event);
            getConfig(client, path);
        },
        function (error, data, stat) {
            if (error) {
                console.log('Error occurred when getting data: %s.', error);
                return;
            }
            //JSON.stringify"
            //console.log("path:"+path);
            configs[path]=data.toString('utf8');
            process.send(JSON.stringify(configs));
        }
    );
}


 
client.once('connected', function () {
    console.log('Connected to ZooKeeper.');
    for (var i = 0, len = paths.length; i < len; i++) { 
        getConfig(client, paths[i]);
    }
});
 
client.connect();

process.emit('message', '======');

