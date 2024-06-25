import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: Request): Promise<{
        access_token: string;
        user: User;
    }>;
    recuperarPassword(email: string): Promise<void>;
    changePassword(req: Request, token: string): Promise<{
        message: string;
    }>;
    findUserByToken(req: Request): Promise<User>;
}
