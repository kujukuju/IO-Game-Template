/**
 * Created by Trent on 4/17/2017.
 */

'use strict';

const Camera = class Camera {
    static initialize() {
        // initialize stuff for nice camera movements
    }

    static update(time, interval) {

    }

    static updateRender(time) {
        let entity = ClientInputProcessor.getEntity();

        const position = entity ? entity.getPosition(time) : [0, 0];
        const corner = [position[0] - window.innerWidth / 2, position[1] - window.innerHeight / 2];

        Renderer.getRenderingContainer().position.x = -corner[0];
        Renderer.getRenderingContainer().position.y = -corner[1];
    }
};