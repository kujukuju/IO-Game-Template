/**
 * Created by Trent on 4/12/2018.
 */

'use strict';

const Packet = require('./Packet');

const ServerAddEntityPacket = class ServerAddEntityPacket extends Packet {
    constructor(entityID) {
        super('ADD_ENTITY');

        this.entityID = entityID;
    }
};

module.exports = ServerAddEntityPacket;