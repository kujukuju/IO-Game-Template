/**
 * Created by Trent on 4/11/2018.
 */

'use strict';

const uuid = require('uuid/v4');

const ServerPlayer = class ServerPlayer {
    constructor() {
        this._playerID = uuid();
        this._entityID = null;

        this._username = null;
        this._keysDown = {};

        this._socket = null;
    }

    getPlayerID() {
        return this._playerID;
    }

    getEntity() {
        return EntityInformation.getEntity(this._entityID);
    }

    getEntityID() {
        return this._entityID;
    }

    setEntityID(entityID) {
        this._entityID = entityID;
    }

    getUsername() {
        return this._username;
    }

    setUsername(username) {
        this._username = username;
    }

    getSocket() {
        return this._socket;
    }

    setSocket(socket) {
        this._socket = socket;
    }

    getInputs() {
        return this._keysDown;
    }

    setInputs(keysDown) {
        this._keysDown = {};

        keysDown.forEach(keyCode => {
            this._keysDown[keyCode] = true;
        });
    }
};

module.exports = ServerPlayer;