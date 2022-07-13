import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base';

@Entity()
export class Task extends BaseEntity {
  @Column()
  type: string;

  @Column()
  status: string;

  @Column()
  message: string;
}
