/**
 * Created by Trent on 4/12/2018.
 */

'use strict';

const ServerPacketAccumulator = require('../networking/ServerPacketAccumulator');
const ServerUpdateEntityAnglePacket = require('../packets/ServerUpdateEntityAnglePacket');
const ServerUpdateEntityPositionPacket = require('../packets/ServerUpdateEntityPositionPacket');

const uuid = require('uuid/v4');

const Entity = class Entity {
    constructor() {
        this._entityID = uuid();

        this._position = [0, 0];
        this._velocity = [0, 0];
        this._angle = 0;

        this._oldPosition = [0, 0];
        this._oldAngle = 0;
    }

    update(interval) {
        // set this entities position equal to it's physics bodies position
    }

    updatePackets() {
        if (this._position[0] !== this._oldPosition[0] || this._position[1] !== this._oldPosition[1]) {
            ServerPacketAccumulator.addPacket(new ServerUpdateEntityPositionPacket(this._entityID, this._position));
        }

        if (this._angle !== this._oldAngle) {
            ServerPacketAccumulator.addPacket(new ServerUpdateEntityAnglePacket(this._entityID, this._angle));
        }

        this._oldPosition[0] = this._position[0];
        this._oldPosition[1] = this._position[1];

        this._oldAngle = this._angle;
    }

    getEntityID() {
        return this._entityID;
    }

    getPosition() {
        return this._position;
    }

    setPosition(x, y) {
        this._position[0] = x;
        this._position[1] = y;
    }

    getVelocity() {
        return this._velocity;
    }

    setVelocity(x, y) {
        this._velocity[0] = x;
        this._velocity[1] = y;
    }

    getAngle() {
        return this._angle;
    }

    setAngle(angle) {
        this._angle = angle;
    }
};

module.exports = Entity;