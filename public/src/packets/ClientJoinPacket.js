/**
 * Created by Trent on 4/11/2018.
 */

'use strict';

const ClientJoinPacket = class ClientJoinPacket extends Packet {
    constructor(username) {
        super('CLIENT_JOIN');

        this.username = username;
    }
};