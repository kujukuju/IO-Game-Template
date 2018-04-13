/**
 * Created by Trent on 9/8/2017.
 */

'use strict';

const ServerAddEntityPacket = require('../packets/ServerAddEntityPacket');
const ServerAddPlayerPacket = require('../packets/ServerAddPlayerPacket');
const ServerConnectPlayerAndEntityPacket = require('../packets/ServerConnectPlayerAndEntityPacket');
const ServerEntityInformation = require('../information/ServerEntityInformation');
const ServerHumanEntity = require('../entities/ServerHumanEntity');
const ServerPacketAccumulator = require('./ServerPacketAccumulator');
const ServerSetClientPlayerIDPacket = require('../packets/ServerSetClientPlayerIDPacket');

const ServerPacketProcessor = class ServerPacketProcessor {
    static processPacket(player, packet) {
        switch (packet.type) {
            case 'CLIENT_JOIN': {
                if (ServerPacketProcessor.DEBUG) {
                    console.log('ServerPacketProcessor | ' + player.getPlayerID() + ' | CLIENT_JOIN: ', packet);
                }

                this._processClientJoinPacket(player, packet);

                break;
            }

            case 'CLIENT_INPUT': {
                if (ServerPacketProcessor.DEBUG) {
                    console.log('ServerPacketProcessor | ' + player.getPlayerID() + ' | CLIENT_INPUT: ', packet);
                }

                this._processClientInputPacket(player, packet);

                break;
            }

            default: {
                console.error('Could not find method for packet type ', packet.type, '.');
            }
        }
    }

    static _processClientJoinPacket(player, packet) {
        const username = packet.username;

        const entity = new ServerHumanEntity();
        entity.setPlayerID(player.getPlayerID());

        player.setUsername(username);
        player.setEntityID(entity.getEntityID());

        ServerEntityInformation.addEntity(entity);

        ServerPacketAccumulator.addPacket(new ServerAddPlayerPacket(player.getPlayerID(), username));
        ServerPacketAccumulator.addPacket(new ServerAddEntityPacket(entity.getEntityID()));
        ServerPacketAccumulator.addPacket(new ServerConnectPlayerAndEntityPacket(player.getPlayerID(), entity.getEntityID()));
        ServerPacketAccumulator.addPacket(new ServerSetClientPlayerIDPacket(player.getPlayerID()));
    }

    static _processClientInputPacket(player, packet) {
        const keysDown = packet.keysDown;
        player.setInputs(keysDown);
    }
};

ServerPacketProcessor.DEBUG = true;

module.exports = ServerPacketProcessor;