const base64 = (input: string) => Buffer.from(input, 'base64');

const keys = {
  kty: 'oct',
  kid: 'X-yjrKBannu7fp7LYP3pEDHnF5enDayamaFGVTxMf3M',
  alg: 'HS512',
  k: 'Z3DVSmbLvMCXeVcHQZcnBs4jERm7Ym8YpBpGNcNY62c',
};

const stringifiedKeys = JSON.stringify(keys);

export const JWTSECRET = stringifiedKeys;
