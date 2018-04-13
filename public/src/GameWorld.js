/**
 * Created by Trent on 4/16/2017.
 */

'use strict';

const GameWorld = class GameWorld {
    static initialize() {
        GameWorld.backgroundContainer = new PIXI.Container();
        GameWorld.foregroundContainer = new PIXI.Container();

        Renderer.getRenderingContainer().addChild(GameWorld.backgroundContainer);
        Renderer.getRenderingContainer().addChild(GameWorld.foregroundContainer);

        GameWorld._backgroundObjects = [];
        GameWorld._foregroundObjects = [];

        GameWorld._backgroundObjectsToAdd = [];
        GameWorld._foregroundObjectsToAdd = [];

        GameWorld._backgroundObjectsToRemove = [];
        GameWorld._foregroundObjectsToRemove = [];
    }

    static update(time, interval) {
        // add objects
        let foregroundObjectsToAddLength = GameWorld._foregroundObjectsToAdd.length;
        GameWorld._foregroundObjectsToAdd.forEach(object => {
            GameWorld._addToForeground(time, object);
        });
        GameWorld._foregroundObjectsToAdd.splice(0, foregroundObjectsToAddLength);

        let backgroundObjectsToAddLength = GameWorld._backgroundObjectsToAdd.length;
        GameWorld._backgroundObjectsToAdd.forEach(object => {
            GameWorld._addToBackground(time, object);
        });
        GameWorld._backgroundObjectsToAdd.splice(0, backgroundObjectsToAddLength);


        GameWorld._foregroundObjects.forEach(object => {
            object.update(time, interval);
        });

        // process objects
        GameWorld._backgroundObjects.forEach(object => {
            object.update(time, interval);
        });


        // remove objects
        let foregroundObjectsToRemoveLength = GameWorld._foregroundObjectsToRemove.length;
        GameWorld._foregroundObjectsToRemove.forEach(object => {
            GameWorld._removeFromForeground(time, object);
        });
        GameWorld._foregroundObjectsToRemove.splice(0, foregroundObjectsToRemoveLength);

        let backgroundObjectsToRemoveLength = GameWorld._backgroundObjectsToRemove.length;
        GameWorld._backgroundObjectsToRemove.forEach(object => {
            GameWorld._removeFromBackground(time, object);
        });
        GameWorld._backgroundObjectsToRemove.splice(0, backgroundObjectsToRemoveLength);
    }

    static updateRender(time) {
        GameWorld._backgroundObjects.forEach((object) => {
            object.updateRender(time);
        });

        GameWorld._foregroundObjects.forEach((object) => {
            object.updateRender(time);
        });
    }

    static addToBackground(object) {
        GameWorld._backgroundObjectsToAdd.push(object);
    }

    static addToForeground(object) {
        GameWorld._foregroundObjectsToAdd.push(object);
    }

    static removeFromBackground(object) {
        GameWorld._backgroundObjectsToRemove.push(object);
    }

    static removeFromForeground(object) {
        GameWorld._foregroundObjectsToRemove.push(object);
    }

    static _addToBackground(time, object) {
        let sprite = object.getSprite(time);
        if (!sprite) {
            console.error(object);
            throw new Error('Background object does not have a sprite.');
        }

        GameWorld._backgroundObjects.push(object);
        GameWorld.backgroundContainer.addChild(sprite);
    }

    static _addToForeground(time, object) {
        let sprite = object.getSprite(time);
        if (!sprite) {
            console.error(object);
            throw new Error('Foreground object does not have a sprite.');
        }

        GameWorld._foregroundObjects.push(object);
        GameWorld.foregroundContainer.addChild(sprite);
    }

    static _removeFromBackground(time, object) {
        let sprite = object.getSprite(time);
        if (!sprite) {
            console.error(object);
            throw new Error('Removing background object does not have a sprite.');
        }

        let index = GameWorld._backgroundObjects.indexOf(object);
        if (index === -1) {
            return;
        }

        GameWorld._backgroundObjects.splice(index, 1)[0].destroy(time);
        GameWorld.backgroundContainer.removeChild(sprite).destroy();
    }

    static _removeFromForeground(time, object) {
        let sprite = object.getSprite(time);
        if (!sprite) {
            console.error(object);
            throw new Error('Removing foreground object does not have a sprite.');
        }

        let index = GameWorld._foregroundObjects.indexOf(object);
        if (index === -1) {
            return;
        }

        GameWorld._foregroundObjects.splice(index, 1)[0].destroy(time);
        GameWorld.foregroundContainer.removeChild(sprite).destroy();
    }
};