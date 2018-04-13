/**
 * Created by Trent on 9/14/2017.
 */

'use strict';

const InterpolatedPosition = class InterpolatedPosition {
    constructor() {
        this._times = [];
        this._positions = {};
    }

    get(time) {
        if (time === undefined) {
            console.error('Time is ', time, '.');
        }

        if (this._times.length === 0) {
            return null;
        }

        if (time <= this._times[0]) {
            return this._positions[this._times[0]];
        }

        if (time >= this._times[this._times.length - 1]) {
            return this._positions[this._times[this._times.length - 1]];
        }

        let lowerBoundIndex = null;
        for (let i = this._times.length - 2; i >= 0; i--) {
            let currentTime = this._times[i];

            if (time >= currentTime) {
                lowerBoundIndex = i;

                break;
            }
        }

        if (lowerBoundIndex === null) {
            console.log(time, this._times);
            console.error('Index should not be null at this point.');

            return [0, 0];
        }

        let lowerBoundTime = this._times[lowerBoundIndex];
        let upperBoundTime = this._times[lowerBoundIndex + 1];
        let duration = upperBoundTime - lowerBoundTime;
        let deltaTime = time - lowerBoundTime;
        let percent = deltaTime / duration;

        let lowerBoundPosition = this._positions[lowerBoundTime];
        let upperBoundPosition = this._positions[upperBoundTime];
        let dx = upperBoundPosition[0] - lowerBoundPosition[0];
        let dy = upperBoundPosition[1] - lowerBoundPosition[1];

        return [dx * percent + lowerBoundPosition[0], dy * percent + lowerBoundPosition[1]];
    }

    getLatest() {
        let position = this._positions[this._times[this._times.length - 1]];
        if (!position) {
            return null;
        }

        return [position[0], position[1]];
    }

    add(time, x, y) {
        if (time === undefined) {
            console.error('Time is ', time, '.');
        }

        if (typeof x === 'string' || typeof y === 'string') {
            console.error('Position is a string. ', x, y, '.');
        }

        if (this._positions[time]) {
            this._positions[time] = [x, y];

            return;
        }

        let index = 0;
        for (let i = this._times.length - 1; i >= 0; i--) {
            let currentTime = this._times[i];

            if (time > currentTime) {
                index = i + 1;
                break;
            }
        }

        this._times.splice(index, 0, time);
        this._positions[time] = [x, y];

        while (time - this._times[0] > InterpolatedPosition.MAX_DURATION) {
            let shiftedTime = this._times.shift();
            delete this._positions[shiftedTime];
        }
    }
};

InterpolatedPosition.MAX_DURATION = 200;