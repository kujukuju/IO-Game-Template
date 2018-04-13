/**
 * Created by Trent on 4/12/2018.
 */

'use strict';

const Packet = require('./Packet');

const ServerUpdateEntityAnglePacket = class ServerUpdateEntityAnglePacket extends Packet {
    constructor(entityID, angle) {
        super('UPDATE_ENTITY_ANGLE');

        this.entityID = entityID;
        this.angle = angle;
    }
};

module.exports = ServerUpdateEntityAnglePacket;
