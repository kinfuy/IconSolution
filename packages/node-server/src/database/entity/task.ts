import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  createTime: Date;

  @Column()
  updateTime: Date;

  @Column()
  status: string;

  @Column()
  message: string;
}
