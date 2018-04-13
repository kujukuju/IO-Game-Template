/**
 * Created by Trent on 4/17/2017.
 */

'use strict';

const TilingBackground = class TilingBackground {
    constructor() {
        this._container = new PIXI.Container();

        this._sprite = new PIXI.extras.TilingSprite.fromImage('assets/tile.png', window.innerWidth, window.innerHeight);
        this._sprite.scale.x = 2;
        this._sprite.scale.y = 2;
        this._sprite.position.x = 0;
        this._sprite.position.y = 0;
        this._sprite.width = window.innerWidth / 2;
        this._sprite.height = window.innerHeight / 2;

        this._spriteParallax = new PIXI.extras.TilingSprite.fromImage('assets/tile-parallax.png', window.innerWidth, window.innerHeight);
        this._spriteParallax.scale.x = 2;
        this._spriteParallax.scale.y = 2;
        this._spriteParallax.position.x = 0;
        this._spriteParallax.position.y = 0;
        this._spriteParallax.width = window.innerWidth / 2;
        this._spriteParallax.height = window.innerHeight / 2;

        this._container.addChild(this._spriteParallax);
        this._container.addChild(this._sprite);
    }

    update(time, interval) {

    }

    updateRender(time) {
        const entity = ClientInputProcessor.getEntity();
        const position = entity ? entity.getPosition(time) : [0, 0];
        const corner = [position[0] - window.innerWidth / 2, position[1] - window.innerHeight / 2];

        this._sprite.position.x = corner[0];
        this._sprite.position.y = corner[1];
        this._spriteParallax.position.x = corner[0];
        this._spriteParallax.position.y = corner[1];

        this._sprite.tilePosition.x = -corner[0] / 2;
        this._sprite.tilePosition.y = -corner[1] / 2;
        this._spriteParallax.tilePosition.x = -corner[0] / 2 / 2;
        this._spriteParallax.tilePosition.y = -corner[1] / 2 / 2;
    }

    destroy() {

    }

    getSprite() {
        return this._container;
    }
};