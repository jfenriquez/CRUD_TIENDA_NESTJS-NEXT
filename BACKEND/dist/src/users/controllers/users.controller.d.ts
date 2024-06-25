import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: any): Promise<import("../entities/user.entity").User>;
    findAll(): Promise<import("../entities/user.entity").User[]>;
    findOne(id: string): Promise<import("../entities/user.entity").User>;
    findOrdersByUser(id: string): any;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../entities/user.entity").User>;
    remove(id: string, res: any): any;
}
