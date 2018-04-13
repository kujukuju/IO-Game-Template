/**
 * Created by Trent on 4/15/2017.
 */

'use strict';

window.onload = () => {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    Physics.initialize();
    Renderer.initialize();

    ClientInput.initialize();
    ClientInputProcessor.initialize();
    GameWorld.initialize();
    Camera.initialize();
    PlayerInformation.initialize();
    EntityInformation.initialize();
    StaticContainer.initialize();
    ClientPacketAccumulator.initialize();
    ConnectionHandler.initialize();

    MitochondrioGame.initialize();
};