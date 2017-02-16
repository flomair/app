'use strict';
import http from 'http';
import {ips, ports,hostbase} from './conf.json';
const servers = [];

function buildServers() {
    ports.forEach(port => {
        ips.forEach(ip => {
            let host = hostbase + ip;
            let server  = http.createServer().listen(port, host);
            server.on('request', (req, res) => {
                res.write(getres({server,req, port, host}));
                res.end();
            });
            servers.push(server)
        });
    });
}

function getres({port,req,server,host}) {
    return 'Response from ' + port + ' ' + host + '\n'
}

export default buildServers;