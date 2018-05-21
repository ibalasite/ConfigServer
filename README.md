# Subject
### Related to the configuration problem is the problem of group membership. As the load changes, we want to be able to add or remove new machines and processes.

### install thrift

```
apt-get install libboost-dev libboost-test-dev libboost-program-options-dev libbb
oost-system-dev libboost-filesystem-dev libevent-dev automake libtool flex bisonn
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

```
###  quick start

```
 ./configServer.js &
 ./configClient.js &  
```
