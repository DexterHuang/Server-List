import { Voter } from './voter';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const cors = require('cors')({ origin: true });

admin.initializeApp(functions.config().firebase);
exports.ping = functions.https.onRequest((request, response) => {
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    request.setEncoding('utf8');
    const recived = {
        lastPingTime: new Date().getTime(),
        IP: ip,
        port: request.param('port'),
        maxPlayers: request.param('maxPlayer'),
        currentPlayers: request.param('currentPlayer'),
        onlineModeEnabled: request.param('onlineMode'),
        testValue: request.param('testValue'),
        token: request.param('token'),
        uid: request.param('uid'),
        serverName: request.param('serverName'),
    };
    console.log(recived.serverName);
    let ipString: string = ip + '';
    ipString = ipString.split('.').join('-');

    Object.keys(recived).forEach(key => {
        if (recived[key] === undefined) {
            recived[key] = null;
        }
    })

    if (recived.token === null || recived.uid === null) {
        // NOT REGISTERED
        admin.database().ref('pingServers').child(ipString).set(recived).then((e) => {
            console.log('saved')
        }).catch(e => {
            console.error(e);
        })
        response.send({ status: 'good', message: 'not registered' });
    } else {
        // REGISTERED
        admin.database().ref('servers/' + recived.uid).once('value', e => {
            if (e.exists) {
                const server = e.val();
                if (server.token === recived.token) {
                    server.currentPlayer = recived.currentPlayers;
                    server.lastPingTime = recived.lastPingTime;
                    server.maxPlayer = recived.maxPlayers;
                    server.testValue = recived.testValue;
                    admin.database().ref('servers').child(recived.uid).set(server).then(d => {
                        response.send({ status: 'good', message: 'registered' })
                        return;
                    }).catch(error => {
                        console.error(error);
                        response.send({ status: 'bad', message: '網頁端出現錯誤@@, 應該不是你的錯' });
                        return;
                    })
                } else {
                    console.log(server.token, recived.token)
                    response.send({ status: 'bad', message: '秘密代碼錯誤, 你確定這是你的伺服器嗎? = =' });
                    return;
                }
            } else {
                response.send({ status: 'bad', message: 'uid錯誤, 此伺服器不存在' });
                return;
            }
        })
    }
});
exports.voteRequest = functions.https.onRequest((request, response) => {
    const recived = {
        token: request.param('token'),
        uid: request.param('uid'),
        playerName: request.param('playerName')
    }

    if (recived.token !== undefined && recived.uid !== undefined) {
        admin.database().ref('servers/' + recived.uid + '/token').once('value', e => {
            if (e.val() === recived.token) {
                response.send({ status: 'good' })
                return;
            } else {
                console.log(e.val())
                response.send({ status: 'bad', message: '伺服器設定的ID和秘密代碼不正確!' })
            }
        })
    } else {
        response.send({ status: 'noToken', message: '伺服器好像沒有設定好秘密代碼以及伺服器ID呢!' });
    }
})
const oneDay = 82800000;
exports.vote = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const userId = request.body['userId']
        admin.auth().getUser(userId).then(user => {
            const serverUid = request.body['serverUid'];
            const playerName = request.body['playerName'];
            const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
            const ref = admin.database().ref('voters/' + userId);
            ref.once('value', e => {
                let canVote = false;
                const voter: Voter = new Voter();
                if (e.exists()) {
                    Object.assign(voter, e.val());
                    const diff = new Date().getTime() - voter.lastVotedTime;
                    if (diff > oneDay) {
                        canVote = true;
                    }
                } else {
                    canVote = true;
                }
                if (canVote) {
                    voter.ip = ip;
                    voter.lastVotedServerUid = serverUid;
                    voter.playerName = playerName;
                    voter.userId = userId;
                    ref.set(voter).then(_ => {
                        response.send({ status: 'good' })
                    })
                    const likeRef = admin.database().ref('likes/' + serverUid);
                    likeRef.once('value', d => {
                        let likes = 0;
                        if (d.exists()) {
                            likes += d.val();
                        }
                        likes += 1;
                        likeRef.set(likes).then();
                    })
                } else {
                    response.send({ status: 'bad', message: '你今天已經按過讚了喔~每天只能按一次讚' })
                }
            })
        }).catch(e => {
            response.send({ status: 'bad', message: '請先登入!!' })
        })
    })
});

