"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
function ping(request, response) {
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    const recived = {
        lastPingTime: new Date().getTime(),
        ip: ip,
        port: request.param('port'),
        maxPlayers: request.param('maxPlayer'),
        currentPlayers: request.param('currentPlayer'),
        onlineMode: request.param('onlineMode'),
        testValue: request.param('testValue')
    };
    let ipString = ip + '';
    ipString = ipString.split('.').join('-');
    console.log(ipString);
    admin.database().ref('pingServers').child(ipString).set(recived).then((e) => {
        console.log('saved');
    }).catch(e => {
        console.error(e);
    });
    response.send({ status: 'good', echo: recived });
}
exports.ping = ping;
