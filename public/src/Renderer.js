/**
 * Created by Trent on 4/15/2017.
 */

'use strict';

const Renderer = class Renderer {
    static initialize() {
        Renderer._renderingContainer = new PIXI.Container();

        Renderer._tickCount = 0;

        Renderer._loader = new PIXI.loaders.Loader();

        Renderer._renderer = PIXI.autoDetectRenderer(
            window.innerWidth,
            window.innerWidth,
            {'antialias': true, 'transparent': false, 'resolution': window.devicePixelRatio || 1}
        );

        Renderer._renderer.view.style.width = '100%';
        Renderer._renderer.view.style.height = '100%';

        document.body.appendChild(Renderer._renderer.view);
    }

    static render(time) {
        StaticContainer.updateRender(time);
        GameWorld.updateRender(time);
        Camera.updateRender(time);

        Renderer._renderer.render(Renderer._renderingContainer);
    }

    static loop() {
        let currentTime = Date.now();
        let renderTime = currentTime - Physics.SERVER_TICK;

        Renderer.render(renderTime);

        window.requestAnimationFrame(Renderer.loop.bind(Renderer));
    }

    static getRenderingContainer() {
        return Renderer._renderingContainer;
    }
};