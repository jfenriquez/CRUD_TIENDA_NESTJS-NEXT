"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        if (await this.userRepository.findOne({
            where: { email: createUserDto.email },
        })) {
            throw new common_1.BadRequestException(`Error ,${createUserDto.email} email ya existe`);
        }
        const newUser = await this.userRepository.create(createUserDto);
        const hashPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashPassword;
        const user = await this.userRepository.save(newUser);
        return user;
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id: id },
        });
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Error ,${id}`);
        }
        this.userRepository.merge(user, updateUserDto);
        return this.userRepository.save(user);
    }
    async remove(id) {
        const user = await this.userRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Error ,${id}`);
        }
        await this.userRepository.delete(id);
        return `User ${id} deleted`;
    }
    findOrdersByUser(id) {
        const user = this.findOne(id);
        return {
            user,
        };
    }
    async finOneByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });
        if (!user) {
            throw new common_1.BadRequestException(`Error ,${email} email no existe`);
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map