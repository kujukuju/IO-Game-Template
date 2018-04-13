/**
 * Created by Trent on 9/13/2017.
 */

'use strict';

const ServerPacketAccumulator = class ServerPacketAccumulator {
    static initialize() {
        ServerPacketAccumulator._packetList = [];
    }

    static addPacket(packet) {
        ServerPacketAccumulator._packetList.push(packet);
    }

    static getAndClearPackets() {
        const packetList = ServerPacketAccumulator._packetList;
        ServerPacketAccumulator._packetList = [];

        return packetList;
    }
};

module.exports = ServerPacketAccumulator;