import { AuthService } from './auth.service';
import { AuthRequest } from './interfaces/AuthResquest.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: AuthRequest): Promise<import("./interfaces/UserToken.interface").UserToken>;
}
