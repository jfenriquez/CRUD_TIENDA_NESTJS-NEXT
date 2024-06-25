import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private transporter;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigType<typeof config>);
    validateUser(email: string, password: string): Promise<User>;
    generateJWT(user: User): Promise<{
        access_token: string;
        user: User;
    }>;
    sendRecovery(email: string): Promise<void>;
    changePassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    sendEmail(to: string, subject: string, html: string): Promise<void>;
    findUserByToken(token: string): Promise<User>;
}
