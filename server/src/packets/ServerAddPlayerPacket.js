/**
 * Created by Trent on 4/12/2018.
 */

'use strict';

const Packet = require('./Packet');

const ServerAddPlayerPacket = class ServerAddPlayerPacket extends Packet {
    constructor(playerID, username) {
        super('ADD_PLAYER');

        this.playerID = playerID;
        this.username = username;
    }
};

module.exports = ServerAddPlayerPacket;