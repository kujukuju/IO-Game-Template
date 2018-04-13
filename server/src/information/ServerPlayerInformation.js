/**
 * Created by Trent on 9/18/2017.
 */

'use strict';

const ServerPlayerInformation = class ServerPlayerInformation {
    static initialize() {
        ServerPlayerInformation._playerIDToPlayerMap = {};
    }

    static addPlayer(player) {
        ServerPlayerInformation._playerIDToPlayerMap[player.getPlayerID()] = player;
    }

    static getPlayer(playerID) {
        return ServerPlayerInformation._playerIDToPlayerMap[playerID] || null;
    }

    static getPlayerList() {
        return Object.values(ServerPlayerInformation._playerIDToPlayerMap);
    }

    static playerExists(playerID) {
        return !!ServerPlayerInformation._playerIDToPlayerMap[playerID];
    }

    static removePlayer(playerID) {
        if (!ServerPlayerInformation._playerIDToPlayerMap[playerID]) {
            console.error('Player with a player ID of ', playerID, ' does not exist.');
        }

        delete ServerPlayerInformation._playerIDToPlayerMap[playerID];
    }
};

module.exports = ServerPlayerInformation;