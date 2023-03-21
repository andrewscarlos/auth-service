import { Strategy } from 'passport-jwt';
import { UserFromJwt } from '../interfaces/UserFromJwt.interface';
import { UserPayload } from '../interfaces/UserPayload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: UserPayload): Promise<UserFromJwt>;
}
export {};
