// const { JWT } = require('jose/jwt');
// const { JWK } = require('jose/jwk');
const jose = require('node-jose')
const jwt = require('jsonwebtoken');
const base64 = (input) => Buffer.from(input, 'base64');

const keysShort = {
  alg: 'HS512',
  kid: 'X-yjrKBannu7fp7LYP3pEDHnF5enDayamaFGVTxMf3M',
  kty: 'oct',
};

const keys = {
  kty: 'oct',
  kid: 'X-yjrKBannu7fp7LYP3pEDHnF5enDayamaFGVTxMf3M',
  alg: 'HS512',
  //   k: 'Z3DVSmbLvMCXeVcHQZcnBs4jERm7Ym8YpBpGNcNY62c',
};

const stringifiedKeys = JSON.stringify(keysShort);

const JWTSECRET = base64(stringifiedKeys);

// const shouldWorkJwt = jwt.sign(
//   {
//     name: 'J Smith',
//     email: 'jsmith@example.com',
//     sub: '1',
//   },
//   stringifiedKeys,
//   { algorithm: 'HS512', expiresIn: 60 * 60 * 24 * 24 * 24 }
// );

// console.log({ shouldWorkJwt });
// var _signingKey = _jose.default.JWK.asKey(JSON.parse(verificationKey));
var _signingKey = JWK.asKey(JSON.parse(stringifiedKeys));
console.log({ _signingKey });
const key = JWT.verify(
  'eyJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiSiBTbWl0aCIsImVtYWlsIjoianNtaXRoQGV4YW1wbGUuY29tIiwic3ViIjoiMSIsImlhdCI6MTYxOTkxMzc3OSwiZXhwIjoxNjIyNTA1Nzc5fQ.WwB35k_EyQ-j_23LCaLnnSmYjGhREbUuORDfyUMh9KTmkXIPejsFggYXWIgNqlKHCKCZQm5UuI2X9wAPE8hSzA',
  _signingKey
);

console.log({ key });
const k = jwt.verify(
  'eyJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiSiBTbWl0aCIsImVtYWlsIjoianNtaXRoQGV4YW1wbGUuY29tIiwic3ViIjoiMSIsImlhdCI6MTYxOTkxMzc3OSwiZXhwIjoxNjIyNTA1Nzc5fQ.WwB35k_EyQ-j_23LCaLnnSmYjGhREbUuORDfyUMh9KTmkXIPejsFggYXWIgNqlKHCKCZQm5UuI2X9wAPE8hSzA',
  stringifiedKeys
);

console.log(k);
