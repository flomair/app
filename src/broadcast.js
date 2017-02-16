import dgram from 'dgram';
import udpsend from './udpsend';
const BROADCAST_PORT = 30718,
     BROADCAST_ADDR = "127.255.255.255",
    //BROADCAST_ADDR = "192.168.1.255",
    HOST = "0.0.0.0",
    server = dgram.createSocket('udp4'),
    targets = [],
    message = '000000F6';
let rep,
    collectedSurfaces = false;


server.bind(BROADCAST_PORT, HOST, function () {
    listen();
    rep = setInterval(broadcastNew, 100);
    setTimeout(getSurfaces,1000);
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
    //server.close()
};

const handleNewSurface = () =>{
    console.log(targets);
};