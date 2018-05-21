# Subject
### Related to the configuration problem is the problem of group membership. As the load changes, we want to be able to add or remove new machines and processes.

### install thrift

```
apt-get install libboost-dev libboost-test-dev libboost-program-options-dev libevent-dev automake libtool flex bison pkg-config g++ libssl-dev
 pkg-config g++ libssl-dev
curl http://archive.apache.org/dist/thrift/0.11.0/thrift-0.11.0.tar.gz | tar zx
cd thrift-0.11.0/
./configure
make
make install
thrift --help 
```
### install package 

```
 npm install thrift
 npm install child_process
 npm install node-zookeeper-client

```
### setting environment

```
thrift -r --gen js:node tutorial.thrift
#create share folder
mkdir ~/share
#start zookeeper
docker run --name zookeeper -p 2181:2181 -d evansking/zookeeper:0.1
#setting zookeeper
docker exec -it zookeeper zkCli.sh -server localhost
#in zookeeper client
[zk: localhost(CONNECTED) 0] create /RedisServer {"list":["test1","test2","test3","test4"]}
[zk: localhost(CONNECTED) 1] create /DB {"user":"mysql_user","password":"{yourpwd}"}
[zk: localhost(CONNECTED) 2] create /DB1 {"user":"mysql_user","password":"{yourpwd}"}
[zk: localhost(CONNECTED) 3] create /DB2 {"user":"mysql_user","password":"{yourpwd}"}
[zk: localhost(CONNECTED) 4] quit
#start 4 redis
docker run -dti --name test1 -v ~/share:share evansking/redis
docker run -dti --name test2 -v ~/share:share evansking/redis
docker run -dti --name test3 -v ~/share:share evansking/redis
docker run -dti --name test4 -v ~/share:share evansking/redis

```
###  quick start

```
 ./configServer.js &
 ./configClient.js  
```
