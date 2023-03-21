import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getMe(user: User): User;
}
