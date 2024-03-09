import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

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

  async findUserWithToken(authorizationHeader: string) {
    const payload = this.extractPayloadFromHeader(authorizationHeader);
    const id = payload.sub.toString();
    return await this.usersRepository.findOne({ where: { id } });
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.save(updateUserDto);
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.delete(id);
    return user;
  }

  public extractPayloadFromHeader(authorizationHeader) {
    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.decode(token);
    console.log(decodedToken['email']);
    return decodedToken;
  }
}
