import { Role } from '../models/roles.model';
export declare const ROLES_KEY = "role";
export declare const Roles: (...role: Role[]) => import("@nestjs/common").CustomDecorator<string>;
