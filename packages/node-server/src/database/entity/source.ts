import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base";

@Entity()
export class Source extends BaseEntity {
  @Column()
  size: string;

  @Column()
  path: string;

  @Column()
  originName: string;

  @Column()
  name: string;

  @Column()
  type: string;
}
