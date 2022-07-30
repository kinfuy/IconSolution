import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base";
@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  avator: string;

  @Column({ nullable: true })
  description: string;
}
