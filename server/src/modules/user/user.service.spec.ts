import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SignUpDto } from '../auth/dto/sign-up-dto';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    decode: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findUserById => should find an existing user by their id', async () => {
    const id = '1';
    const user = {
      id: '1',
      profilePhoto: 'fake-url.png',
      firstName: 'Catriece',
      lastName: 'Gilbert',
      preferredName: 'Cat',
      email: 'catriece.gilbert@gmail.com',
      password: 'fake',
      isActive: true,
    } as UserEntity;

    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);

    const result = await service.findUserById(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it('findUserByEmail => should find an existing user by their email', async () => {
    const email = 'catriece.gilbert@gmail.com';
    const user = {
      id: '1',
      profilePhoto: 'fake-url.png',
      firstName: 'Catriece',
      lastName: 'Gilbert',
      preferredName: 'Cat',
      email: 'catriece.gilbert@gmail.com',
      password: 'fake',
      isActive: true,
    } as UserEntity;

    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);

    const result = await service.findUserByEmail(email);

    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email },
    });
  });

  it('createUser => should create a new user and assign that user a unique id ', async () => {
    const create = {
      firstName: 'Catriece',
      lastName: 'Gilbert',
      email: 'catriece.gilbert@gmail.com',
      password: 'fake',
      isActive: false,
      createdAt: Date.now(),
    } as SignUpDto;

    const user = {
      id: '1',
      firstName: 'Catriece',
      lastName: 'Gilbert',
      email: 'catriece.gilbert@gmail.com',
      isActive: false,
    } as UserEntity;

    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    const result = await service.createUser(create);

    expect(result).toEqual(user);
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalledWith(create);
  });

  // Need help creating test for findUserWithToken

  it('updateUser => should update an existing user', async () => {
    const update = {
      id: '1',
      firstName: 'Catriece',
      lastName: 'Gilbert',
      email: 'catriece.gilbert@gmail.com',
      birthday: '',
      preferredName: 'Cat',
    };

    const user = {
      id: '1',
      firstName: 'Catriece',
      lastName: 'Gilbert',
      email: 'catriece.gilbert@gmail.com',
      preferredName: 'Cat',
      isActive: false,
    } as UserEntity;

    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    const result = await service.updateUser(update);

    expect(result).toEqual(user);
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalledWith(update);
  });

  it('deleteUser => should delete an existing user', async () => {
    const id = '1';

    const user = {
      id: '1',
      firstName: 'Catriece',
      lastName: 'Gilbert',
      email: 'catriece.gilbert@gmail.com',
      preferredName: 'Cat',
      isActive: false,
    } as UserEntity;

    jest.spyOn(mockUserRepository, 'delete').mockReturnValue(user);

    const result = await service.deleteUser(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.delete).toHaveBeenCalled();
    expect(mockUserRepository.delete).toHaveBeenCalledWith(id);
  });
});
