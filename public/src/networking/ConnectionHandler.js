/**
 * Created by Trent on 4/11/2018.
 */

'use strict';

const ConnectionHandler = class ConnectionHandler {
    static initialize() {
        ConnectionHandler.SCHEMA = 'ws:'; // TODO wss
        ConnectionHandler.HOST = 'localhost';
        ConnectionHandler.PORT = 4050;

        ConnectionHandler._socket = null;
        ConnectionHandler._open = false;

        ConnectionHandler._packetList = [];

        ConnectionHandler._establishConnection();
    }

    static update(time, interval) {
        const packetList = ConnectionHandler._packetList;
        ConnectionHandler._packetList = [];

        packetList.forEach(packet => {
            PacketProcessor.processPacket(time, packet);
        });
    }

    static isConnecting() {
        return ConnectionHandler._socket && !ConnectionHandler._open;
    }

    static isConnected() {
        return ConnectionHandler._socket && ConnectionHandler._open;
    }

    static sendPackets() {
        const packetList = ClientPacketAccumulator.getAndClearPackets();
        if (packetList.length === 0) {
            return;
        }

        ConnectionHandler._send(packetList);
    }

    static _send(packetList) {
        console.log('Sending packets: ', packetList);
        ConnectionHandler._socket.send(JSON.stringify(packetList));
    }

    static _establishConnection() {
        const address = ConnectionHandler.SCHEMA + '//' + ConnectionHandler.HOST + ':' + ConnectionHandler.PORT;

        ConnectionHandler._socket = new WebSocket(address);
        ConnectionHandler._socket.addEventListener('message', (event) => ConnectionHandler._onMessage(event));
        ConnectionHandler._socket.addEventListener('error', (event) => ConnectionHandler._onError(event));
        ConnectionHandler._socket.addEventListener('open', () => ConnectionHandler._onOpen());
        ConnectionHandler._socket.addEventListener('close', () => ConnectionHandler._onClose());
    }

    static _onMessage(event) {
        const packetList = JSON.parse(event.data);
        packetList.forEach(packet => {
            ConnectionHandler._packetList.push(packet);
        });
    }

    static _onError(event) {
        console.error('WebSocket error: ', event);
    }

    static _onOpen() {
        console.log('WebSocket opened.');
        ConnectionHandler._open = true;

        // join the game
        ClientPacketAccumulator.addPacket(new ClientJoinPacket('Tim Sux'));
    }

    static _onClose() {
        console.log('WebSocket closed.');
        ConnectionHandler._socket = null;
        ConnectionHandler._open = false;
    }
};