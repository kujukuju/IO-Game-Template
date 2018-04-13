/**
 * Created by Trent on 4/17/2017.
 */

'use strict';

const Player = class Player {
    constructor(playerID) {
        this._playerID = playerID;
        this._username = null;
        this._entityID = null;
    }

    update(time, interval) {
        if (this._entityID === null) {
            return;
        }

        const entity = this.getEntity();
    }

    getPlayerID() {
        return this._playerID;
    }

    getUsername() {
        return this._username;
    }

    setUsername(username) {
        this._username = username;
    }

    getEntity() {
        if (!this._entityID) {
            return null;
        }

        return EntityInformation.getEntity(this._entityID);
    }

    getEntityID() {
        return this._entityID
    }

    setEntityID(entityID) {
        this._entityID = entityID;
    }
};