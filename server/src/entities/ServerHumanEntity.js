/**
 * Created by Trent on 4/12/2018.
 */

'use strict';

const Entity = require('./Entity');
const ServerPlayerInformation = require('../information/ServerPlayerInformation');

const ServerHumanEntity = class ServerHumanEntity extends Entity {
    constructor() {
        super();

        this._playerID = null;
    }

    update(interval) {
        const player = this.getPlayer();
        if (!player) {
            return;
        }

        let direction = [0, 0];
        if (player.getInputs()[65]) {
            direction[0] -= 1;
        }
        if (player.getInputs()[68]) {
            direction[0] += 1;
        }
        if (player.getInputs()[87]) {
            direction[1] -= 1;
        }
        if (player.getInputs()[83]) {
            direction[1] += 1;
        }

        if (direction[0] !== 0 || direction[1] !== 0) {
            const accelerationLength = Math.sqrt(direction[0] * direction[0] + direction[1] * direction[1]);

            direction[0] /= accelerationLength;
            direction[1] /= accelerationLength;
        }

        // rough physics code
        this._velocity[0] = direction[0] * 0.5;
        this._velocity[1] = direction[1] * 0.5;

        this._position[0] += this._velocity[0] * interval;
        this._position[1] += this._velocity[1] * interval;
    }

    getPlayer() {
        return ServerPlayerInformation.getPlayer(this._playerID);
    }

    getPlayerID() {
        return this._playerID;
    }

    setPlayerID(playerID) {
        this._playerID = playerID;
    }
};

module.exports = ServerHumanEntity;