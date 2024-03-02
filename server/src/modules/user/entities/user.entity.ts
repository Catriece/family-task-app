// table schema for database
import { TodosEntity } from 'src/modules/todos/entities/todos.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profilePhoto: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  preferredName: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  birthday: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ type: 'bigint', nullable: true })
  createdAt: number;

  @OneToMany(() => TodosEntity, (todo) => todo.userId)
  todos: TodosEntity[];
}
