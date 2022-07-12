import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class iconPkg {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    type: 'varchar',
  })
  name: string;

  @Column()
  version: string;

  @Column()
  description: string;

  @Column()
  keywords: string; // 逗号分割

  @Column()
  author: string;

  @Column()
  license: string;

  @Column()
  frame: string; // vue react angular

  @Column()
  unplugin: string;

  @Column()
  publishPath: string;

  @Column()
  publishToken: string; // npm token

  @Column()
  gitPath: string; // 代码仓库地址

  @Column()
  gitToken: string; // 代码仓库地址

  @Column({ default: new Date() })
  createTime: Date;

  @Column({
    default: new Date(),
  })
  updateTime: Date;
}
