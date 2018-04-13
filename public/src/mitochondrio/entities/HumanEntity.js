/**
 * Created by Trent on 4/16/2017.
 */

'use strict';

const HumanEntity = class HumanEntity extends Entity {
    constructor(entityID) {
        super(entityID);

        this._container = new PIXI.Container();

        this._sprite = PIXI.Sprite.fromImage('assets/circle.png');
        this._sprite.scale.x = 2;
        this._sprite.scale.y = 2;
        this._sprite.anchor.x = 0.5;
        this._sprite.anchor.y = 0.5;
        this._container.addChild(this._sprite);
    }

    update(time, interval) {

    }

    updateRender(time) {
        let position = this.getPosition(time);

        this._container.position.x = position[0];
        this._container.position.y = position[1];
    }

    getSprite() {
        return this._container;
    }

    destroy() {

    }
};