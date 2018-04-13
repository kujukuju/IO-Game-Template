/**
 * Created by Trent on 4/12/2018.
 */

'use strict';

const Packet = require('./Packet');

const ServerSetClientPlayerIDPacket = class ServerSetClientPlayerIDPacket extends Packet {
    constructor(playerID) {
        super('SET_CLIENT_PLAYER_ID');

        this.playerID = playerID;
    }
};

module.exports = ServerSetClientPlayerIDPacket;