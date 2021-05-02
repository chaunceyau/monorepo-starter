import type { JWSHeaderParameters, JWTClaimVerificationOptions, JWTPayload } from '../types.d';
import ProduceJWT from '../lib/jwt_producer.js';
declare class UnsecuredJWT extends ProduceJWT {
    encode(): string;
    static decode(jwt: string, options?: JWTClaimVerificationOptions): {
        payload: JWTPayload;
        header: JWSHeaderParameters;
    };
}
export { UnsecuredJWT };
export default UnsecuredJWT;
export type { JWSHeaderParameters, JWTPayload };
