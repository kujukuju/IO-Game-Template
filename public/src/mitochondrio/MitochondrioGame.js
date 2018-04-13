/**
 * Created by Trent on 4/16/2017.
 */

'use strict';

const MitochondrioGame = class MitochondrioGame {
    static initialize() {
        // construct the world
        const tilingBackground = new TilingBackground();
        GameWorld.addToBackground(tilingBackground);

        Physics.loop();
        Renderer.loop();
    };
};