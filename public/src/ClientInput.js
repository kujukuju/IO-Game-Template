/**
 * Created by Trent on 4/16/2017.
 */

'use strict';

const ClientInput = class ClientInput {
    static initialize() {
        ClientInput.KEYS_DOWN = {};
        ClientInput.KEYS_DELTA_DOWN = {};

        ClientInput.mousePos = [];
        ClientInput.mouseDownLeft = false;
        ClientInput.mouseDeltaDownLeft = false;
        ClientInput.mouseDownRight = false;
        ClientInput.mouseDeltaDownRight = false;

        ClientInput.listen();
    };

    static clearDeltas() {
        ClientInput.KEYS_DELTA_DOWN = {};
        ClientInput.mouseDeltaDownLeft = false;
        ClientInput.mouseDeltaDownRight = false;
    };

    static listen() {
        // keys
        window.addEventListener('keydown', (e) => {
            if (e.target.tagName.toLowerCase() !== 'input') {
                ClientInput.KEYS_DOWN[e.keyCode] = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            delete ClientInput.KEYS_DOWN[e.keyCode];
        });

        // mouse
        window.addEventListener('mousemove', (e) => {
            ClientInput.mousePos[0] = e.clientX;
            ClientInput.mousePos[1] = e.clientY;

            e.preventDefault();
        });

        window.addEventListener('mousedown', (e) => {
            if (e.which === 1) {
                ClientInput.mouseDownLeft = true;
                ClientInput.mouseDeltaDownLeft = true;
            }
            if (e.which === 3) {
                ClientInput.mouseDownRight = true;
                ClientInput.mouseDeltaDownRight = true;
            }

            e.preventDefault();
            return false;
        });

        window.addEventListener('mouseup', (e) => {
            if (e.which === 1) {
                ClientInput.mouseDownLeft = false;
                ClientInput.mouseDeltaUpLeft = true;
            }
            if (e.which === 3) {
                ClientInput.mouseDownRight = false;
                ClientInput.mouseDeltaUpRight = true;
            }

            e.preventDefault();
            return false;
        });

        // context menu
        window.addEventListener('contextmenu', (e) => {
            // e.preventDefault();
        });
    }
};