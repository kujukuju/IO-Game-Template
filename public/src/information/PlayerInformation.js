/**
 * Created by Trent on 9/18/2017.
 */

'use strict';

const PlayerInformation = class PlayerInformation {
    static initialize() {
        PlayerInformation._playerIDToPlayerMap = {};
    }

    static addPlayer(player) {
        PlayerInformation._playerIDToPlayerMap[player.getPlayerID()] = player;
    }

    static getPlayer(playerID) {
        return PlayerInformation._playerIDToPlayerMap[playerID] || null;
    }

    static playerExists(playerID) {
        return !!PlayerInformation._playerIDToPlayerMap[playerID];
    }

    static removePlayer(playerID) {
        if (!PlayerInformation._playerIDToPlayerMap[playerID]) {
            console.error('Player with a player ID of ', playerID, ' does not exist.');
        }

        delete PlayerInformation._playerIDToPlayerMap[playerID];
    }
};