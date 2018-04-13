/**
 * Created by Trent on 4/11/2018.
 */

'use strict';

const ServerConnectionHandler = require('./networking/ServerConnectionHandler');
const ServerPhysics = require('./ServerPhysics');
const ServerEntityInformation = require('./information/ServerEntityInformation');
const ServerPacketAccumulator = require('./networking/ServerPacketAccumulator');
const ServerPlayerInformation = require('./information/ServerPlayerInformation');

const Server = class Server {
    static initialize() {
        ServerPhysics.initialize();
        ServerPlayerInformation.initialize();
        ServerEntityInformation.initialize();
        ServerPacketAccumulator.initialize();
        ServerConnectionHandler.initialize();

        ServerPhysics.loop();
    }
};

Server.initialize();