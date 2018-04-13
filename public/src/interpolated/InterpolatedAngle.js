/**
 * Created by Trent on 9/19/2017.
 */

'use strict';

const InterpolatedAngle = class InterpolatedAngle {
    constructor() {
        this._times = [];
        this._angles = {};
    }

    get(time) {
        if (time === undefined) {
            console.error('Time is ', time, '.');
        }

        if (this._times.length === 0) {
            return null;
        }

        if (time <= this._times[0]) {
            return this._angles[this._times[0]];
        }

        if (time >= this._times[this._times.length - 1]) {
            return this._angles[this._times[this._times.length - 1]];
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

            return 0;
        }

        let lowerBoundTime = this._times[lowerBoundIndex];
        let upperBoundTime = this._times[lowerBoundIndex + 1];
        let duration = upperBoundTime - lowerBoundTime;
        let deltaTime = time - lowerBoundTime;
        let percent = deltaTime / duration;

        let lowerBoundAngle = this._angles[lowerBoundTime];
        let upperBoundAngle = this._angles[upperBoundTime];
        let da = MathHelper.radiansBetweenAngles(lowerBoundAngle, upperBoundAngle);

        let angle = da * percent + lowerBoundAngle;

        // clamp between [-Math.PI, Math.PI)
        return angle - Math.floor((angle + Math.PI) / (Math.PI * 2)) * Math.PI * 2;
    }

    getLatest() {
        let angle = this._angles[this._times[this._times.length - 1]];
        if (angle === null || angle === undefined) {
            return null;
        }

        return angle;
    }

    add(time, angle) {
        if (time === undefined) {
            console.error('Time is ', time, '.');
        }

        if (typeof angle === 'string') {
            console.error('Angle is a string. ', angle, '.');
        }

        if (this._angles[time]) {
            this._angles[time] = angle;

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
        this._angles[time] = angle;

        while (time - this._times[0] > InterpolatedAngle.MAX_DURATION) {
            let shiftedTime = this._times.shift();
            delete this._angles[shiftedTime];
        }
    }
};

InterpolatedAngle.MAX_DURATION = 200;