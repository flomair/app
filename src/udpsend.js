
export default function udpsend(message, ownHost, HOST, PORT, server) {
    let buffmessage = new Buffer(message, "hex");
    console.log(buffmessage.toString('hex'));
    server.send(buffmessage, 0, buffmessage.length, PORT, HOST, function (err, bytes) {
    });
}