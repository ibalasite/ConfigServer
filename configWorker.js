console.log('pid in worker:', process.pid);

process.on('message', function(msg) {
  console.log('3:', msg);
});

var i=0;

var zookeeper = require('node-zookeeper-client');
var client = zookeeper.createClient('zookeeper:2181');
var paths = ['/RedisServer'];
 


function getConfig(client, path) {
    client.getData(
        path,
        function (event) {
            console.log('Got event: %s', event);
            for (var i = 0, len = paths.length; i < len; i++) { 
                getConfig(client, paths[i]);
            }
        },
        function (error, data, stat) {
            if (error) {
                console.log('Error occurred when getting data: %s.', error);
                return;
            }
            process.send(data.toString('utf8'));
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

