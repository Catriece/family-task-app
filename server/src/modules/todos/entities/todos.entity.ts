import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodosEntity {
  @PrimaryGeneratedColumn()
  notesId: string; // notesId

  @Column({ nullable: true }) // Need to set up foreign key
  userId: string;

  @Column({ nullable: true, type: 'varchar' })
  title: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  @Column({ nullable: true, type: 'date' }) // maybe big int, need to see how dayjs dates come in
  dueOn: string;

  @Column({ nullable: true, type: 'int' })
  priority: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  completed: boolean;
}
