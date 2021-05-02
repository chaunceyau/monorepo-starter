/// <reference types="node" />
import type * as http from 'http';
import type * as https from 'https';
import type { JWSHeaderParameters, FlattenedJWSInput, GetKeyFunction } from '../types.d';
export interface RemoteJWKSetOptions {
    timeoutDuration?: number;
    cooldownDuration?: number;
    agent?: https.Agent | http.Agent;
}
declare function createRemoteJWKSet(url: URL, options?: RemoteJWKSetOptions): GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>;
export { createRemoteJWKSet };
export default createRemoteJWKSet;
