"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voter_1 = require("./voter");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors')({ origin: true });
const currentVersion = '0.1.1';
// tslint:disable-next-line:max-line-length
const downloadUrl = 'https://firebasestorage.googleapis.com/v0/b/serverlist-362d5.appspot.com/o/plugin%2FServerList.jar?alt=media&token=24d89baa-6af0-46ce-9b35-eec214ae8f22';
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
    let ipString = ip + '';
    ipString = ipString.split('.').join('-');
    Object.keys(recived).forEach(key => {
        if (recived[key] === undefined) {
            recived[key] = null;
        }
    });
    if (recived.token === null || recived.uid === null) {
        // NOT REGISTERED
        admin.database().ref('pingServers').child(ipString).set(recived).then((e) => {
            console.log('saved');
        }).catch(e => {
            console.error(e);
        });
        response.send({
            status: 'good', message: 'not registered',
            latestVersion: currentVersion, downloadUrl: downloadUrl
        });
    }
    else {
        // REGISTERED
        admin.database().ref('servers/' + recived.uid).once('value', e => {
            if (e.exists) {
                const server = e.val();
                if (server.token === recived.token) {
                    server.currentPlayers = recived.currentPlayers;
                    server.lastPingTime = recived.lastPingTime;
                    server.maxPlayers = recived.maxPlayers;
                    server.testValue = recived.testValue;
                    admin.database().ref('servers').child(recived.uid).set(server).then(d => {
                        response.send({
                            status: 'good', message: 'registered',
                            latestVersion: currentVersion, downloadUrl: downloadUrl
                        });
                        return;
                    }).catch(error => {
                        console.error(error);
                        response.send({
                            status: 'bad', message: '網頁端出現錯誤@@, 應該不是你的錯',
                            latestVersion: currentVersion, downloadUrl: downloadUrl
                        });
                        return;
                    });
                }
                else {
                    console.log(server.token, recived.token);
                    response.send({
                        status: 'bad', message: '秘密代碼錯誤, 你確定這是你的伺服器嗎? = =',
                        latestVersion: currentVersion, downloadUrl: downloadUrl
                    });
                    return;
                }
            }
            else {
                response.send({
                    status: 'bad', message: 'uid錯誤, 此伺服器不存在',
                    latestVersion: currentVersion, downloadUrl: downloadUrl
                });
                return;
            }
        });
    }
});
exports.voteRequest = functions.https.onRequest((request, response) => {
    const recived = {
        token: request.param('token'),
        uid: request.param('uid'),
        playerName: request.param('playerName')
    };
    if (recived.token !== undefined && recived.uid !== undefined) {
        admin.database().ref('servers/' + recived.uid + '/token').once('value', e => {
            if (e.val() === recived.token) {
                response.send({ status: 'good' });
                return;
            }
            else {
                console.log(e.val());
                response.send({ status: 'bad', message: '伺服器設定的ID和秘密代碼不正確!' });
                return;
            }
        }).catch(e => {
            response.send({ status: 'bad', message: e.toString() });
            return;
        });
    }
    else {
        response.send({ status: 'noToken', message: '伺服器好像沒有設定好秘密代碼以及伺服器ID呢!' });
        return;
    }
});
const oneDay = 82800000;
exports.vote = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const userId = request.body['userId'];
        admin.auth().getUser(userId).then(user => {
            const serverUid = request.body['serverUid'];
            const playerName = request.body['playerName'];
            const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
            const ref = admin.database().ref('voters/' + userId);
            let diff = 0;
            ref.once('value', e => {
                let canVote = false;
                const voter = new voter_1.Voter();
                if (e.exists()) {
                    Object.assign(voter, e.val());
                    diff = new Date().getTime() - voter.lastVotedTime;
                    if (diff > oneDay) {
                        canVote = true;
                    }
                    else {
                        canVote = false;
                    }
                }
                else {
                    canVote = true;
                }
                const IP = ip + '';
                if (canVote) {
                    voter.ip = IP;
                    voter.lastVotedServerUid = serverUid;
                    voter.playerName = playerName;
                    voter.userId = userId;
                    voter.recivedReward = false;
                    voter.lastVotedTime = new Date().getTime();
                    ref.set(voter).then(_ => {
                        response.send({ status: 'good' });
                    });
                    const likeRef = admin.database().ref('likes/' + serverUid);
                    likeRef.once('value', d => {
                        let likes = 0;
                        if (d.exists()) {
                            likes += d.val();
                        }
                        likes += 1;
                        likeRef.set(likes).then();
                        admin.database().ref('servers/' + serverUid + '/likes').set(likes).then();
                        admin.database().ref('servers/' + serverUid + '/lastLikeDate').set(new Date().toJSON()).then();
                    });
                }
                else {
                    response.send({ status: 'bad', message: '你今天已經按過讚了喔~每天只能按一次讚', diff: diff });
                }
            });
        }).catch(e => {
            response.send({ status: 'bad', message: '請先登入!!' });
        });
    });
});
exports.voteCheck = functions.https.onRequest((request, response) => {
    const playerName = request.param('playerName');
    const userId = request.param('userId');
    const serverUid = request.param('serverUid');
    const voterRef = admin.database().ref('voters/' + userId);
    let error = '';
    voterRef.once('value', e => {
        if (e.exists()) {
            const voter = new voter_1.Voter();
            Object.assign(voter, e.val());
            if (voter.playerName === playerName) {
                if (voter.lastVotedServerUid === serverUid) {
                    if (!voter.recivedReward) {
                        voter.recivedReward = true;
                        voterRef.set(voter).then();
                        response.send({ status: 'good' });
                        return;
                    }
                    else {
                        error = '您已經領取過獎勵了!';
                    }
                }
                else {
                    error = '您並沒有幫此伺服器按讚@@';
                }
            }
            else {
                error = '玩家名稱不正確';
            }
        }
        else {
            error = '你還沒有按讚';
        }
        response.send({ status: 'bad', message: error });
    });
});
