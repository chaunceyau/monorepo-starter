"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const get_named_curve_js_1 = require("./get_named_curve.js");
const errors_js_1 = require("../util/errors.js");
const check_modulus_length_js_1 = require("./check_modulus_length.js");
const ecCurveAlgMap = new Map([
    ['ES256', 'P-256'],
    ['ES256K', 'secp256k1'],
    ['ES384', 'P-384'],
    ['ES512', 'P-521'],
]);
function keyForCrypto(alg, key) {
    switch (alg) {
        case 'EdDSA':
            if (key.type === 'secret' || !['ed25519', 'ed448'].includes(key.asymmetricKeyType)) {
                throw new TypeError('invalid key type or asymmetric key type for this operation');
            }
            return key;
        case 'RS256':
        case 'RS384':
        case 'RS512':
            if (key.type === 'secret' || key.asymmetricKeyType !== 'rsa') {
                throw new TypeError('invalid key type or asymmetric key type for this operation');
            }
            check_modulus_length_js_1.default(key, alg);
            return key;
        case 'PS256':
        case 'PS384':
        case 'PS512':
            if (key.type === 'secret' || key.asymmetricKeyType !== 'rsa') {
                throw new TypeError('invalid key type or asymmetric key type for this operation');
            }
            check_modulus_length_js_1.default(key, alg);
            return {
                key,
                padding: crypto_1.constants.RSA_PKCS1_PSS_PADDING,
                saltLength: crypto_1.constants.RSA_PSS_SALTLEN_DIGEST,
            };
        case 'ES256':
        case 'ES256K':
        case 'ES384':
        case 'ES512':
            if (key.type === 'secret' || key.asymmetricKeyType !== 'ec') {
                throw new TypeError('invalid key type or asymmetric key type for this operation');
            }
            if (ecCurveAlgMap.get(alg) !== get_named_curve_js_1.default(key)) {
                throw new TypeError('invalid key curve for the algorithm');
            }
            return { dsaEncoding: 'ieee-p1363', key };
        default:
            throw new errors_js_1.JOSENotSupported(`alg ${alg} is unsupported either by JOSE or your javascript runtime`);
    }
}
exports.default = keyForCrypto;
