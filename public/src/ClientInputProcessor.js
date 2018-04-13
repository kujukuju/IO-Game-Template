/**
 * Created by Trent on 4/16/2017.
 */

'use strict';

const ClientInputProcessor = class ClientInputProcessor {
    static initialize() {
        ClientInputProcessor._playerID = null;

        ClientInputProcessor._lastInterval = 0;
    }

    static update(time, interval) {
        if (ClientInputProcessor._playerID === null) {
            return;
        }

        ClientInputProcessor._lastInterval = interval;
    }

    static getPlayer() {
        if (ClientInputProcessor._playerID === null) {
            return null;
        }

        return PlayerInformation.getPlayer(ClientInputProcessor._playerID);
    }

    static getPlayerID() {
        return ClientInputProcessor._playerID;
    }

    static setPlayerID(playerID) {
        ClientInputProcessor._playerID = playerID;
    }

    static getEntity() {
        let player = ClientInputProcessor.getPlayer();
        if (!player) {
            return null;
        }

        return player.getEntity();
    }

    static getEntityID() {
        let entity = ClientInputProcessor.getEntity();
        if (!entity) {
            return null;
        }

        return entity.getEntityID();
    }

    static getClientInputPacket() {
        return new ClientInputPacket(Object.keys(ClientInput.KEYS_DOWN));
    }

    static getMousePosition() {
        let velocity = [0, 0];

        const entity = ClientInputProcessor.getEntity();
        if (entity) {
            velocity = entity.getVelocity();
        }

        let offset = [
            -entity.getLatestPosition()[0] + window.innerWidth / 2 - velocity[0] * ClientInputProcessor._lastInterval,
            -entity.getLatestPosition()[1] + window.innerHeight / 2 - velocity[1] * ClientInputProcessor._lastInterval
        ];

        return [ClientInput.mousePos[0] - offset[0], ClientInput.mousePos[1] - offset[1]];
    }
};