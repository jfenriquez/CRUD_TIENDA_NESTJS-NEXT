import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

//import { ProductosService } from '../../productos/services/productos.service';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    //private productosService: any,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    if (
      await this.userRepository.findOne({
        where: { email: createUserDto.email },
      })
    ) {
      throw new BadRequestException(
        `Error ,${createUserDto.email} email ya existe`,
      );
    }
    const newUser = await this.userRepository.create(createUserDto);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    const user = await this.userRepository.save(newUser);
    /* const result = {
      id: (await user).id,
      nombre: (await user).nombre,
      apellido: (await user).apellido,
      email: (await user).email,
      rol: (await user).rol,
    }; */

    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    return user;
    /* return {
      id: id,
      nombre: 'string',
      apellido: ' string',
      email: ' string',
      password: ' string',
    }; */
    /*   id: id,
      nombre: 'string',
      apellido: ' string',
      email: ' string',
      password: ' string',
      createdAt: ' Date',
      updatedAt: ' Date',
     */
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException(`Error ,${id}`);
    }
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException(`Error ,${id}`);
    }
    await this.userRepository.delete(id);

    return `User ${id} deleted`;
  }

  findOrdersByUser(id: number): any {
    const user = this.findOne(id);
    return {
      //Date: new Date(),
      user,
      //      Producto: this.productosService.findAll(),
    };
  }

  async finOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new BadRequestException(`Error ,${email} email no existe`);
    }
    return user;
  }
}
