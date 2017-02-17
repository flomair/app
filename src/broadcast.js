import dgram from 'dgram';
import udpsend from './udpsend';
import ip from 'ip';
const BROADCAST_PORT = 30718,
    //BROADCAST_ADDR = getmyIP(),
    BROADCAST_ADDR = '192.168.1.255',
    HOST = "0.0.0.0",
    server = dgram.createSocket('udp4'),
    targets = [],
    broadcastinterval = 300,
    braodcastwait = 1000,
    message = '000000F6';
let rep,
    collectedSurfaces = false;



//let subn = ip.subnet('192.168.1.17', '192.255.255.255')
let subn = ip.mask('192.168.1.134', '255.255.255.0')
console.log(subn)



server.bind(BROADCAST_PORT, HOST, function () {
    server.setBroadcast(true);
    listen();
    rep = setInterval(broadcastNew, broadcastinterval);
    setTimeout(getSurfaces,braodcastwait);
});


const listen = () => {
    server.on('message', function (message, remote) {
        if (!targets.includes(remote.address) && message.toString('hex').substring(0,8)=== '000000f7') {
            listSurfaces(remote.address)
        }
    });
};

const broadcastNew = () => {
    udpsend(message, HOST, BROADCAST_ADDR, BROADCAST_PORT, server);
};

const listSurfaces = (surface) =>{
    "use strict";
    targets.push(surface);
    if(collectedSurfaces) {
        handleNewSurface();
    }
};

const getSurfaces = () => {
    clearTimeout(rep);
    collectedSurfaces = true;
    handleNewSurface();
    server.close()
};

const handleNewSurface = () =>{
    console.log(targets);
};

function getmyIP (){
    let myIP = ip.address().split('.');
    console.log(myIP)
    myIP[2] = '255';
    myIP[3] = '255';
    return myIP.join('.');
};

