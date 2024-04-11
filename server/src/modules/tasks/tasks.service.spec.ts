import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksEntity } from './entities/tasks.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TodosService', () => {
  let service: TasksService;

  const mockTaskRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    decode: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TasksEntity),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
