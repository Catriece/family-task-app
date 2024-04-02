import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class TasksEntity {
  @PrimaryGeneratedColumn()
  taskId: number; // notesId

  @Column({ nullable: true }) // Need to set up foreign key
  userId: string;

  @Column({ nullable: true, type: 'varchar' })
  title: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  // @Column({ nullable: true, type: 'varchar' }) // maybe big int, need to see how dayjs dates come in
  // dueOn: string;

  @Column({ nullable: true, type: 'int' })
  priority: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  completed: boolean;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}
