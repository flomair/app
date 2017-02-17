
export default function udpsend(message, ownHost, HOST, PORT, server) {
    let buffmessage = new Buffer(message, "hex");
    server.send(buffmessage, 0, buffmessage.length, PORT, HOST, function (err, bytes) {
    });
}