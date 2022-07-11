import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  createTime: string;

  @Column()
  updateTime: string;

  @Column()
  status: string;

  @Column()
  message: string;
}
