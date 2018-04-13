/**
 * Created by Trent on 4/11/2018.
 */

'use strict';

const ClientInputPacket = class ClientInputPacket extends Packet {
    constructor(keysDown) {
        super('CLIENT_INPUT');

        this.keysDown = keysDown;
    }
};