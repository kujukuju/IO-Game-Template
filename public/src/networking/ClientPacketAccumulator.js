/**
 * Created by Trent on 9/13/2017.
 */

'use strict';

const ClientPacketAccumulator = class ClientPacketAccumulator {
    static initialize() {
        ClientPacketAccumulator._packetList = [];
        ClientPacketAccumulator._lastClientInputPacket = null;
    }

    static update() {
        ClientPacketAccumulator._addClientInputPacket();
    }

    static addPacket(packet) {
        ClientPacketAccumulator._packetList.push(packet);
    }

    static _addClientInputPacket() {
        const player = ClientInputProcessor.getPlayer();
        if (!player) {
            return;
        }

        const playerEntity = player.getEntity();
        if (!playerEntity) {
            return;
        }

        // get the client move packet
        const clientInputPacket = ClientInputProcessor.getClientInputPacket();
        if (!clientInputPacket.equals(ClientPacketAccumulator._lastClientInputPacket)) {
            ClientPacketAccumulator.addPacket(clientInputPacket);

            ClientPacketAccumulator._lastClientInputPacket = clientInputPacket;
        }
    }

    static getAndClearPackets() {
        const packetList = ClientPacketAccumulator._packetList;
        ClientPacketAccumulator._packetList = [];

        return packetList;
    }
};