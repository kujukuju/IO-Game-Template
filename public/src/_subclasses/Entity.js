/**
 * Created by Trent on 6/15/2017.
 */

'use strict';

const Entity = class Entity {
    constructor(entityID) {
        this._entityID = entityID;
        this._playerID = null;

        this._position = new InterpolatedPosition();
        this._position.add(0, 0, 0);
        this._velocity = [0, 0];
        this._angle = new InterpolatedAngle();
        this._angle.add(0, 0);

    }

    update(time, interval) {

    }

    updateRender(time) {

    }

    getEntityID() {
        return this._entityID;
    }

    getPosition(time) {
        return this._position.get(time);
    }

    getLatestPosition() {
        return this._position.getLatest();
    }

    setPosition(time, x, y) {
        this._position.add(time, x, y);
    }

    getVelocity() {
        return this._velocity;
    }

    setVelocity(x, y) {
        this._velocity[0] = x;
        this._velocity[1] = y;
    }

    getAngle(time) {
        return this._angle.get(time);
    }

    getLatestAngle() {
        return this._angle.getLatest();
    }

    setAngle(time, angle) {
        this._angle.add(time, angle);
    }

    getPlayer() {
        if (!this._playerID) {
            return null;
        }

        return PlayerInformation.getPlayer(this._playerID);
    }

    getPlayerID() {
        return this._playerID;
    }

    setPlayerID(playerID) {
        this._playerID = playerID;
    }

    destroy() {

    }
};