import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksEntity } from './entities/tasks.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksService', () => {
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

  it('getUserTasks => should find all user tasks or return an error if no tasks are found', async () => {
    const id = '1';
    const tasks = [
      {
        taskId: 1,
        userId: '1',
        title: 'Task 1',
        description: '',
        priority: 1,
        completed: false,
      },
      {
        taskId: 2,
        userId: '1',
        title: 'Task 2',
        description: '',
        priority: 1,
        completed: false,
      },
    ] as TasksEntity[];

    jest.spyOn(mockTaskRepository, 'find').mockReturnValue(tasks);

    const result = await service.getUserTasks(id);

    expect(result).toEqual(tasks);
    expect(mockTaskRepository.find).toHaveBeenCalled();
    expect(mockTaskRepository.find).toHaveBeenCalledWith({
      where: { userId: id },
    });
  });

  it('createNewTask => should create a new task and assign a new task Id', async () => {
    const createTask = {
      userId: '1',
      title: 'Spec Testing',
      description: 'Will I make it?',
      priority: 2,
      completed: false,
    } as CreateTaskDto;

    const task = [
      {
        taskId: 1,
        userId: '1',
        title: 'Task 1',
        description: 'Task 1',
        priority: 2,
        completed: false,
      },
      {
        taskId: 2,
        userId: '1',
        title: 'Task 2',
        description: '',
        priority: 1,
        completed: false,
      },
      {
        taskId: 3,
        userId: '1',
        title: 'Spec Testing',
        description: 'Will I make it?',
        priority: 2,
        completed: false,
      },
    ] as TasksEntity[];

    jest.spyOn(mockTaskRepository, 'save').mockReturnValue(task);

    const result = await service.createNewTask(createTask);

    expect(result).toEqual(task);
    expect(mockTaskRepository.save).toHaveBeenCalled();
    expect(mockTaskRepository.save).toHaveBeenCalledWith(createTask);
  });

  it('deleteTask => should delete a user task by the taskId', async () => {
    const taskId = 1;
    const tasks = [
      {
        taskId: 2,
        userId: '1',
        title: 'Task 2',
        description: '',
        priority: 1,
        completed: false,
      },
      {
        taskId: 3,
        userId: '1',
        title: 'Spec Testing',
        description: 'Will I make it?',
        priority: 2,
        completed: false,
      },
    ] as TasksEntity[];

    jest.spyOn(mockTaskRepository, 'delete').mockReturnValue(tasks);

    const result = await service.deleteTask(taskId);

    expect(result).toEqual(tasks);
    expect(mockTaskRepository.delete).toHaveBeenCalled();
    expect(mockTaskRepository.delete).toHaveBeenCalledWith(taskId);
  });

  it('getOneTask => should find one user task by the taskId', async () => {
    const taskId = 1;
    const task = [
      {
        taskId: 1,
        userId: '1',
        title: 'Task 1',
        description: '',
        priority: 1,
        completed: false,
      },
    ] as TasksEntity[];

    jest.spyOn(mockTaskRepository, 'find').mockReturnValue(task);

    const result = await service.getOneTask(taskId);

    expect(result).toEqual(task);
    expect(mockTaskRepository.find).toHaveBeenCalled();
    expect(mockTaskRepository.find).toHaveBeenCalledWith({
      where: { taskId },
    });
  });

  it('updateTask => should find the user task to be updated and update that task', async () => {
    const taskId = 1;
    const toUpdate = {
      taskId: 1,
      userId: '1',
      title: 'Update Task 1',
      description: 'Task is updated!',
      priority: 2,
      completed: false,
    } as TasksEntity;

    const updatedTask = {
      taskId: 1,
      userId: '1',
      title: 'Update Task 1',
      description: 'Task is updated!',
      priority: 2,
      completed: false,
    } as TasksEntity;

    jest.spyOn(mockTaskRepository, 'findOne').mockReturnValue({
      where: {
        taskId: toUpdate.taskId,
      },
    });
    jest.spyOn(mockTaskRepository, 'merge');
    jest.spyOn(mockTaskRepository, 'save').mockReturnValue(toUpdate);

    const result = await service.updateTask(toUpdate);

    expect(result).toEqual(updatedTask);
    expect(mockTaskRepository.findOne).toHaveBeenCalled();
    expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
      where: { taskId },
    });
    expect(mockTaskRepository.merge).toHaveBeenCalled();
    expect(mockTaskRepository.merge).toHaveBeenCalledWith(toUpdate);
    expect(mockTaskRepository.save).toHaveBeenCalled();
    expect(mockTaskRepository.save).toHaveBeenCalledWith(toUpdate);
  });

  it('markCompleted => should find the user task to update and mark it completed', async () => {
    const taskId = 1;
    const completed = true;

    const foundTask = {
      taskId: 1,
      userId: '1',
      title: 'Update Task 1',
      description: 'Task is updated!',
      priority: 2,
      completed: false,
    } as TasksEntity;

    jest.spyOn(mockTaskRepository, 'findOne').mockReturnValue(taskId);
    jest.spyOn(mockTaskRepository, 'save').mockReturnValue(foundTask);
    jest.spyOn(mockTaskRepository, 'findOne').mockReturnValue(foundTask);

    const result = await service.markCompleted(taskId, completed);

    expect(result).toEqual(foundTask);
    expect(mockTaskRepository.findOne).toHaveBeenCalled();
    expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
      where: { taskId },
    });
    expect(mockTaskRepository.save).toHaveBeenCalled();
    expect(mockTaskRepository.save).toHaveBeenCalledWith(foundTask);
    expect(mockTaskRepository.findOne).toHaveBeenCalled();
    expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
      where: { taskId },
    });
  });
});
