/**
 * Created by Trent on 4/12/2018.
 */

'use strict';

const Packet = require('./Packet');

const ServerConnectPlayerAndEntityPacket = class ServerConnectPlayerAndEntityPacket extends Packet {
    constructor(playerID, entityID) {
        super('CONNECT_PLAYER_AND_ENTITY');

        this.playerID = playerID;
        this.entityID = entityID;
    }
};

module.exports = ServerConnectPlayerAndEntityPacket;