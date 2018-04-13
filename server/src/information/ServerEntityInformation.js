/**
 * Created by Trent on 9/18/2017.
 */

'use strict';

const ServerEntityInformation = class ServerEntityInformation {
    static initialize() {
        ServerEntityInformation._entityIDToEntityMap = {};
    }

    static addEntity(entity) {
        ServerEntityInformation._entityIDToEntityMap[entity.getEntityID()] = entity;
    }

    static getEntity(entityID) {
        return ServerEntityInformation._entityIDToEntityMap[entityID] || null;
    }

    static getEntityList() {
        return Object.values(ServerEntityInformation._entityIDToEntityMap);
    }

    static entityExists(entityID) {
        return !!ServerEntityInformation._entityIDToEntityMap[entityID];
    }

    static removeEntity(entityID) {
        if (!ServerEntityInformation._entityIDToEntityMap[entityID]) {
            console.error('Entity with an entity ID of ', entityID, ' does not exist.');
        }

        delete ServerEntityInformation._entityIDToEntityMap[entityID];
    }
};

module.exports = ServerEntityInformation;