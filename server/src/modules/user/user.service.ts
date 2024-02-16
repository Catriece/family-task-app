import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as functions from '../../functions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  // creates new user profile

  async createUser(createUserDto: CreateUserDto) {
    const user = { ...createUserDto, createdAt: Date.now() };
    const { id, email, firstName, lastName, isActive } =
      await this.usersRepository.save(user);

    const payload = {
      id,
      email,
      firstName,
      lastName,
      isActive,
    };
    return payload;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findUserById(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
