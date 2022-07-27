import { type } from 'os';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base';

@Entity()
export class Icons extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column()
  path: string;

  @Column()
  description: string;

  @Column()
  keywords: string;
}
