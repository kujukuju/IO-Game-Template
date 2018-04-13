/**
 * Created by Trent on 9/8/2017.
 */

'use strict';

const PacketProcessor = class PacketProcessor {
    static processPacket(time, packet) {
        switch (packet.type) {
            case 'ADD_PLAYER': {
                if (PacketProcessor.DEBUG) {
                    console.log('PacketProcessor | ADD_PLAYER: ', packet);
                }

                this._processAddPlayerPacket(time, packet);

                break;
            }

            case 'ADD_ENTITY': {
                if (PacketProcessor.DEBUG) {
                    console.log('PacketProcessor | ADD_ENTITY: ', packet);
                }

                this._processAddEntityPacket(time, packet);

                break;
            }

            case 'CONNECT_PLAYER_AND_ENTITY': {
                if (PacketProcessor.DEBUG) {
                    console.log('PacketProcessor | CONNECT_PLAYER_AND_ENTITY: ', packet);
                }

                this._processConnectPlayerAndEntityPacket(time, packet);

                break;
            }

            case 'SET_CLIENT_PLAYER_ID': {
                if (PacketProcessor.DEBUG) {
                    console.log('PacketProcessor | SET_CLIENT_PLAYER_ID: ', packet);
                }

                this._processSetClientPlayerIDPacket(time, packet);

                break;
            }

            case 'UPDATE_ENTITY_POSITION': {
                if (PacketProcessor.DEBUG) {
                    console.log('PacketProcessor | UPDATE_ENTITY_POSITION: ', packet);
                }

                this._processUpdateEntityPositionPacket(time, packet);

                break;
            }

            case 'UPDATE_ENTITY_ANGLE': {
                if (PacketProcessor.DEBUG) {
                    console.log('PacketProcessor | UPDATE_ENTITY_ANGLE: ', packet);
                }

                this._processUpdateEntityAnglePacket(time, packet);

                break;
            }
        }
    }

    static _processAddPlayerPacket(time, packet) {
        const playerID = packet.playerID;
        const username = packet.username;

        const player = new Player(playerID);
        player.setUsername(username);

        PlayerInformation.addPlayer(player);
    }

    static _processAddEntityPacket(time, packet) {
        const entityID = packet.entityID;

        const humanEntity = new HumanEntity(entityID);

        EntityInformation.addEntity(humanEntity);
        GameWorld.addToForeground(humanEntity);
    }

    static _processConnectPlayerAndEntityPacket(time, packet) {
        const playerID = packet.playerID;
        const entityID = packet.entityID;

        const player = PlayerInformation.getPlayer(playerID);
        const entity = EntityInformation.getEntity(entityID);
        if (!player || !entity) {
            console.error('Could not find player or entity to connect. ', playerID, entityID);
        }

        player.setEntityID(entityID);
        entity.setPlayerID(playerID);
    }

    static _processSetClientPlayerIDPacket(time, packet) {
        const playerID = packet.playerID;

        ClientInputProcessor.setPlayerID(playerID);
    }

    static _processUpdateEntityPositionPacket(time, packet) {
        const entityID = packet.entityID;
        const position = packet.position;

        const entity = EntityInformation.getEntity(entityID);
        if (!entity) {
            console.error('Could not find entity to update position. ', entityID);
        }

        entity.setPosition(time, position[0], position[1]);
    }

    static _processUpdateEntityAnglePacket(time, packet) {
        const entityID = packet.entityID;
        const angle = packet.angle;

        const entity = EntityInformation.getEntity(entityID);
        if (!entity) {
            console.error('Could not find entity to update angle. ', entityID);
        }

        entity.setAngle(time, angle);
    }
};

PacketProcessor.DEBUG = true;