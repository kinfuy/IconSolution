import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Icons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  description: string;

  @Column()
  createTime: Date;

  @Column()
  updateTime: Date;
}
