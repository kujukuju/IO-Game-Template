/**
 * Created by Trent on 4/16/2017.
 */

'use strict';

const ServerConnectionHandler = require('./networking/ServerConnectionHandler');
const ServerEntityInformation = require('./information/ServerEntityInformation');

const ServerPhysics = class ServerPhysics {
    static initialize() {
        ServerPhysics._lastTickTime = null;
        ServerPhysics._currentLoopTimeout = null;
    }

    static update(interval) {
        // receive information from the clients
        ServerConnectionHandler.update();

        // update entity accelerations based on new inputs

        // update physics library

        // update entity positions and angles
        ServerEntityInformation.getEntityList().forEach(entity => {
            entity.update(interval);
        });

        // update entity packets
        ServerEntityInformation.getEntityList().forEach(entity => {
            entity.updatePackets();
        });

        // send information to the clients
        ServerConnectionHandler.sendPackets();
    };

    static loop() {
        let currentTime = Date.now();
        let interval = currentTime - ServerPhysics._lastTickTime;
        ServerPhysics._lastTickTime = currentTime;

        ServerPhysics.update(interval);

        let duration = Date.now() - currentTime;
        let delay = ServerPhysics.SERVER_TICK - duration;
        let timeout = Math.max(delay, 1);

        ServerPhysics._currentLoopTimeout = setTimeout(ServerPhysics.loop, timeout);
    };
};

ServerPhysics.SERVER_TICK = 42;

module.exports = ServerPhysics;