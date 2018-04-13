/**
 * Created by Trent on 4/16/2017.
 */

'use strict';

const Physics = class Physics {
    static initialize() {
        Physics._tickCount = 0;
        Physics._lastTickTime = null;
        Physics._currentLoopTimeout = null;
    }

    static update(time, interval) {
        // receive information from the connection
        ConnectionHandler.update(time, interval);

        if (ClientInputProcessor.getPlayer()) {
            ClientInputProcessor.update(time, interval);
        }
        StaticContainer.update(time, interval);
        GameWorld.update(time, interval);
        Camera.update(time, interval);

        // EntityInformation.removeEntities(time, interval);

        // send information to the server
        ClientPacketAccumulator.update();
        ConnectionHandler.sendPackets(time, interval);

        ClientInput.clearDeltas();
    };

    static loop() {
        let currentTime = Date.now();
        let interval = currentTime - Physics._lastTickTime;
        Physics._lastTickTime = currentTime;

        Physics.update(currentTime, interval);
        Physics._tickCount++;

        let duration = Date.now() - currentTime;
        let delay = Physics.TICK - duration;
        let timeout = Math.max(delay, 1);

        Physics._currentLoopTimeout = setTimeout(Physics.loop, timeout);
    };
};

Physics.TICK = 17;
Physics.SERVER_TICK = 42;