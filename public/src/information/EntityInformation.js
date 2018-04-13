/**
 * Created by Trent on 9/18/2017.
 */

'use strict';

const EntityInformation = class EntityInformation {
    static initialize() {
        EntityInformation._entityIDToEntityMap = {};
    }

    static addEntity(entity) {
        EntityInformation._entityIDToEntityMap[entity.getEntityID()] = entity;
    }

    static getEntity(entityID) {
        return EntityInformation._entityIDToEntityMap[entityID] || null;
    }

    static entityExists(entityID) {
        return !!EntityInformation._entityIDToEntityMap[entityID];
    }

    static removeEntity(entityID) {
        if (!EntityInformation._entityIDToEntityMap[entityID]) {
            console.error('Entity with an entity ID of ', entityID, ' does not exist.');
        }

        delete EntityInformation._entityIDToEntityMap[entityID];
    }
};