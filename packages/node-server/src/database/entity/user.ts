import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base';
@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column()
  token: string;
}
