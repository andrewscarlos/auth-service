import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './interfaces/UserToken.interface';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(user: User): UserToken;
    validateUser(email: string, password: string): Promise<import(".prisma/client").User>;
}
