import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entities/tasks.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity]), UserModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksModule],
})
export class TasksModule {}
