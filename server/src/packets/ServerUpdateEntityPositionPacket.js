/**
 * Created by Trent on 4/12/2018.
 */

'use strict';

const Packet = require('./Packet');

const ServerUpdateEntityPositionPacket = class ServerUpdateEntityPositionPacket extends Packet {
    constructor(entityID, position) {
        super('UPDATE_ENTITY_POSITION');

        this.entityID = entityID;
        this.position = position;
    }
};

module.exports = ServerUpdateEntityPositionPacket;
