/**
 * Created by Trent on 9/8/2017.
 */

'use strict';

const Packet = class Packet {
    constructor(type) {
        this.type = type;
    }

    equals(packet) {
        if (!packet) {
            return false;
        }

        if (this.type !== packet.type) {
            return false;
        }

        return this._equals(this, packet);
    }

    _equals(value1, value2) {
        if (typeof value1 === 'number' || typeof value1 === 'string' || value1 === null || value1 === undefined) {
            return value1 === value2;
        } else if (value1 instanceof Array) {
            if (!(value2 instanceof Array)) {
                return false;
            }

            if (value1.length !== value2.length) {
                return false;
            }

            for (let i = 0; i < value1.length; i++) {
                if (!this._equals(value1[i], value2[i])) {
                    return false;
                }
            }

            return true;
        } else if (value1 instanceof Object) {
            if (!(value2 instanceof Object)) {
                return false;
            }

            let keys1 = Object.keys(value1);
            let keys2 = Object.keys(value2);
            if (keys1.length !== keys2.length) {
                return false;
            }

            for (let i = 0; i < keys1.length; i++) {
                let key = keys1[i];
                if (!this._equals(value1[key], value2[key])) {
                    return false;
                }
            }

            return true;
        } else {
            console.error('Packet equals method of type ', this.type, ' could not identify type of value ', value1, '.');
            return false;
        }
    }
};

module.exports = Packet;