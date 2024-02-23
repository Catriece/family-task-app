import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodosEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true }) // Need to set up foreign key
  userId: string;

  @Column({ nullable: true, type: 'varchar' })
  title: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  // @Column({nullable: true, type: 'varchar'})
  // createdAt: string // Not sure if this is necessary yet. Maybe for stats and settings?

  @Column({ nullable: true, type: 'varchar' }) // maybe big int, need to see how dayjs dates come in
  dueOn: string;

  @Column({ nullable: true, type: 'int' })
  priority: number;
}
