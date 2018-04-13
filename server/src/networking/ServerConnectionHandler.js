/**
 * Created by Trent on 4/11/2018.
 */

'use strict';

const ServerEntityInformation = require('../information/ServerEntityInformation');
const ServerPacketAccumulator = require('./ServerPacketAccumulator');
const ServerPacketProcessor = require('./ServerPacketProcessor');
const ServerPlayerInformation = require('../information/ServerPlayerInformation');
const ServerPlayer = require('../ServerPlayer');
const WebSocketServer = require('ws').Server;

const PORT = 4050;

const ServerConnectionHandler = class ServerConnectionHandler {
    static initialize() {
        ServerConnectionHandler._socketServer = new WebSocketServer({port: PORT});
        ServerConnectionHandler._socketServer.on('connection', ServerConnectionHandler._onConnectionEstablished);

        ServerConnectionHandler._packetListByPlayerID = {};

        console.log('Listening on port ' + PORT + '.');
    }

    static update() {
        Object.keys(ServerConnectionHandler._packetListByPlayerID).forEach(playerID => {
            const packetList = ServerConnectionHandler._packetListByPlayerID[playerID] || [];
            ServerConnectionHandler._packetListByPlayerID[playerID] = [];

            const player = ServerPlayerInformation.getPlayer(playerID);

            packetList.forEach(packet => {
                ServerPacketProcessor.processPacket(player, packet);
            });
        });
    }

    static sendPackets() {
        const packetList = ServerPacketAccumulator.getAndClearPackets();
        if (packetList.length === 0) {
            return;
        }

        ServerConnectionHandler._send(packetList);
    }

    static _send(packetList) {
        const packetString = JSON.stringify(packetList);

        ServerPlayerInformation.getPlayerList().forEach(player => {
            player.getSocket().send(packetString);
        });
    }

    static _onMessage(player, data, flags) {
        const playerPacketList = ServerConnectionHandler._packetListByPlayerID[player.getPlayerID()] || [];
        ServerConnectionHandler._packetListByPlayerID[player.getPlayerID()] = playerPacketList;

        const packetList = JSON.parse(data);
        packetList.forEach(packet => {
            playerPacketList.push(packet);
        });
    }

    static _onConnectionClosed(player) {
        console.log('Connection closed to player ' + player.getPlayerID());

        const entityID = player.getEntityID();
        if (ServerEntityInformation.entityExists(entityID)) {
            ServerEntityInformation.removeEntity(entityID);
        }

        const playerID = player.getPlayerID();
        if (ServerPlayerInformation.playerExists(playerID)) {
            ServerPlayerInformation.removePlayer(playerID);
        }

        delete ServerConnectionHandler._packetListByPlayerID[player.getPlayerID()];
    }

    static _onConnectionEstablished(socket) {
        // webSocket.binaryType = 'arraybuffer'; TODO

        const player = new ServerPlayer();
        player.setSocket(socket);

        ServerPlayerInformation.addPlayer(player);

        socket.on('message', (data, flags) => ServerConnectionHandler._onMessage(player, data, flags));
        socket.on('close', () => ServerConnectionHandler._onConnectionClosed(player));
    }
};

module.exports = ServerConnectionHandler;