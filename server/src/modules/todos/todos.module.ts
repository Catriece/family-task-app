import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosEntity } from './entities/todos.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodosEntity]), UserModule],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosModule],
})
export class TodosModule {}
