import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base';

@Entity()
export class iconPkg extends BaseEntity {
  @Column({
    length: 50,
    type: 'varchar',
  })
  name: string;

  @Column()
  version: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  keywords: string; // 逗号分割

  @Column()
  author: string;

  @Column()
  license: string;

  @Column({ nullable: true, default: 'vue' })
  frame: string; // vue react angular

  @Column({ nullable: true })
  generate_path: string; // 打包后地址

  @Column()
  publish_path: string;

  @Column()
  publish_token: string; // npm token

  @Column()
  git_path: string; // 代码仓库地址

  @Column()
  git_token: string; // 代码仓库地址
}
