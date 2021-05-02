"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkKeyType = (alg, key) => {
    if (alg.startsWith('HS') ||
        alg === 'dir' ||
        alg.startsWith('PBES2') ||
        alg.match(/^A\d{3}(?:GCM)KW$/)) {
        if (key instanceof Uint8Array || key.type === 'secret') {
            return;
        }
        throw new TypeError('CryptoKey or KeyObject instances for symmetric algorithms must be of type "secret"');
    }
    if (key instanceof Uint8Array) {
        throw new TypeError('CryptoKey or KeyObject instances must be used for asymmetric algorithms');
    }
    if (key.type === 'secret') {
        throw new TypeError('CryptoKey or KeyObject instances for asymmetric algorithms must not be of type "secret"');
    }
};
exports.default = checkKeyType;
