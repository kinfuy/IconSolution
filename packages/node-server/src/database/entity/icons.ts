import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base';

@Entity()
export class Icons extends BaseEntity {
  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  description: string;
}
