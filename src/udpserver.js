import dgram from 'dgram';
import {ips, hostbase, broadcastPort} from './conf.json';
import udpsend from './udpsend';



export default () => {
    ips.forEach(function (ip) {
        const server = dgram.createSocket('udp4'),
            host = hostbase + ip;
        server.bind(broadcastPort, host, function () {
            //server.setBroadcast(true);
        });
        server.on('message', function (message, remote) {
            if(ip===10){
                 setTimeout(()=>{
                     udpsend('000000f7', host, remote.address, remote.port, server);
                 },2000)
            }else{
                udpsend('000000f7', host, remote.address, remote.port, server);
            }

        });

        server.on('listening', function () {
            console.log('UDP Server listening on ' + host + ":" + broadcastPort);
        });
    });
};